import { generateViewKey } from "../utils/utils";
import { getUiStateField } from "../selectors";

export const actions = {
  SET_UI_STATE_FIELD: "SET_UI_STATE_FIELD",
  LOAD_UI_STATE: "LOAD_UI_STATE",
  SET_CURRENT_VIEW: "SET_CURRENT_VIEW",
};

export const uiStateFields = {
  projectsOpened: "projectsOpened",
  labelsOpened: "labelsOpened",
};

export function setUiStateField(field, value) {
  return async (dispatch, _, { apiMethods }) => {
    dispatch({
      type: actions.SET_UI_STATE_FIELD,
      field,
      value,
    });
    try {
      await apiMethods.updateUiState({ [field]: value });
    } catch (err) {
      // TODO handle error
    }
  };
}

export function getUiState() {
  return async (dispatch, _, { apiMethods }) => {
    try {
      const payload = await apiMethods.getUiState();
      if (payload) {
        dispatch({
          type: actions.LOAD_UI_STATE,
          payload,
        });
      }
    } catch (err) {
      // TODO handle error
    }
  };
}

export function setCurrentView(filterType, itemId) {
  return async (dispatch, getState, { apiMethods }) => {
    dispatch({
      type: actions.SET_CURRENT_VIEW,
      payload: generateViewKey(filterType, itemId)
    });
    const view = getUiStateField(getState(), 'view');
    try {
      await apiMethods.updateUiState({ view });
    } catch (serverError) {
      // TODO handle error state
    }
  };
}
