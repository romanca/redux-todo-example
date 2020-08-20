import { PROJECTS_ACTIONS } from "../actions/projects";

const initialState = {
  projects: [],
  loading: false
};
export default function (state = initialState, action) {
  switch (action.type) {
    case PROJECTS_ACTIONS.FETCH_PROJECTS_FINNISH:
      return {
        ...state,
        loading: false,
        projects: action.payload
      };
    case PROJECTS_ACTIONS.FETCH_PROJECTS_START:
      return {
        ...state,
        loading: true
      };
    case PROJECTS_ACTIONS.CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
}
