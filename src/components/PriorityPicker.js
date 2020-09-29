import React from "react";
import { Button, SelectMenu } from "evergreen-ui";
import Component from "@reactions/component";

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
    <Component>
      <SelectMenu
        width={140}
        height={140}
        closeOnSelect={true}
        options={priorities.map((i) => ({
          ...i,
          value: i.id,
          icon: i.icon,
        }))}
        onSelect={handleClick}
        hasFilter={false}
        title='Select priority'>
        <Button
          style={{
            background: "transparent",
            outline: "none",
            border: "1px solid black",
            borderRadius: 7,
          }}>
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor,
              borderRadius: "50%",
              marginRight: 5,
            }}></div>
          {value ? <div>{value.label}</div> : "Select Priority"}
        </Button>
      </SelectMenu>
    </Component>
  );
};

export default PriorityPicker;
