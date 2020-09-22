import React from "react";
import { Button as ButtonRaw } from "evergreen-ui";

const Button = ({ children, onClick, disabled, style }) => {
  return (
    <div>
      <ButtonRaw onClick={onClick} disabled={disabled} style={style}>
        {children}
      </ButtonRaw>
    </div>
  );
};
export default Button;
