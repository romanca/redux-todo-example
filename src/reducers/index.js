import { combineReducers } from "redux";
import todos from "./todos";
import projects from "./projects";
import uiState from "./uiState";
import labels from "./labels";

export const staticReducers = {
  todos,
  projects,
  labels,
  uiState,
};

export default combineReducers(staticReducers);
