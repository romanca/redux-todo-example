import React from "react";
import { Pane as PaneRaw } from "evergreen-ui";

const Pane = ({ children, style }) => {
  return (
    <div>
      <PaneRaw
        elevation={4}
        style={{
          border: "0.2px solid black",
          width: "100%",
          padding: 10,
          borderRadius: 5,
          ...style,
        }}>
        {children}
      </PaneRaw>
    </div>
  );
};
export default Pane;
