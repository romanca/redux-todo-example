import { getKeyFromLs, setItemToLS } from "./localDb";

const LS_KEYS = {
  projects: "projects",
  uiState: "uiState",
  todos: "todos",
  labels: "labels",
};

function createIdForItem(item) {
  return {
    ...item,
    id: Date.now(),
  };
}
function generateNewTodoObjectFromTodoValues(values) {
  return {
    ...values,
    done: false,
    id: Date.now(),
  };
}
class ApiMethods {
  getTodos = () => getKeyFromLs(LS_KEYS.todos, []);
  createTodo = async (data) => {
    const todos = await this.getTodos();
    const todo = generateNewTodoObjectFromTodoValues(data);
    setItemToLS(LS_KEYS.todos, [...todos, todo]);
    return Promise.resolve({ data: todo });
  };
  removeTodo = async (id) => {
    const todos = await this.getTodos();
    const newTodos = todos.filter((newTodo) => newTodo.id !== id);
    setItemToLS(LS_KEYS.todos, newTodos);
    return Promise.resolve();
  };
  editTodo = async (todo) => {
    const todos = await this.getTodos();
    const editedTodos = todos.map((i) => (i.id === todo.id ? todo : i));
    setItemToLS(LS_KEYS.todos, editedTodos);
  };
  removeProject = async (id) => {
    const projects = await this.getProjects();
    const newProjects = projects.filter((i) => i.id !== id);
    setItemToLS(LS_KEYS.projects, newProjects);
    return Promise.resolve();
  };
  updateProject = async (project) => {
    const projects = await this.getProjects();
    const newProjects = projects.map((i) =>
      i.id === project.id ? { ...i, ...project } : i
    );
    setItemToLS(LS_KEYS.projects, newProjects);
    return Promise.resolve();
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
  getLabels = () => getKeyFromLs(LS_KEYS.labels, []);
  createLabel = async (labels) => {
    const allLabels = await this.getLabels();
    const label = createIdForItem(labels);
    setItemToLS(LS_KEYS.labels, [...allLabels, label]);
    return Promise.resolve({ labels: label });
  };
  removeLabel = async (id) => {
    const allLabels = await this.getLabels();
    const newLabels = allLabels.filter((i) => i.id !== id);
    setItemToLS(LS_KEYS.labels, newLabels);
    return Promise.resolve();
  };
  updateLabel = async (label) => {
    const labels = await this.getLabels();
    const newLabels = labels.map((l) =>
      l.id === label.id ? { ...l, ...label } : l
    );
    setItemToLS(LS_KEYS.labels, newLabels);
    return Promise.resolve();
  };
}

export default new ApiMethods();
