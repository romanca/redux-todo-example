import { TODO_ACTIONS } from "../actions/todos";
import { generateViewKey } from "../utils/utils";
import { get } from "lodash";

const initialState = {
  data: [],
  indexedTodos: {},
  projectTodoViews: {},
};

function updateFieldOnObject(originObject, path, value) {
  const pathArr = String(path).split(".");
  const key = pathArr.shift();
  if (pathArr.length === 0) {
    return {
      ...originObject,
      [key]: value,
    };
  }
  return {
    ...originObject,
    [key]: updateFieldOnObject(originObject[key], pathArr.join("."), value),
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TODO_ACTIONS.CREATE_TODO:
      return {
        ...state,
        data: [...state.data, action.payload],
        indexedTodos: updateFieldOnObject(
          state.indexedTodos,
          action.payload.id,
          action.payload
        ),
        projectTodoViews: updateProjectViews(
          state.projectTodoViews,
          action.payload
        ),
      };
    case TODO_ACTIONS.REMOVE_TODO:
      return {
        ...state,
        data: state.data.filter((i) => i.id !== action.payload),
        indexedTodos: {
          ...state.indexedTodos,
          [action.payload]: undefined,
        },
      };
    case TODO_ACTIONS.EDIT_TODO:
      return {
        ...state,
        ...editTodo(state, action.payload),
      };
    default:
      return state;
  }
}

function updateProjectViews(originalViews, item) {
  const key = generateViewKey("PROJECTS", item.projectId);
  const oldValues = get(originalViews, key, []);
  const final = {
    ...originalViews,
    [key]: [...oldValues, item.id],
  };
  return final;
}

function editTodo({ data, indexedTodos, projectTodoViews }, item) {
  const oldTodoProjectId = (data.find((i) => i.id === item.id) || {}).projectId;
  const oldProjectViewKey = generateViewKey("PROJECTS", oldTodoProjectId);
  const newProjectViewKey = generateViewKey("PROJECTS", item.projectId);
  const state = {
    data: data.map((i) => (i.id === item.id ? item : i)),
    indexedTodos: {
      ...indexedTodos,
      [item.id]: item,
    },
  };
  if (oldTodoProjectId !== item.projectId) {
    const projectViews = {
      ...projectTodoViews,
      [oldProjectViewKey]: projectTodoViews[oldProjectViewKey].filter(
        (i) => i !== item.id
      ),
      [newProjectViewKey]: [
        ...(projectTodoViews[newProjectViewKey] || []),
        item.id,
      ],
    };
    return {
      ...state,
      projectTodoViews: projectViews,
    };
  }
  return {
    ...state,
    projectTodoViews,
  };
}
