import React from "react";
import SelectRaw from "react-select";

const Select = ({ options, onChange, value, placeholder }) => {
  return (
    <SelectRaw
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
export default Select;
