import React, { useState } from "react";

const Button = ({ label, onClick, backgroundColor }) => {
  return (
    <button style={{ backgroundColor }} onClick={onClick}>
      {label}
    </button>
  );
};

const Modal = ({ modalContent, onRequestClose, visible }) => {
  const { title, content, actions, validate } = modalContent;

  const [contentValues, setContentValues] = useState({});
  const [errors, setErrors] = useState({});

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
        transition: "opacity 0.5s",
        opacity: visible ? 1 : 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.49)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "40%",
          height: "fit-content",
          minHeight: 300,
          backgroundColor: "white",
          border: "1 px solid black",
          padding: 15,
          borderRadius: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            width: "100%",
            borderBottom: "1px solid black",
            paddingBottom: 5,
          }}
        >
          {title}
        </h3>
        <div style={{ flex: 1 }}>
          {content &&
            content({
              actions,
              onContentValuesChange,
              errors,
            })}
        </div>
        <div
          style={{
            borderTop: "1px solid black",
            paddingTop: 5,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
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
