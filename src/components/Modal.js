import React, { useState } from "react";

const Button = ({ label, onClick, backgroundColor }) => {
  return (
    <button style={{ backgroundColor }} onClick={onClick}>
      {label}
    </button>
  );
};

const Modal = ({ modalContent, onRequestClose, visible }) => {
  const {
    title,
    content,
    actions,
    validate,
    small,
    initialValues,
  } = modalContent;

  const [contentValues, setContentValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const onContentValuesChange = (values) => {
    let newErrors = null;
    if (validate) {
      newErrors = validate(values);
      setErrors(newErrors);
    }
    setContentValues(values);
  };

  const getActionClickHandler = (action) => () => {
    if (action.type === "CONTENT_CONFIRMATION") {
      setSubmitAttempt(true);
      let newErrors = null;
      if (validate) {
        newErrors = validate(contentValues);
        setErrors(newErrors);
      }
      action.onClick({ values: contentValues, errors: newErrors });
    } else {
      if (action.onClick) {
        action.onClick();
      }
    }
    if (action.requestClose) {
      onRequestClose();
    }
  };

  return (
    <div
      style={{
        transition: "opacity 0.1s",
        opacity: visible ? 1 : 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.49)",
        zIndex: 9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div
        style={{
          width: small ? 200 : "40%",
          height: "fit-content",
          minHeight: 150,
          backgroundColor: "white",
          border: "1 px solid black",
          padding: 15,
          borderRadius: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <h3
          style={{
            width: "100%",
            borderBottom: "1px solid black",
            paddingBottom: 5,
          }}>
          {title}
        </h3>
        <div style={{ flex: 1, paddingBottom: 20 }}>
          {content &&
            content({
              actions,
              onContentValuesChange,
              errors: submitAttempt ? errors : {},
              initialValues,
            })}
        </div>
        <div
          style={{
            borderTop: "1px solid black",
            paddingTop: 5,
            display: "flex",
            justifyContent: "flex-end",
          }}>
          {actions.map((i, index) => (
            <div key={index} style={{ marginRight: 5 }}>
              <Button
                backgroundColor={i.color}
                label={i.label}
                onClick={getActionClickHandler(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
