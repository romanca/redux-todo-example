import { getKeyFromLs, setItemToLS } from "./localDb";

const LS_KEYS = {
  projects: "projects",
  uiState: "uiState",
  todos: "todos",
};

function createIdForItem(item) {
  return {
    ...item,
    id: Date.now(),
  };
}

class ApiMethods {
  getTodos = () => getKeyFromLs(LS_KEYS.todos, []);
  createTodo = async (data) => {
    const todos = await this.getTodos();
    const todo = createIdForItem(data);
    setItemToLS(LS_KEYS.todos, [...todos, todo]);
    return Promise.resolve({ data: todo });
  };
  getTodos = () => getKeyFromLs(LS_KEYS.todos, []);
  removeTodo = async (id) => {
    const todos = await this.getTodos();
    const newTodos = todos.filter((i) => i.id !== id);
    setItemToLS(LS_KEYS.todos, newTodos);
    return Promise.resolve()
  };

  editTodo = (todo) => {
    // get all todos
    // create new todos array with updated item
    // set this new array to LS
    // Return resolved promise
  };
  getProjects = () => getKeyFromLs(LS_KEYS.projects, []);
  createProject = async (data) => {
    const projects = await this.getProjects();
    const project = createIdForItem(data);
    setItemToLS(LS_KEYS.projects, [...projects, project]);
    return Promise.resolve({ data: project });
  };
  getUiState = () => getKeyFromLs(LS_KEYS.uiState, null);
  updateUiState = async (updatedValues) => {
    const uiState = await this.getUiState();
    setItemToLS(LS_KEYS.uiState, {
      ...uiState,
      ...updatedValues,
    });
    return Promise.resolve();
  };
}

export default new ApiMethods();
