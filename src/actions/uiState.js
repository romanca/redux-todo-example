export const actions = {
  SET_UI_STATE_FIELD: "SET_UI_STATE_FIELD",
  LOAD_UI_STATE: "LOAD_UI_STATE",
};

export const uiStateFields = {
  projectsOpened: "projectsOpened",
};

export function toggleProjectsMenuItem(value) {
  return async (dispatch, _, { apiMethods }) => {
    dispatch({
      type: actions.SET_UI_STATE_FIELD,
      field: uiStateFields.projectsOpened,
      value,
    });
    try {
      await apiMethods.updateUiState({ [uiStateFields.projectsOpened]: value });
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
