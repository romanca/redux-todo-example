import React from "react";
import { FaPlus } from "react-icons/fa";
import { useTheme } from "../../Theme";

const PlusIcon = ({ hovered }) => {
    const { colors: { hoveredIcon } } = useTheme();
    const color = hovered ? hoveredIcon : null;
    return <FaPlus color={color} size={15} />
}

export default PlusIcon;
