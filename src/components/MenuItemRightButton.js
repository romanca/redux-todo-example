import React from "react";
import { useProjectEditModal } from "../hooks";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";
import { useIndexedProjects } from "../selectors";

const HAMBURGER_ITEMS = [
  {
    label: "edit",
  },
  {
    label: "delete",
  },
];

const MenuItemRightButton = ({ type, itemId }) => {
  const openProjectsModal = useProjectEditModal();

  const indexedProjects = useIndexedProjects();

  const handleClick = (event) => {
    event.stopPropagation();
    switch (type) {
      case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
      case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
        openProjectsModal();
        break;
      case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
        openProjectsModal({ initialValues: indexedProjects[itemId] });
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
          onClick={(_, event) => handleClick(event)}
          contextMenuId={`CONTEXT_MENU_${MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER}_${itemId}`}
          items={HAMBURGER_ITEMS}
        />
      );
    default:
      return null;
  }
};

export default MenuItemRightButton;
