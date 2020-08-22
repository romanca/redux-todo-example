import React from "react";
import MenuItemRightButton from "./MenuItemRightButton";
import { useHover } from "../hooks";
import ArrowRightIcon from "./Icons/ArrowRightIcon";
import ArrowDownIcon from "./Icons/AroowDownIcon";
import { useTheme } from "../Theme/colors";

const MenuItem = ({
  item,
  itemType,
  opened,
  onToggle,
  customLeftIcon,
  rightIconVisible,
  isSubItem
}) => {
  const { listeners, hovered } = useHover();

  const { colors: { hoverBackground } } = useTheme();

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
    if (customLeftIcon) {
      return customLeftIcon;
    }
    if (item.items) {
      return opened ? <ArrowDownIcon /> : <ArrowRightIcon />;
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

  const color = hovered && !isSubItem ? "grey" : "black";
  const backgroundColor = hovered && isSubItem ? hoverBackground : 'unset';

  const isRightIconVisible = () => {
    if (!rightIconVisible) {
      return false;
    };
    if (isSubItem) {
      return hovered;
    }
    return true;
  };

  return (
    <div
      onClick={getItemClickHandler(item)}
      style={{
        marginLeft: 20,
        borderBottom,
        cursor: "pointer",
        backgroundColor
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
          <div style={{ marginLeft: 15, color }}>{item.label}</div>
          {isRightIconVisible() && (
            <MenuItemRightButton type={item.rightButtonType} itemId={item.id} />
          )}
        </div>
      </div>
      {hasSubItems ? (
        <div
          style={{
            height: subItemsHeight,
            overflow: "hidden",
            transition: "height 0.3s",
          }}
        >
          {item.items.map((i) => (
            <MenuItem
              isSubItem={true}
              key={i.id}
              itemType={itemType}
              item={i}
              rightIconVisible={rightIconVisible}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MenuItem;
