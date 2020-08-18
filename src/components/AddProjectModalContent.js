import React, { useState } from "react";
import FormField, { FORM_FILED_TYPES } from "./FormField";
import Space from "./Space";

const AddProjectModalContent = ({ actions, onContentValuesChange }) => {
  const [values, setValues] = useState({ title: "", color: "blue" });
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
        value={values.title}
        onChange={getFieldChangeHandler("title")}
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
