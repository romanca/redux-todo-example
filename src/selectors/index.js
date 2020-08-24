import { useSelector, useDispatch } from "react-redux";
import { uiStateFields, setUiStateField } from "../actions/uiState";

export const useTodoSelectorById = (id) =>
  useSelector((state) => state.todos.data.find((i) => i.id === id));

export function isProjectMenuOpened(state) {
  return state.uiState[uiStateFields.projectsOpened];
}

export function useUiStateFieldAPI(field) {
  const value = useSelector((state) => state.uiState[field]);
  const dispatch = useDispatch();
  return [value, (value) => dispatch(setUiStateField(field, value))];
}

export function useProjects() {
  return useSelector((state) => state.projects.projects);
}

export function useIndexedProjects() {
  return useSelector((state) => state.projects.indexedProjects);
}
