import React from "react";
import { Pane, Popover, Position } from "evergreen-ui";
import { useHover } from "../hooks";

const Item = ({ item, onClick, close, props }) => {
  const { listeners, hovered } = useHover();
  const backgroundColor = hovered ? "whitesmoke" : "white";

  return (
    <div
      onClick={(event) => {
        onClick(item, event);
      }}>
      <div
        onClick={close}
        {...props}
        {...listeners}
        style={{
          cursor: "pointer",
          minWidth: 150,
          paddingLeft: 15,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor,
          borderBottom: "1px solid #E4E7EB",
        }}>
        {item.label}
      </div>
    </div>
  );
};

const Context = ({ children, items, onItemClick }) => {
  return (
    <Popover
      content={({ close }) => (
        <Pane>
          {items &&
            items.map((i, index) => (
              <Item key={index} item={i} onClick={onItemClick} close={close} />
            ))}
        </Pane>
      )}>
      {children}
    </Popover>
  );
};

export default Context;
