import React from "react";
import { Button as ButtonRaw } from "evergreen-ui";

const Button = ({ children, onClick, disabled, style }) => {
  return (
    <div>
      <ButtonRaw
        onClick={onClick}
        disabled={disabled}
        style={{
          height: 35,
          background: "tomato",
          fontWeight: 700,
          fontSize: "13px!important",
          lineHeight: "17px",
          borderRadius: 5,
          outline: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: 10,
          color: "black",
          ...style,
        }}>
        {children}
      </ButtonRaw>
    </div>
  );
};
export default Button;
