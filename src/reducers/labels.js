import { LABELS_ACTIONS } from "../actions/labels";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";

const initialState = {
  labels: [
    {
      label: "Label One",
      id: "1",
      color: "blue",
      rightButtonType: MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER,
    },   
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LABELS_ACTIONS.CREATE_LABEL:
      return {
        ...state,
        labels: [...state, action.payload],
      };
    default:
      return state;
  }
}
