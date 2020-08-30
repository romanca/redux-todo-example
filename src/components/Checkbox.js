import React from "react";
import CheckboxRaw from "rc-checkbox";

const Checkbox = ({ checked, onChange }) => {
  return <CheckboxRaw checked={checked} onChange={onChange} />;
};

export default Checkbox;
