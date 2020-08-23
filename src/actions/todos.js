export const TODO_ACTIONS = {
  CREATE_TODO: "CREATE_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  EDIT_TODO: "EDIT_TODO",
  FETCH_TODOS_FINNISH: "FETCH_TODOS",
  FETCH_TODOS_START: "FETCH_TODOS",
};
export function createTodo(todo) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      const { data } = await apiMethods.createTodo(todo);
      dispatch({
        type: TODO_ACTIONS.CREATE_TODO,
        payload: data,
      });
    } catch (err) {
      // TODO handle error state
    }
  };
}
export function removeTodo(id) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      await apiMethods.removeTodo(id);
      dispatch({
        type: TODO_ACTIONS.REMOVE_TODO,
        payload: id,
      });
    } catch (err) {}
  };
}
export function getAllTodos() {
  return async (dispatch, _, { apiMethods }) => {
    dispatch({
      type: TODO_ACTIONS.FETCH_TODOS_START,
    });
    try {
      const payload = await apiMethods.getTodos();
      dispatch({
        type: TODO_ACTIONS.FETCH_TODOS_FINNISH,
        payload,
      });
    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.FETCH_TODOS_FINNISH,
        payload: [],
      });
    }
  };
}

export function editTodo(payload) {
  return {
    type: TODO_ACTIONS.EDIT_TODO,
    payload,
  };
}
