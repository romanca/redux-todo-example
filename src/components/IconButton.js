import React from "react";
import { useHover } from "../hooks";
import DottedMenuIcon from "./Icons/DottedMenuIcon";
import PlusIcon from "./Icons/PlusIcon";
import Context from "./Popover";

export const ICON_BUTTON_TYPES = {
  PLUS: "PLUS",
  CONTEXT_MENU: "CONTEXT_MENU",
  CLOSE: "CLOSE",
};

const IconButton = ({ type, onClick, contextMenuId, items, isVisible }) => {
  const { listeners } = useHover();
  const hovered = true;
  const backgroundColor = hovered ? "lightGray" : "white";

  const handleContextMenuItemClick = (...params) => {
    const [item] = params;

    if (item && item.method) {
      item.method();
    }

    if (onClick) {
      onClick(...params);
    }
  };

  switch (type) {
    case ICON_BUTTON_TYPES.CLOSE:
      return (
        <div
          style={{ float: "right", marginTop: -4, opacity: isVisible ? 1 : 0 }}>
          <button
            style={{
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              outline: "none",
              backgroundColor,
              borderRadius: 4,
            }}
            {...listeners}
            onClick={onClick}>
            x
          </button>
        </div>
      );
    case ICON_BUTTON_TYPES.CONTEXT_MENU:
      return (
        <Context
          onItemClick={handleContextMenuItemClick}
          id={contextMenuId}
          items={items}>
          <div
            style={{ display: "flex", opacity: isVisible ? 1 : 0 }}
            {...listeners}>
            <DottedMenuIcon hovered={hovered} />
          </div>
        </Context>
      );
    case ICON_BUTTON_TYPES.PLUS:
      return (
        <div
          onClick={onClick}
          {...listeners}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isVisible ? 1 : 0,
          }}>
          <PlusIcon hovered={hovered} />
        </div>
      );
    default:
      return null;
  }
};

export default IconButton;
