import React, { useState, useEffect } from "react";
import { BlockPicker } from "react-color";
import { Popover, Button } from "evergreen-ui";

const colors = ["red", "green", "yellow", "purple", "blue"];

const ColorPicker = ({ onSubmit }) => {
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    onSubmit(color);
  }, []);

  const handleColorChange = ({ hex }) => {
    setColor(hex);
    onSubmit(hex);
  };

  return (
    <Popover
      minWidth={100}
      content={
        <BlockPicker
          colors={colors}
          color={color}
          onChange={handleColorChange}
        />
      }>
      <Button
        style={{
          background: "transparent",
          outline: "none",
          border: "1px solid black",
          borderRadius: 7,
          marginBottom: 10,
          marginTop: 5,
        }}>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: color,
            borderRadius: 10,
            marginLeft: -8,
            marginRight: 5,
          }}
        />
        {color}
      </Button>
    </Popover>
  );
};

export default ColorPicker;
