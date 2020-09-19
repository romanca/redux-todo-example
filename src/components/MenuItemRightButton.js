import React from "react";
import {
  useProjectEditModal,
  useLabelEditModal,
  useRightButtonContextMenu,
} from "../hooks";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";

const MenuItemRightButton = ({ type, item = {}, isVisible = true }) => {
  const openLabelsModal = useLabelEditModal();

  const openProjectsModal = useProjectEditModal();

  const contextMenuItems = useRightButtonContextMenu(item, type);

  const handleClick = (event, value) => {
    event.stopPropagation();
    switch (type) {
      case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
        openProjectsModal();
        break;
      case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
        openLabelsModal();
        break;
      default:
        return null;
    }
  };

  switch (type) {
    case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
    case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
      return (
        <IconButton
          type={ICON_BUTTON_TYPES.PLUS}
          onClick={handleClick}
          isVisible={isVisible}
        />
      );
    case MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER:
    case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
      return (
        <IconButton
          isVisible={isVisible}
          type={ICON_BUTTON_TYPES.CONTEXT_MENU}
          contextMenuId={`CONTEXT_MENU_${MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER}_${item.id}`}
          items={contextMenuItems}
        />
      );
    default:
      return null;
  }
};

export default MenuItemRightButton;
