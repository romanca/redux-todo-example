import { getKeyFromLs, setItemToLS } from "./localDb";
import httpClient from "httpClient";

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

const endpoints = {
  todos: "/todos",
  projects: "/projects",
  updateTodo: "/todo/:id",
  updateProject: "/project/:id",
};

export const mockResolvers = {
  [`get:${endpoints.todos}`]: {
    enabled: true,
    handler: async (_, res) => {
      const todos = await getKeyFromLs(LS_KEYS.todos, []);
      res.send({ data: todos });
    },
  },
  [`get:${endpoints.projects}`]: async (_, res) => {
    const projects = await getKeyFromLs(LS_KEYS.projects, []);
    res.send({ data: projects });
  },
  [`post:${endpoints.projects}`]: async (req, res) => {
    const projects = await getProjectsFromLs();
    const project = createIdForItem(req.body);
    setItemToLS(LS_KEYS.projects, [...projects, project]);
    res.send({ data: project });
  },
  [`post:${endpoints.todos}`]: async (req, res) => {
    const todos = await getAllTodosFromLs();
    const todo = generateNewTodoObjectFromTodoValues(req.body);
    setItemToLS(LS_KEYS.todos, [...todos, todo]);
    res.send({ data: todo });
  },
  [`put:${endpoints.todos}`]: async (req, res) => {
    const todo = req.body;
    const todos = await getAllTodosFromLs();
    const editedTodos = todos.map((i) => (i.id === todo.id ? todo : i));
    setItemToLS(LS_KEYS.todos, editedTodos);
    res.send({ data: todo });
  },
  [`delete:${endpoints.updateTodo}`]: async (req, res) => {
    const todos = await getAllTodosFromLs();
    const id = req.params.id;
    const newTodos = todos.filter((newTodo) => newTodo.id !== id);
    setItemToLS(LS_KEYS.todos, newTodos);
    res.send({});
  },
  [`delete:${endpoints.updateProject}`]: async (req, res) => {
    const id = req.params.id;
    const projects = await getProjectsFromLs();
    const newProjects = projects.filter((i) => i.id !== id);
    setItemToLS(LS_KEYS.projects, newProjects);
    res.send({});
  },
  [`put:${endpoints.projects}`]: async (req, res) => {
    const project = req.body;
    const projects = await getProjectsFromLs();
    const newProjects = projects.map((i) =>
      i.id === project.id ? { ...i, ...project } : i
    );
    setItemToLS(LS_KEYS.projects, newProjects);
    res.send({ data: project });
  },
};

function getAllTodosFromLs() {
  return getKeyFromLs(LS_KEYS.todos, []);
}

function getProjectsFromLs() {
  return getKeyFromLs(LS_KEYS.projects, []);
}

function cacheReducer(cache, type, cachedData, cacheKey, item, params) {
  switch (type) {
    case "delete":
      return {
        ...cache,
        [cacheKey]: {
          data: Object.keys(cachedData.data).reduce((result, itemId) => {
            const item = cachedData.data[itemId];
            const newResults = {
              ...result,
            };
            if (params.id === item.id) {
              return newResults;
            }
            return {
              ...newResults,
              [item.id]: item,
            };
          }, {}),
        },
      };
    default:
      return {
        ...cache,
        [cacheKey]: {
          data: {
            ...cachedData.data,
            [item.id]: item,
          },
        },
      };
  }
}

function createOneInManyCacheUpdater(cacheKey) {
  return ({ response, cache, setCache, req }) => {
    const cacheData = cache[cacheKey];
    const item = response.data;
    let newCache = cacheReducer(
      cache,
      req.method,
      cacheData,
      cacheKey,
      item,
      req.params
    );
    setCache(newCache);
  };
}

class ApiMethods {
  getTodos = () =>
    httpClient.get(endpoints.todos, null, null, { cacheKey: "todos" });
  createTodo = (data) =>
    httpClient.post(endpoints.todos, data, null, {
      onResponseReceived: createOneInManyCacheUpdater("todos"),
    });
  removeTodo = (id) =>
    httpClient.delete(
      endpoints.updateTodo,
      null,
      { id },
      {
        onResponseReceived: createOneInManyCacheUpdater("todos"),
      }
    );
  editTodo = (todo) =>
    httpClient.put(endpoints.todos, todo, null, {
      onResponseReceived: createOneInManyCacheUpdater("todos"),
    });
  removeProject = (id) =>
    httpClient.delete(
      endpoints.updateProject,
      null,
      { id },
      {
        onResponseReceived: createOneInManyCacheUpdater("projects"),
      }
    );
  updateProject = (project) =>
    httpClient.put(endpoints.projects, project, null, {
      onResponseReceived: createOneInManyCacheUpdater("projects"),
    });
  getProjects = () =>
    httpClient.get(endpoints.projects, null, null, { cacheKey: "projects" });
  createProject = (data) =>
    httpClient.post(endpoints.projects, data, null, {
      onResponseReceived: createOneInManyCacheUpdater("projects"),
    });

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

export default ApiMethods;
