import React, { useState, useEffect } from "react";
import FormField from "./FormField";

const AddTicketModalContent = ({ onContentValuesChange, errors }) => {
  const [values, setValues] = useState({ title: "" });

  useEffect(() => {
    onContentValuesChange(values);
  }, [])

  const getFieldChangeHandler = (field) => (e) => {
    const newValues = {
      ...values,
      [field]: e.target.value,
    };
    setValues(newValues);
    onContentValuesChange(newValues);
  };

  return (
    <div>
      <FormField
        error={errors ? errors.title : null}
        value={values.title}
        onChange={getFieldChangeHandler("title")}
        label="Todo name"
      />
    </div>
  );
};

export default AddTicketModalContent;
