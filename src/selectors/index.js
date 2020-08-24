import { useSelector, useDispatch } from "react-redux";
import { uiStateFields, setUiStateField } from "../actions/uiState";
import { generateViewKey, createMemoizedFunction } from "../utils/utils";
import { get } from "lodash";
import { staticMenuItems } from "../utils/Constants";

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
  return useSelector((state) => state.view.currentView);
}

export function useProjects() {
  const projectViews = useSelector((state) => state.todos.projectTodoViews);
  const projects = useSelector((state) => getProjects(state));
  return getMemoizedProjects(projectViews, projects);
}

export function useStaticProjects() {
  const projectViews = useSelector((state) => state.todos.projectTodoViews);
  return getMemoizedProjects(projectViews, staticMenuItems);
}

export function useIndexedProjects() {
  return useSelector((state) => state.projects.indexedProjects);
}

export function useTodosForCurrentView() {
  const todos = useIndexedProjects();
  const currentView = useCurrentView();
}
