import React from "react";
import { Menu, Popover, Position } from "evergreen-ui";
import { useHover } from "../hooks";

const Item = ({ item, onSelect }) => {
  const { listeners } = useHover();

  return (
    <Menu.Item
      onSelect={(event) => {
        onSelect(item, event);
      }}>
      <div
        {...listeners}
        style={{
          padding: 5,
          cursor: "pointer",
          minWidth: 150,
        }}>
        {item.label}
      </div>
    </Menu.Item>
  );
};

const Context = ({ children, items, onItemClick }) => {
  return (
    <div>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              {items &&
                items.map((i, index) => (
                  <Item key={index} item={i} onSelect={onItemClick} />
                ))}
            </Menu.Group>
          </Menu>
        }>
        {children}
      </Popover>
    </div>
  );
};

export default Context;
