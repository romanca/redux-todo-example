import { LABELS_ACTIONS } from "../actions/labels";

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
    case LABELS_ACTIONS.UPDATE_LABEL:
      return {
        ...state,
        labels: state.labels.map((l) =>
          l.id === action.payload.id ? action.payload : l
        ),
      };
    default:
      return state;
  }
}
