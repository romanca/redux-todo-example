import { get } from "lodash";
import { useProjectEditModal, useConfirmationDialog } from "../hooks";
import { useIndexedProjects } from "../selectors";
import { useDispatch } from "react-redux";

export const contextMenuKeys = {
  TODO_VIEW: "TODO_VIEW",
};

const menuItems = {
  REMOVE: {
    label: "Remove",
    id: "REMOVE",
  },
  EDIT: {
    label: "Edit",
    id: "EDIT",
  },
};


const contextMenu = {
  [contextMenuKeys.TODO_VIEW]: [menuItems.REMOVE, menuItems.EDIT],
};

export function getContextMenuOptions(contextMenuKey) {
  return get(contextMenu, contextMenuKey);
}

export function useContextMenuActions() {
  const openProjectsModal = useProjectEditModal();

  const indexedProjects = useIndexedProjects();

  const showConfirmDialog = useConfirmationDialog();

  const dispatch = useDispatch();
}

export function useContextMenuItems() {
  return {
    getMenuItems: (contextMenuKey) => {}
  };
}
