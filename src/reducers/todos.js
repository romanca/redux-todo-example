import { TODO_ACTIONS } from "../actions/todos";

const initialState = {
  data: [],
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
    case TODO_ACTIONS.EDIT_TODO:
      return {
        ...state,
        data: state.data.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      };
    case TODO_ACTIONS.FETCH_TODOS_FINNISH:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
