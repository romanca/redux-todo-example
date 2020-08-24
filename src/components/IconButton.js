import React from "react";
import { useHover } from "../hooks";
import ContextMenu from "./ContextMenu";
import DottedMenuIcon from "./Icons/DottedMenuIcon";
import PlusIcon from "./Icons/PlusIcon";
import { useTheme } from "../Theme";

export const ICON_BUTTON_TYPES = {
  PLUS: "PLUS",
  CONTEXT_MENU: "CONTEXT_MENU",
  CLOSE: "CLOSE",
};

const IconButton = ({ type, onClick, contextMenuId, items }) => {
  const { listeners, hovered } = useHover();
  const backgroundColor = hovered ? "lightGray" : "white";
  switch (type) {
    case ICON_BUTTON_TYPES.CLOSE:
      return (
        <div style={{ float: "right", marginTop: -4 }}>
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
            onClick={onClick}
          >
            x
          </button>
        </div>
      );
    case ICON_BUTTON_TYPES.CONTEXT_MENU:
      return (
        <ContextMenu onItemClick={onClick} id={contextMenuId} items={items}>
          <div style={{ display: "flex" }} {...listeners}>
            <DottedMenuIcon hovered={hovered} />
          </div>
        </ContextMenu>
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
          }}
        >
          <PlusIcon hovered={hovered} />
        </div>
      );
    default:
      return null;
  }
};

export default IconButton;
