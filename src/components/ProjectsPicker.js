import React, { useState } from "react";
import { projects } from "./Menu";
import ContextMenu from "./ContextMenu";

const ProjectsPicker = () => {
  const [value, setValue] = useState(projects[0]);

  const handleClick = (item) => {
    setValue(item);
  };

  return (
    <ContextMenu items={projects} onItemClick={handleClick} id="PROJECTS_PICKER" >
      <div
        style={{
          display: "flex",
          padding: 5,
          alignItems: "baseline",
          border: "1px solid black",
          width: "fit-content",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: value.color,
            borderRadius: 10,
            marginRight: 5,
          }}
        />
        {value.label}
      </div>
    </ContextMenu>
  );
};

export default ProjectsPicker;
