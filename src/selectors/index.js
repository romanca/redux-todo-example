import { useSelector, useDispatch } from "react-redux";
import { uiStateFields, setUiStateField } from "../actions/uiState";
import {
  generateViewKey,
  createMemoizedFunction,
  getViewKeyData,
} from "../utils/utils";
import { get } from "lodash";
import { staticMenuItems, staticMenuItemsIds } from "../utils/Constants";

export const useTodoSelectorById = (id) =>
  useSelector((state) => state.todos.data.find((i) => i.id === id));

export function isProjectMenuOpened(state) {
  return state.uiState[uiStateFields.projectsOpened];
}

export function getUiStateField(state, field) {
  return state.uiState[field];
}

export function useUiStateFieldAPI(field) {
  const value = useSelector((state) => getUiStateField(state, field));
  const dispatch = useDispatch();
  return [value, (value) => dispatch(setUiStateField(field, value))];
}

export function getProjects(state) {
  return state.projects.projects;
}

const getMemoizedProjects = createMemoizedFunction((views, data) => {
  return data.map((i) => {
    const projectData = get(views, generateViewKey("PROJECTS", i.id), []);
    return { ...i, activeTodos: projectData.length };
  });
});

export function useIndexedTodos() {
  return useSelector((state) => state.todos.indexedTodos);
}

function useCurrentView() {
  return useSelector((state) => state.uiState.view.currentView);
}

function useProjectViews() {
  return useSelector((state) => state.todos.projectTodoViews);
}

export function useProjects() {
  const projectViews = useProjectViews();
  const projects = useSelector((state) => getProjects(state));
  return getMemoizedProjects(projectViews, projects);
}

export function useStaticProjects() {
  const projectViews = useProjectViews();
  return getMemoizedProjects(projectViews, staticMenuItems);
}

export function useIndexedProjects(combineWithStatics) {
  const indexedStaticProjects = staticMenuItems.reduce(
    (result, item) => ({ ...result, [item.id]: item }),
    {}
  );
  const aditionalProjects = combineWithStatics ? indexedStaticProjects : {};
  return useSelector((state) => ({
    ...state.projects.indexedProjects,
    ...aditionalProjects,
  }));
}

export function useDefaultProjectForTodoCreation() {
  const currentView = useCurrentView();
  const { filterType, itemId } = getViewKeyData(currentView);
  const projects = useIndexedProjects();
  if (
    filterType === "LABELS" ||
    currentView === generateViewKey("PROJECTS", staticMenuItemsIds.INBOX)
  ) {
    return staticMenuItems.find((i) => i.id === staticMenuItemsIds.INBOX);
  }
  return projects[itemId];
}

export function useTodosForCurrentView() {
  const todos = useIndexedTodos();
  const currentView = useCurrentView();
  const projectViews = useProjectViews();
  const visibleTodos = get(projectViews, currentView, []);
  return visibleTodos.map((i) => todos[i]);
}

export function useCurrentViewData() {
  const projects = useIndexedProjects(true);
  const currentView = useCurrentView();
  const { filterType, itemId } = getViewKeyData(currentView);
  // TODO handle label title here
  const dataPool = filterType === "PROJECTS" ? projects : {};
  return get(dataPool, itemId);
}

export function useLabels() {
  return useSelector((state) => state.labels.labels);
}
