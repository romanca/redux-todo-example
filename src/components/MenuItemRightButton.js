import React from "react";
import { useProjectEditModal } from "../hooks";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";

export const MENU_ACTION_BUTTON_TYPES = {
  ADD_PROJECT: "ADD_PROJECT",
  ADD_LABEL: "ADD_LABEL",
  PROJECTS_HAMBURGER: "PROJECTS_HAMBURGER",
  LABEL_HAMBURGER: "LABEL_HAM",
};

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

  const handleClick = (event) => {
    event.stopPropagation();
    switch (type) {
      case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
      case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
        openProjectsModal();
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
          onClick={() => {}}
          contextMenuId={`CONTEXT_MENU_${MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER}_${itemId}`}
          items={HAMBURGER_ITEMS}
        />
      );
    default:
      return null;
  }
};

export default MenuItemRightButton;
