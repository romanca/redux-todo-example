export const PROJECTS_ACTIONS = {
  CREATE_PROJECT: "CREATE_PROJECT",
  FETCH_PROJECTS_START: "FETCH_PROJECTS_START",
  FETCH_PROJECTS_FINNISH: "FETCH_PROJECTS_FINNISH",
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  REMOVE_PROJECT: 'REMOVE_PROJECT'
};

export function createProject(project) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      const { data } = await apiMethods.createProject(project);
      dispatch({
        type: PROJECTS_ACTIONS.CREATE_PROJECT,
        payload: data,
      });
    } catch (err) {
      // TODO handle error state
    }
  };
}

export function editProject(payload) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      await apiMethods.updateProject(payload);
      dispatch({
        type: PROJECTS_ACTIONS.UPDATE_PROJECT,
        payload,
      });
    } catch (err) {
      // TODO handle error state
    }
  };
}

export function removeProject(id) {
  return async (dispatch, _, { apiMethods }) => {
    try {
      await apiMethods.removeProject(id);
      dispatch({
        type: PROJECTS_ACTIONS.REMOVE_PROJECT,
        payload: id,
      });
    } catch (err) {
      // TODO handle error state
    }
  };
}

export function getAllProjects() {
  return async (dispatch, _, { apiMethods }) => {
    dispatch({
      type: PROJECTS_ACTIONS.FETCH_PROJECTS_START,
    });
    try {
      const payload = await apiMethods.getProjects();
      dispatch({
        type: PROJECTS_ACTIONS.FETCH_PROJECTS_FINNISH,
        payload,
      });
    } catch (err) {
      dispatch({
        type: PROJECTS_ACTIONS.FETCH_PROJECTS_FINNISH,
        payload: [],
      });
    }
  };
}
