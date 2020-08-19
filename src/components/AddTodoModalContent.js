import React, { useState } from "react";
import FormField, { FORM_FILED_TYPES } from "./FormField";
import Space from "./Space";

const AddTicketModalContent = ({ onContentValuesChange, errors }) => {
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
    <div style={{ width: "50%", minWidth: 300 }}>
      <FormField
        error={errors ? errors.title : null}
        value={values.title}
        onChange={getFieldChangeHandler("title")}
        label="Todo name"
      />
      <Space x={10} />
      <FormField type={FORM_FILED_TYPES.PROJECTS_PICKER} />
    </div>
  );
};

export default AddTicketModalContent;
