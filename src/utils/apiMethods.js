import { getKeyFromLs, setItemToLS } from "./localDb";

const LS_KEYS = {
  projects: "projects",
  uiState: "uiState",
};

function createIdForItem(item) {
  return {
    ...item,
    id: Date.now(),
  };
}

class ApiMethods {
  getProjects = () => getKeyFromLs(LS_KEYS.projects, []);
  createProject = async (data) => {
    const projects = await this.getProjects();
    const project = createIdForItem(data);
    setItemToLS(LS_KEYS.projects, [...projects, project]);
    return Promise.resolve({ data: project });
  };
  getUiState = () => getKeyFromLs(LS_KEYS.uiState, null);
  updateUiState = async (updatedValues) => {
    const uiState = await this.getUiState();
    setItemToLS(LS_KEYS.uiState, {
      ...uiState,
      ...updatedValues,
    });
    return Promise.resolve();
  };
}

export default new ApiMethods();
