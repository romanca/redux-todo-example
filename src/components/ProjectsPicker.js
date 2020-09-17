import React, { useEffect } from "react";
import ContextMenu from "./ContextMenu";
import { useSelector } from "react-redux";
import { staticMenuItems } from "../utils/Constants";
import { useDefaultProjectForTodoCreation, useProjects } from "../selectors";
import { PickerButton } from "../StyledComponents";

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
      if: "NEW_PROJECT",
    },
  ];
}

const ProjectsPicker = ({ onChange, value }) => {
  const defaultProject = useDefaultProjectForTodoCreation();
  const projects = useProjects();

  const handleClick = (item) => {
    if (item.actionType) {
      alert(item.actionType);
    } else {
      onChange(item);
    }
  };

  useEffect(() => {
    onChange(defaultProject);
  }, []);

  const foundProject = useProjectById(value);

  const displayedProject = foundProject || defaultProject;

  return (
    <ContextMenu
      items={[
        ...staticMenuItems,
        ...projects,
        ...createProjectPickerActionItems(),
      ]}
      onItemClick={handleClick}
      id='PROJECTS_PICKER'>
      <PickerButton>
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
      </PickerButton>
    </ContextMenu>
  );
};

export default ProjectsPicker;
