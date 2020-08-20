import React from "react";
import MenuItemRightButton from "./MenuItemRightButton";
import { useHover } from "../hooks";

const MenuItem = ({ item, itemType, opened, onToggle }) => {
  const { listeners, hovered } = useHover();

  const toggleOpened = () => {
    onToggle(!opened);
  };

  const hasSubItems = item.items && item.items.length;

  const borderBottom = opened ? "" : "1px solid black";

  const subItemsHeight = !hasSubItems || !opened ? 0 : item.items.length * 38;

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
      return `>`;
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

  const color = hovered ? "grey" : "black";

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
          {...listeners}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {renderLeftIcon()}
          <div style={{ marginLeft: 5, color }}>{item.label}</div>
          <MenuItemRightButton type={item.rightButtonType} itemId={item.id} />
        </div>
      </div>
      {hasSubItems ? (
        <div style={{ height: subItemsHeight, overflow: "hidden", transition: "height 0.3s" }}>
          {item.items.map((i) => (
            <MenuItem key={i.id} itemType={itemType} item={i} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MenuItem;
