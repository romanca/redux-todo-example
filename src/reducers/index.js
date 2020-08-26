import { combineReducers } from "redux";
import todos from "./todos";
import projects from "./projects";
import uiState from "./uiState";
import labels from "./labels"

export default combineReducers({
  todos,
  projects,
  labels,
  uiState,
});
