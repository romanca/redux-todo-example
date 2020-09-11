import React from "react";
import { Checkbox } from "pretty-checkbox-react";
import "pretty-checkbox";

const CheckBox = ({ checked, onChange, color }) => {
  return (
    <Checkbox
      style={{
        border: "3px solid ",
        borderRadius: "50%",
        color,
      }}
      checked={checked}
      onChange={onChange}
      className='pretty p-icon p-round p-pulse'
    />
  );
};

export default CheckBox;
