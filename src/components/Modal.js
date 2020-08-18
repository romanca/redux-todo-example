import React, { useState } from "react";

const Button = ({ label, onClick, backgroundColor }) => {
  return (
    <button style={{ backgroundColor }} onClick={onClick}>
      {label}
    </button>
  );
};

const Modal = ({ modalContent, onRequestClose }) => {
  const { title, content, actions } = modalContent;

  const [contentValues, setContentValues] = useState(null);

  const getActionClickHandler = (action) => () => {
    if (action.type === "CONTENT_CONFIRMATION") {
      action.onClick(contentValues);
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
          height: 300,
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
            content({ actions, onContentValuesChange: setContentValues })}
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
