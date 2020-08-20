import { combineReducers } from "redux";
import todos from "./todos";
import projects from "./projects";
import uiState from "./uiState";

export default combineReducers({
  todos,
  projects,
  uiState,
});
