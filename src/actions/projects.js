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
      const { apiResult } = await apiMethods.createProject(project);
      const { data } = await apiResult;
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
      const { apiResult } = await apiMethods.updateProject(payload);
      const { data } = await apiResult;
      dispatch({
        type: PROJECTS_ACTIONS.UPDATE_PROJECT,
        payload: data,
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
      const { cacheResult, apiResult } = await apiMethods.getProjects();
      const { data: cache } = await cacheResult;
      dispatch({
        type: PROJECTS_ACTIONS.FETCH_PROJECTS_FINNISH,
        payload: cache,
      });
      const { data: payload } = await apiResult;
      dispatch({
        type: PROJECTS_ACTIONS.FETCH_PROJECTS_FINNISH,
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: PROJECTS_ACTIONS.FETCH_PROJECTS_FINNISH,
        payload: [],
      });
    }
  };
}
