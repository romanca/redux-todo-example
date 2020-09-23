import React from "react";
import {
  ContextMenu as ContextMenuRaw,
  MenuItem,
  ContextMenuTrigger,
} from "react-contextmenu";
import { useHover } from "../hooks";
import Pane from "./Pane";

const Item = ({ item, onClick }) => {
  const { listeners, hovered } = useHover();
  const backgroundColor = hovered ? "lightGray" : "";
  return (
    <MenuItem
      onClick={(event) => {
        onClick(item, event);
      }}>
      <div
        {...listeners}
        style={{
          padding: 5,
          backgroundColor,
          cursor: "pointer",
          minWidth: 150,
          borderRadius: 3,
        }}>
        {item.label}
      </div>
    </MenuItem>
  );
};

const ContextMenu = ({ children, items, onItemClick, id, menuContent }) => {
  return (
    <>
      <ContextMenuTrigger id={id} mouseButton={0}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuRaw hideOnLeave={false} id={id}>
        <Pane
          style={{
            backgroundColor: "white",
          }}>
          {menuContent && menuContent}
          {items &&
            items.map((i, index) => (
              <Item key={index} item={i} onClick={onItemClick} />
            ))}
        </Pane>
      </ContextMenuRaw>
    </>
  );
};

export default ContextMenu;
