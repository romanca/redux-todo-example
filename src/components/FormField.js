import React from "react";
import { TextInputField } from "evergreen-ui";
import ColorPicker from "./ColorPicker";
import ProjectsPicker from "./ProjectsPicker";

export const FORM_FILED_TYPES = {
  COLOR_PICKER: "COLOR_PICKER",
  PROJECTS_PICKER: "PROJECTS_PICKER",
};

const FormField = ({ type, onChange, value, label, error, items }) => {
  switch (type) {
    case FORM_FILED_TYPES.PROJECTS_PICKER:
      return (
        <div>
          <ProjectsPicker onChange={onChange} value={value} projects={items} />
        </div>
      );
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
          <TextInputField onChange={onChange} value={value} autoFocus />
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
