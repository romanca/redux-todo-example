import React from "react";
import ContextMenu from "./ContextMenu";
import { useSelector } from "react-redux";

function useProjectById(id) {
  const project = useSelector((state) =>
    state.projects.projects.find((i) => i.id === id)
  );
  return project
}

const ProjectsPicker = ({ onChange, value, projects }) => {
  const handleClick = (item) => {
    onChange(item);
  };

  const foundProject = useProjectById(value);

  return (
    <ContextMenu
      items={projects}
      onItemClick={handleClick}
      id="PROJECTS_PICKER"
    >
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
        {foundProject && (
          <>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: foundProject.color,
                borderRadius: 10,
                marginRight: 5,
              }}
            />
            {foundProject.label}
          </>
        )}
      </div>
    </ContextMenu>
  );
};

export default ProjectsPicker;
