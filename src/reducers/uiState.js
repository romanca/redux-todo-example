import { uiStateFields, actions } from "../actions/uiState";
import { generateViewKey } from "../utils/utils";

const initialState = {
  [uiStateFields.projectsOpened]: false,
  view: {
    currentView: generateViewKey("PROJECTS", "INBOX_TODOS"),
  },
};

export default function uiState(state = initialState, action) {
  switch (action.type) {
    case actions.SET_CURRENT_VIEW:
      return {
        ...state,
        view: {
          ...state.view,
          currentView: action.payload
        }
      }
    case actions.SET_UI_STATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case actions.LOAD_UI_STATE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
