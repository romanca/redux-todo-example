import React from "react";
import { Button as ButtonRaw } from "evergreen-ui";

const Button = ({ children, onClick }) => {
  return (
    <div>
      <ButtonRaw onClick={onClick}>{children}</ButtonRaw>
    </div>
  );
};
export default Button;
