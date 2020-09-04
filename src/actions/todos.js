export const TODO_ACTIONS = {
  CREATE_TODO: "CREATE_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  EDIT_TODO: "EDIT_TODO",
  FETCH_TODOS_FINNISH: "FETCH_TODOS_FINNISH",
  FETCH_TODOS_START: "FETCH_TODOS_START",
};

export function createTodo(todo) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      const { apiResult } = await apiMethods.createTodo(todo);
      const { data } = await apiResult;
      dispatch({
        type: TODO_ACTIONS.CREATE_TODO,
        payload: data,
      });
    } catch (err) {
      // TODO handle error state
    }
  };
}

export function removeTodo(payload) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      await apiMethods.removeTodo(payload.id);
      dispatch({
        type: TODO_ACTIONS.REMOVE_TODO,
        payload,
      });
    } catch (err) {}
  };
}

export function editTodo(payload) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      const { apiResult } = await apiMethods.editTodo(payload);
      const { data } = await apiResult;
      dispatch({
        type: TODO_ACTIONS.EDIT_TODO,
        payload: data,
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
      const { cacheResult, apiResult } = await apiMethods.getTodos();
      const { data: cachePayload } = await cacheResult;
      dispatch({
        type: TODO_ACTIONS.FETCH_TODOS_FINNISH,
        payload: cachePayload,
      });
      const { data: payload } = await apiResult;
      dispatch({
        type: TODO_ACTIONS.FETCH_TODOS_FINNISH,
        payload,
      });
      return payload;
    } catch (err) {
      console.log("getAllTodos -> err", err)
      dispatch({
        type: TODO_ACTIONS.FETCH_TODOS_FINNISH,
        payload: [],
      });
      return [];
    }
  };
}
