import React, { useState } from "react";
import { useProjectEditModal } from "../hooks";
import ContextMenu from "./ContextMenu";

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
  const [hovered, setHovered] = useState(false);

  const openProjectsModal = useProjectEditModal();

  const toggleHovered = () => {
    setHovered(!hovered);
  };

  const backgroundColor = hovered ? "lightGray" : "white";

  const renderIcon = () => {
    switch (type) {
      case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
      case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
        return <div>+</div>;
      case MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER:
      case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
        return (
          <ContextMenu
            onItemClick={() => {}}
            id={`CONTEXT_MENU_${MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER}_${itemId}`}
            items={HAMBURGER_ITEMS}
          >
            <div style={{ lineHeight: 0.2, fontSize: 20, height: 20 }}>
              <div>.</div>
              <div>.</div>
              <div>.</div>
            </div>
          </ContextMenu>
        );
      default:
        return null;
    }
  };

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

  return (
    <div
      onClick={handleClick}
      onMouseEnter={toggleHovered}
      onMouseLeave={toggleHovered}
      style={{
        padding: "0 5px",
        height: "fit-content",
        backgroundColor,
        position: "absolute",
        right: 0,
      }}
    >
      {renderIcon()}
    </div>
  );
};

export default MenuItemRightButton;
