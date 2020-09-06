import React from "react";
import { Checkbox } from "pretty-checkbox-react";

const CheckBox = ({ checked, onChange }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      className='pretty p-icon p-round p-pulse'
    />
  );
};

export default CheckBox;
