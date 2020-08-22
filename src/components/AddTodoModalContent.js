import React, { useState, useEffect } from "react";
import FormField, { FORM_FILED_TYPES } from "./FormField";
import Space from "./Space";
import { useProjects } from "../selectors";
import { get } from "lodash";

const AddTicketModalContent = ({
  onContentValuesChange,
  errors,
  initialValues,
}) => {
  const projects = useProjects();
  const [values, setValues] = useState({
    title: "",
    projectId: null,
  });

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
      onContentValuesChange(initialValues);
    }
  }, [initialValues]);

  const getFieldChangeHandler = (field, valuePath) => (value) => {
    const newValues = {
      ...values,
      [field]: get(value, valuePath),
    };
    setValues(newValues);
    onContentValuesChange(newValues);
  };

  return (
    <div style={{ width: "50%", minWidth: 300 }}>
      <FormField
        error={errors ? errors.title : null}
        value={values.title}
        onChange={getFieldChangeHandler("title", "target.value")}
        label="Todo name"
      />
      <Space x={10} />
      <FormField
        type={FORM_FILED_TYPES.PROJECTS_PICKER}
        onChange={getFieldChangeHandler("projectId", "id")}
        value={values.projectId}
        items={projects}
      />
    </div>
  );
};

export default AddTicketModalContent;
