import React, { useState, useEffect } from "react";
import { BlockPicker } from "react-color";

const colors = ["red", "pink", "green", "yellow", "purple"];

const ColorPicker = ({ onSubmit }) => {
  const [opened, setOpened] = useState(false);
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    onSubmit(color);
  }, [])

  const togglePicker = () => {
    setOpened(!opened);
  };

  const handleColorChange = ({ hex }) => {
    setColor(hex);
    togglePicker();
    onSubmit(hex);
  }

  return (
    <>
      <div
        onClick={togglePicker}
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
      {opened && (
        <BlockPicker
          colors={colors}
          color={color}
          onChange={handleColorChange}
        />
      )}
    </>
  );
};

export default ColorPicker;
