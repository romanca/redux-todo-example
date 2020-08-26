import { LABELS_ACTIONS } from "../actions/labels";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";

const initialState = {
  labels: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LABELS_ACTIONS.CREATE_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    case LABELS_ACTIONS.REMOVE_LABEL:
      return {
        ...state,
        labels: state.labels.filter((i) => i.id !== action.payload),
      };
    case LABELS_ACTIONS.FETCH_LABELS_FINNISH:
      return {
        ...state,
        labels: action.payload,
      };
    default:
      return state;
  }
}
