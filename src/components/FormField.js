import React from "react";
import ColorPicker from "./ColorPicker";

export const FORM_FILED_TYPES = {
  COLOR_PICKER: "COLOR_PICKER",
};

const FormField = ({ type, onChange, value, label, error }) => {
  switch (type) {
    case FORM_FILED_TYPES.COLOR_PICKER:
      return (
        <div>
          <div style={{ marginBottom: 5 }}>{label}</div>
          <ColorPicker onSubmit={onChange} />
        </div>
      );
    default:
      return (
        <div>
          <div style={{ marginBottom: 5 }}>{label}</div>
          <input onChange={onChange} value={value} />
          {error ? <div style={{ color: "red" }}>{error}</div> : null}
        </div>
      );
  }
};

export default FormField;
