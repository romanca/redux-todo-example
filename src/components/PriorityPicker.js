import React from "react";
import Select from "react-select";

export const priorities = [
  { id: "priority1", label: "Low", color: "red" },
  { id: "priority2", label: "Medium", color: "orange" },
  { id: "priority3", label: "High", color: "green" },
];

const PriorityPicker = ({ onChange, value }) => {
  return (
    <div style={{ width: 150 }}>
      <Select
        options={priorities}
        placeholder='Priority'
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
export default PriorityPicker;
