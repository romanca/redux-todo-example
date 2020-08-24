export const LABELS_ACTIONS = {
  CREATE_LABEL: "CREATE_LABEL",
  FETCH_LABELS: "FETCH_LABELS_START",
  FETCH_LABELS_FINNISH: "FETCH_LABELS_FINISH",
  UPDATE_LABELS: "UPDATE_LABELS",
  REMOVE_LABEL: "REMOVE_LABEL",
};

export const createLabel = (label) => {
  return {
    type: LABELS_ACTIONS.CREATE_LABEL,
    payload: {
      ...label,
      id: Date.now(),
    },
  };
};
