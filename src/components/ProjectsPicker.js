import React, { useEffect } from "react";
import ContextMenu from "./ContextMenu";
import { useSelector } from "react-redux";
import { getDefaultProjectForPicker } from "../utils/utils";
import { staticMenuItems } from "../utils/Constants";

function useProjectById(id) {
  const project = useSelector((state) =>
    state.projects.projects.find((i) => i.id === id)
  );
  return project;
}

function createProjectPickerActionItems() {
  return [
    {
      label: "Add new project",
      actionType: "NEW_PROJECT",
      if: 'NEW_PROJECT'
    },
  ];
}

const ProjectsPicker = ({ onChange, value, projects }) => {
  const handleClick = (item) => {
    if (item.actionType) {
      alert(item.actionType);
    } else {
      onChange(item);
    }
  };

  useEffect(() => {
    onChange(getDefaultProjectForPicker());
  }, []);

  const foundProject = useProjectById(value);

  const displayedProject = foundProject || getDefaultProjectForPicker();


  return (
    <ContextMenu
      items={[
        ...staticMenuItems,
        ...projects,
        ...createProjectPickerActionItems(),
      ]}
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
        {displayedProject && (
          <>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: displayedProject.color,
                borderRadius: 10,
                marginRight: 5,
              }}
            />
            {displayedProject.label}
          </>
        )}
      </div>
    </ContextMenu>
  );
};

export default ProjectsPicker;
