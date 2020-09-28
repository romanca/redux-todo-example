import React from "react";

export const PickerButton = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        padding: 5,
        alignItems: "baseline",
        border: "1px solid black",
        width: "fit-content",
        borderRadius: 5,
        cursor: "pointer",
      }}>
      {children}
    </div>
  );
};
