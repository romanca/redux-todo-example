export const LABELS_ACTIONS = {
  CREATE_LABEL: "CREATE_LABEL",
  FETCH_LABELS_START: "FETCH_LABELS_START",
  FETCH_LABELS_FINNISH: "FETCH_LABELS_FINISH",
  UPDATE_LABEL: "UPDATE_LABEL",
  REMOVE_LABEL: "REMOVE_LABEL",
};

export function createLabel(label) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      const { labels } = await apiMethods.createLabel(label);
      dispatch({
        type: LABELS_ACTIONS.CREATE_LABEL,
        payload: labels,
      });
    } catch (err) {
      // TODO handle eroro state
    }
  };
}

export function updateLabel(payload) {
  return async (dispatch, _, { apiMethods }) => {
    console.log(payload);
    try {
      await apiMethods.updateLabel(payload);
      dispatch({
        type: LABELS_ACTIONS.UPDATE_LABEL,
        payload,
      });
    } catch (err) {
      // TODO handle eroro state
    }
  };
}

export function removeLabel(id) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      await apiMethods.removeLabel(id);
      dispatch({
        type: LABELS_ACTIONS.REMOVE_LABEL,
        payload: id,
      });
    } catch (err) {
      // TODO handle eroro state
    }
  };
}

export function getAllLabels() {
  return async (dispatch, _, { apiMethods }) => {
    dispatch({
      type: LABELS_ACTIONS.FETCH_LABELS_START,
    });
    try {
      const payload = await apiMethods.getLabels();
      dispatch({
        type: LABELS_ACTIONS.FETCH_LABELS_FINNISH,
        payload,
      });
    } catch (err) {
      // TODO handle error state
    }
  };
}
