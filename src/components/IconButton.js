import React from "react";
import { useHover } from "../hooks";
import ContextMenu from "./ContextMenu";

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
          <div
            {...listeners}
            style={{
              padding: "0 5px",
              backgroundColor,
              position: "absolute",
              right: 0,
              top: 0,
            }}
          >
            <div style={{ lineHeight: 0.2, fontSize: 20, height: 20 }}>
              <div>.</div>
              <div>.</div>
              <div>.</div>
            </div>
          </div>
        </ContextMenu>
      );
    case ICON_BUTTON_TYPES.PLUS:
      return (
        <div
          onClick={onClick}
          {...listeners}
          style={{
            padding: "0 5px",
            height: "fit-content",
            backgroundColor,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <div>+</div>
        </div>
      );
    default:
      return null;
  }
};

export default IconButton;
