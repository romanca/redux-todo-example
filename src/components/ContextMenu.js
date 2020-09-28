import React from "react";
import {
  ContextMenu as ContextMenuRaw,
  MenuItem,
  ContextMenuTrigger,
} from "react-contextmenu";
import { useHover } from "../hooks";

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
          borderBottom: "1px solid black",
          backgroundColor,
          cursor: "pointer",
          minWidth: 150,
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
      <ContextMenuRaw
        hideOnLeave={false}
        id={id}
        style={{
          border: "1px solid black",
          backgroundColor: "white",
          borderBottomWidth: 0,
          zIndex: 9999,
        }}>
        {menuContent && menuContent}
        {items &&
          items.map((i, index) => (
            <Item key={index} item={i} onClick={onItemClick} />
          ))}
      </ContextMenuRaw>
    </>
  );
};

export default ContextMenu;
