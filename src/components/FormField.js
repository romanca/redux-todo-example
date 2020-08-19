import React from "react";
import ColorPicker from "./ColorPicker";
import ProjectsPicker from "./ProjectsPicker";

export const FORM_FILED_TYPES = {
  COLOR_PICKER: "COLOR_PICKER",
  PROJECTS_PICKER: "PROJECTS_PICKER",
};

const FormField = ({ type, onChange, value, label, error }) => {
  switch (type) {
    case FORM_FILED_TYPES.PROJECTS_PICKER:
      return (
        <div>
          <ProjectsPicker />
        </div>
      )
    case FORM_FILED_TYPES.COLOR_PICKER:
      return (
        <div>
          <div style={{ marginBottom: 5 }}>{label}</div>
          <ColorPicker onSubmit={onChange} />
        </div>
      );
    default:
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: 5 }}>{label}</div>
          <input onChange={onChange} value={value} style={{ padding: 5 }} />
          {error ? (
            <small style={{ color: "red", marginLeft: 5, marginTop: 5 }}>
              {error}
            </small>
          ) : null}
        </div>
      );
  }
};

export default FormField;
