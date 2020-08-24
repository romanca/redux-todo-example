import React from "react";
import { useProjectEditModal, useConfirmationDialog } from "../hooks";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";
import { useIndexedProjects } from "../selectors";
import { useDispatch } from "react-redux";
import { removeProject } from "../actions/projects";

const HAMBURGER_ITEMS = [
  {
    label: "edit",
    id: "EDIT",
  },
  {
    label: "delete",
    id: "DELETE",
  },
];

const MenuItemRightButton = ({ type, itemId }) => {
  const openProjectsModal = useProjectEditModal();

  const indexedProjects = useIndexedProjects();

  const showConfirmDialog = useConfirmationDialog();

  const dispatch = useDispatch();

  const handleClick = (event, value) => {
    event.stopPropagation();
    switch (type) {
      case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
      case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
        openProjectsModal();
        break;
      case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
        if (value.id === "EDIT") {
          openProjectsModal({ initialValues: indexedProjects[itemId] });
          return;
        }
        if (value.id === "DELETE") {
          showConfirmDialog({
            title: "Project Removal",
            message: "Are you sure you want to remove this task?",
            onConfirm: () => {
              dispatch(removeProject(itemId));
            },
          });
        }
        break;
      default:
        return null;
    }
  };

  switch (type) {
    case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
    case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
      return <IconButton type={ICON_BUTTON_TYPES.PLUS} onClick={handleClick} />;
    case MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER:
    case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
      return (
        <IconButton
          type={ICON_BUTTON_TYPES.CONTEXT_MENU}
          onClick={(value, event) => handleClick(event, value)}
          contextMenuId={`CONTEXT_MENU_${MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER}_${itemId}`}
          items={HAMBURGER_ITEMS}
        />
      );
    default:
      return null;
  }
};

export default MenuItemRightButton;
