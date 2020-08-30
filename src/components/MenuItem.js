import React from "react";
import MenuItemRightButton from "./MenuItemRightButton";
import { useHover } from "../hooks";
import ArrowRightIcon from "./Icons/ArrowRightIcon";
import ArrowDownIcon from "./Icons/AroowDownIcon";
import { useCurrentViewUpdater } from "../Dispatchers";
import { useTheme } from "../Theme";

const MenuItem = React.memo(
  ({
    item,
    itemType,
    opened,
    onToggle,
    customLeftIcon,
    rightIconVisible,
    isSubItem,
    visible,
  }) => {
    const { listeners, hovered: firstHovered } = useHover();
    const { listeners: secondListeners, hovered: secondHovered } = useHover();

    const hovered = firstHovered || secondHovered;

    const {
      colors: { hoverBackground },
      sizes: { menuItemHeight },
    } = useTheme();

    const updateCurrentView = useCurrentViewUpdater();

    const toggleOpened = () => {
      onToggle(!opened);
    };

    const hasSubItems = item.items && item.items.length;

    const borderBottom = isSubItem ? "" : "0.5px solid lightgrey";

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

    const backgroundColor =
      hovered && isSubItem && visible ? hoverBackground : "unset";

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
        }}>
        <div
          {...listeners}
          style={{
            position: "absolute",
            width: "100%",
            height: menuItemHeight,
            backgroundColor,
            left: 0,
          }}
        />
        <div
          {...secondListeners}
          style={{
            padding: "10px 0",
            maxHeight: menuItemHeight,
            borderBottom: opened ? borderBottom : "",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}>
            {renderLeftIcon()}
            <div
              style={{
                marginLeft: isSubItem ? 5 : 15,
                display: "flex",
                fontWeight: !isSubItem ? "bold" : "normal",
              }}>
              {item.label}
              {item.activeTodos > 0 && (
                <div
                  style={{
                    marginLeft: 10,
                    fontSize: 13,
                    color: "grey",
                    alignSelf: "flex-end",
                  }}>
                  {item.activeTodos}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }} />
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
              paddingBottom: 2,
            }}>
            {item.items.map((i) => (
              <MenuItem
                visible={opened}
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
