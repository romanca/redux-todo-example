import React from "react";
import { PlusIcon as PlusIconRaw } from "evergreen-ui";
import { useTheme } from "../../Theme";

const PlusIcon = ({ hovered, style }) => {
  const {
    colors: { hoveredIcon },
  } = useTheme();
  const color = hovered ? hoveredIcon : null;
  return <PlusIconRaw color={color} style={{ fontSize: 15, ...style }} />;
};

export default PlusIcon;
