import { PROJECTS_ACTIONS } from "../actions/projects";
import { get } from "lodash";

const initialState = {
  indexedProjects: {},
  projects: [],
  loading: false,
};

function spreadArrayToObject(data, path) {
  return data.reduce(
    (result, item) => ({ ...result, [get(item, path)]: item }),
    {}
  );
}

function updateItemOnArray(data, keyPath, item) {
  return data.map((i) =>
    i[keyPath] === item[keyPath] ? { ...i, ...item } : i
  );
}

function removeItemFromArray(data, keyPath, key) {
  return data.filter((i) => i[keyPath] !== key);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PROJECTS_ACTIONS.REMOVE_PROJECT:
      return {
        ...state,
        projects: removeItemFromArray(state.projects, 'id', action.payload),
        indexedProjects: {
          ...state.indexedProjects,
          [action.payload]: undefined
        }
      };
    case PROJECTS_ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: updateItemOnArray(state.projects, "id", action.payload),
        indexedProjects: {
          ...state.indexedProjects,
          [action.payload.id]: {
            ...state.indexedProjects[action.payload.id],
            ...action.payload,
          },
        },
      };
    case PROJECTS_ACTIONS.FETCH_PROJECTS_FINNISH:
      return {
        ...state,
        loading: false,
        projects: action.payload,
        indexedProjects: spreadArrayToObject(action.payload, "id"),
      };
    case PROJECTS_ACTIONS.FETCH_PROJECTS_START:
      return {
        ...state,
        loading: true,
      };
    case PROJECTS_ACTIONS.CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        indexedProjects: {
          ...state.indexedProjects,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
}
