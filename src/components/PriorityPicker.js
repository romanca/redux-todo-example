import React from "react";
import { PickerButton } from "../StyledComponents";
import ContextMenu from "./ContextMenu";

export const priorities = [
  { id: "priority1", label: "Low", color: "green" },
  { id: "priority2", label: "Medium", color: "orange" },
  { id: "priority3", label: "High", color: "red" },
];

const PriorityPicker = ({ onChange, value }) => {
  const handleClick = (item) => {
    onChange(item);
  };

  const backgroundColor = value ? value.color : "grey";

  return (
    <ContextMenu
      items={priorities}
      onItemClick={handleClick}
      id='PRIORITY_PICKER'>
      <PickerButton>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor,
            borderRadius: "50%",
            marginRight: 5,
          }}></div>
        {value ? <div>{value.label}</div> : "Select Priority"}
      </PickerButton>
    </ContextMenu>
  );
};

export default PriorityPicker;
