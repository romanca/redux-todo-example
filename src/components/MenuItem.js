import React, { useState } from "react";
import MenuItemRightButton from "./MenuItemRightButton";

const MenuItem = ({ item, itemType }) => {
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(false);
  const toggleHovered = () => {
    setHovered(!hovered);
  };

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const areSubItemsVisible = opened && item.items && item.items.length;

  const borderBottom = opened ? "" : "1px solid black";

  const getItemClickHandler = (item) => (event) => {
    event.stopPropagation();
    if (item.items) {
      toggleOpened();
      return;
    }
    alert(`item clicked: ${item.label} TYPE: ${itemType}`);
  };

  const renderLeftIcon = () => {
    if (item.items) {
      return `>   `;
    }
    return (
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: item.color,
          marginRight: 10,
        }}
      />
    );
  };

  const color = hovered ? 'grey' : 'black';

  return (
    <div
      onClick={getItemClickHandler(item)}
      style={{
        marginLeft: 20,
        borderBottom,
        cursor: "pointer",
      }}
    >
      <div style={{ padding: "10px 0" }}>
        <div
          onMouseEnter={toggleHovered}
          onMouseLeave={toggleHovered}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {renderLeftIcon()}
          <span style={{ marginLeft: 5, color }} >{item.label}</span>
          {<MenuItemRightButton type={item.rightButtonType} />}
        </div>
      </div>
      {areSubItemsVisible
        ? item.items.map((i) => (
            <MenuItem key={i.id} itemType={itemType} item={i} />
          ))
        : null}
    </div>
  );
};

export default MenuItem;
