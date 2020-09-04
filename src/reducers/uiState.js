import { uiStateFields, actions } from "../actions/uiState";
import { generateViewKey } from "../utils/utils";
import { staticMenuItemsIds } from "../utils/Constants";
import { get } from "lodash";

const initialState = {
  [uiStateFields.projectsOpened]: false,
  view: {
    currentView: generateViewKey("PROJECTS", staticMenuItemsIds.INBOX),
  },
};

// TODO do I need this fetch log?

function getInitialFetchLogState() {
  return {
    fetched: false,
    oldFetches: [],
    lastFetch: null,
  };
}

function registerNewFetch(currentFetchLog, logData) {
  const newFetchLog = {
    ...currentFetchLog,
    fetched: logData.success,
  };
  if (currentFetchLog.lastFetch) {
    newFetchLog.oldFetches = [...currentFetchLog.oldFetches];
  }
  newFetchLog.lastFetch = {
    ...logData,
    fetchedAt: Date.now(),
  };
}

export default function uiState(state = initialState, action) {
  switch (action.type) {
    case actions.REGISTER_FETCH:
      const currentFetchLogForKey = get(
        state,
        `fetchLog.${action.payload.dataKey}`,
        getInitialFetchLogState()
      );
      return {
        ...state,
        fetchLog: {
          ...state.fetchLog,
          [action.payload.dataKey]: registerNewFetch(
            currentFetchLogForKey,
            action.payload
          ),
        },
      };
    case actions.SET_CURRENT_VIEW:
      return {
        ...state,
        view: {
          ...state.view,
          currentView: action.payload,
        },
      };
    case actions.SET_UI_STATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case actions.LOAD_UI_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
