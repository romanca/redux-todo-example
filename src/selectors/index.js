import { useSelector } from "react-redux";
import { uiStateFields } from "../actions/uiState";

export const useTodoSelectorById = (id) =>
  useSelector((state) => state.todos.data.find((i) => i.id === id));

export function isProjectMenuOpened(state) {
  return state.uiState[uiStateFields.projectsOpened];
}
