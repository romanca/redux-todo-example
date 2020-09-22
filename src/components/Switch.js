import React from "react";
import { Switch as SwitchRaw } from "evergreen-ui";

const Switch = ({ onChange, checked }) => {
  return (
    <div>
      <SwitchRaw height={20} checked={checked} onChange={onChange} />
    </div>
  );
};

export default Switch;
