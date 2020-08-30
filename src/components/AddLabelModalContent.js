import React, { useState, useEffect } from "react";
import FormField, { FORM_FILED_TYPES } from "./FormField";
import Space from "./Space";

const AddEditLabelModalContent = ({ onContentValuesChange, initialValues }) => {
  const [values, setValues] = useState({ label: "", color: "blue" });

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
      onContentValuesChange(initialValues);
    }
  }, [initialValues, onContentValuesChange]);

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
        label='Label name'
      />
      <Space x={10} />
      <FormField
        onChange={handleColorChange}
        type={FORM_FILED_TYPES.COLOR_PICKER}
        label='Label color'
      />
    </div>
  );
};

export default AddEditLabelModalContent;
