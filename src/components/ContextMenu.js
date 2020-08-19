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
    <MenuItem data={{ foo: "bar" }} onClick={() => {}}>
      <div
        onClick={() => {
          onClick(item);
        }}
        {...listeners}
        style={{
          padding: 5,
          borderBottom: "1px solid black",
          backgroundColor,
          cursor: "pointer",
        }}
      >
        {item.label}
      </div>
    </MenuItem>
  );
};

const ContextMenu = ({ children, items, onItemClick, id, menuContent }) => {
  return (
    <div style={{ width: 'fit-content' }}>
      <ContextMenuTrigger id={id} mouseButton={0}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuRaw
        id={id}
        style={{
          border: "1px solid black",
          backgroundColor: "white",
          borderBottomWidth: 0,
          zIndex: 9999
        }}
      >
        {menuContent && menuContent}
        {items && items.map((i, index) => (
          <Item key={index} item={i} onClick={onItemClick} />
        ))}
      </ContextMenuRaw>
    </div>
  );
};

export default ContextMenu;
