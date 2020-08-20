import { uiStateFields, actions } from "../actions/uiState";

const initialState = {
  [uiStateFields.projectsOpened]: false,
};

export default function uiState(state = initialState, action) {
  switch (action.type) {
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
