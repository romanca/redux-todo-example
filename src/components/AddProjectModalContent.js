import React, { useState, useEffect } from "react";
import FormField, { FORM_FILED_TYPES } from "./FormField";
import Space from "./Space";
import Switch from "./Switch";

const AddProjectModalContent = ({ onContentValuesChange, initialValues }) => {
  const [values, setValues] = useState({
    label: "",
    color: "blue",
    isFavorite: false,
  });

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
      onContentValuesChange(initialValues);
    }
  }, [initialValues]);

  const setState = (state) => {
    setValues(state);
    onContentValuesChange(state);
  };

  const getFieldChangeHandler = (field) => (e) => {
    const newValues = {
      ...values,
      [field]: e.target.value,
    };
    setState(newValues);
  };

  const handleColorChange = (value) => {
    const newValues = {
      ...values,
      color: value,
    };
    setState(newValues);
  };

  const onSwitchChange = () => {
    const newState = {
      ...values,
      isFavorite: !values.isFavorite,
    };
    setState(newState);
  };

  return (
    <div>
      <FormField
        value={values.label}
        onChange={getFieldChangeHandler("label")}
        label='Project name'
      />
      <Space y={10} />
      <FormField
        onChange={handleColorChange}
        type={FORM_FILED_TYPES.COLOR_PICKER}
        label='Project color'
      />
      <Switch checked={values.isFavorite} onChange={onSwitchChange} />
    </div>
  );
};

export default AddProjectModalContent;
