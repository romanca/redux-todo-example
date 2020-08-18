export const TODO_ACTIONS = {
  CREATE_TODO: "CREATE_TODO",
  REMOVE_TODO: "REMOVE_TODO",
};

export function createTodo(todo) {
  return {
    type: TODO_ACTIONS.CREATE_TODO,
    payload: {
      ...todo,
      id: Date.now(),
    },
  };
}
export function removeTodo(id){
    return{
        type: TODO_ACTIONS.REMOVE_TODO,
        payload:  id
    }
}
