import React, { useState } from "react";
import FormField, { FORM_FILED_TYPES } from "./FormField";
import Space from "./Space";

const AddProjectModalContent = ({ onContentValuesChange }) => {
  const [values, setValues] = useState({ label: "", color: "blue" });
  const getFieldChangeHandler = (field) => (e) => {
    const newValues = {
      ...values,
      [field]: e.target.value,
    };
    setValues(newValues);
    onContentValuesChange(newValues);
  };

  const handleColorChange = (value) => {
    const newValues = {
      ...values,
      color: value,
    };
    setValues(newValues);
    onContentValuesChange(newValues);
  };

  return (
    <div>
      <FormField
        value={values.label}
        onChange={getFieldChangeHandler("label")}
        label="Project name"
      />
      <Space x={10} />
      <FormField
        onChange={handleColorChange}
        type={FORM_FILED_TYPES.COLOR_PICKER}
        label="Project color"
      />
    </div>
  );
};

export default AddProjectModalContent;
