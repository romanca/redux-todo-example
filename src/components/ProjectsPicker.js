import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { staticMenuItems } from "../utils/Constants";
import { useDefaultProjectForTodoCreation, useProjects } from "../selectors";
import { SelectMenu, Button } from "evergreen-ui";
import Component from "@reactions/component";

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
      id: "NEW_PROJECT",
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

  const options = [
    ...staticMenuItems,
    ...projects,
    ...createProjectPickerActionItems(),
  ];

  return (
    <Component>
      <SelectMenu
        width={200}
        title='Select project'
        hasFilter={false}
        closeOnSelect={true}
        options={options.map((i) => ({
          ...i,
          value: i.id,
        }))}
        onSelect={handleClick}>
        <Button
          style={{
            background: "transparent",
            outline: "none",
            border: "1px solid black",
            borderRadius: 7,
          }}>
          {displayedProject && (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: displayedProject.color,
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                />
                <div>{displayedProject.label}</div>
              </div>
            </>
          )}
        </Button>
      </SelectMenu>
    </Component>
  );
};

export default ProjectsPicker;
