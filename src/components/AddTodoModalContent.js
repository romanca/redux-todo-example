import React, { useState } from "react";
import FormField from "./FormField";

const AddTicketModalContent = ({ onContentValuesChange }) => {
  const [values, setValues] = useState({ title: "" });
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
        value={values.title}
        onChange={getFieldChangeHandler("title")}
        label="Todo name"
      />
    </div>
  );
};

export default AddTicketModalContent;
