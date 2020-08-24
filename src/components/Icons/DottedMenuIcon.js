import React from 'react';
import { FaEllipsisV } from "react-icons/fa";
import { useTheme } from '../../Theme';

const DottedMenuIcon = ({ hovered }) => {
    const { colors: { hoveredIcon } } = useTheme();
    const color = hovered ? hoveredIcon : null;
    return <FaEllipsisV size={15} color={color} />
}

export default DottedMenuIcon;
