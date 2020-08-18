import { TODO_ACTIONS } from "../actions/todos";

const initialState = {
  data: [
    {
      title: "Something",
      id: "asdsfsf1",
      label: "some label",
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TODO_ACTIONS.CREATE_TODO:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case TODO_ACTIONS.REMOVE_TODO:
      return {
        ...state,
        data: state.data.filter((i) => i.id !== action.payload),
      };
    default:
      return state;
  }
}
