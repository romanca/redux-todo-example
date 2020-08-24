import React from "react";
import MenuItemRightButton from "./MenuItemRightButton";
import { useHover } from "../hooks";
import ArrowRightIcon from "./Icons/ArrowRightIcon";
import ArrowDownIcon from "./Icons/AroowDownIcon";
import { useTheme } from "../Theme/colors";
import { useCurrentViewUpdater } from "../Dispatchers";

const MenuItem = React.memo(
  ({
    item,
    itemType,
    opened,
    onToggle,
    customLeftIcon,
    rightIconVisible,
    isSubItem,
    log,
  }) => {
    const { listeners, hovered } = useHover();

    const {
      colors: { hoverBackground },
    } = useTheme();

    const updateCurrentView = useCurrentViewUpdater();

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
      updateCurrentView(itemType, item.id);
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
    const backgroundColor = hovered && isSubItem ? hoverBackground : "unset";

    const isRightIconVisible = () => {
      if (!rightIconVisible) {
        return false;
      }
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
          backgroundColor,
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
            <div style={{ marginLeft: 15, color, display: "flex" }}>
              {item.label}
              {item.activeTodos > 0 && (
                <div
                  style={{
                    marginLeft: 10,
                    fontSize: 13,
                    color: "grey",
                    alignSelf: "flex-end",
                  }}
                >
                  {item.activeTodos}
                </div>
              )}
            </div>
            {isRightIconVisible() && (
              <MenuItemRightButton
                type={item.rightButtonType}
                itemId={item.id}
              />
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
  }
);
export default MenuItem;
