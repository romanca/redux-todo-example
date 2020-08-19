import React, { useState, useEffect } from "react";
import { BlockPicker } from "react-color";
import ContextMenu from "./ContextMenu";
import { hideMenu } from "react-contextmenu";

const colors = ["red", "pink", "green", "yellow", "purple"];

const COLOR_PICKER_MENU_ID = 'COLOR_PICKER_MENU_ID';

const ColorPicker = ({ onSubmit }) => {
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    onSubmit(color);
  }, []);

  const handleColorChange = ({ hex }) => {
    setColor(hex);
    onSubmit(hex);
    hideMenu(COLOR_PICKER_MENU_ID);
  };

  return (
    <ContextMenu
      id={COLOR_PICKER_MENU_ID}
      menuContent={
        <BlockPicker
          colors={colors}
          color={color}
          onChange={handleColorChange}
        />
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          padding: 5,
          border: "1px solid black",
          borderRadius: 5,
          width: 100,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 10,
            backgroundColor: color,
            marginRight: 10,
          }}
        />
        {color}
      </div>
    </ContextMenu>
  );
};

export default ColorPicker;
