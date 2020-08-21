import React from "react";
import MenuItem from "./MenuItem";
import { MENU_ACTION_BUTTON_TYPES } from "./MenuItemRightButton";
import { uiStateFields } from '../actions/uiState';
import { useUiStateFieldAPI, useProjects } from "../selectors";

const labels = [
  {
    label: "Label One",
    id: "1",
    color: "blue",
    rightButtonType: MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER,
  },
  {
    label: "Label Two",
    id: "2",
    color: "blue",
    rightButtonType: MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER,
  },
  {
    label: "Label Three",
    id: "3",
    color: "blue",
    rightButtonType: MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER,
  },
  {
    label: "Label Four",
    id: "4",
    color: "blue",
    rightButtonType: MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER,
  },
];

const Menu = () => {
  const [projectsOpened, setProjectsOpened] = useUiStateFieldAPI(uiStateFields.projectsOpened);
  const [labelsOpened, setLabelsOpened] = useUiStateFieldAPI(uiStateFields.labelsOpened);
  const projects = useProjects();
  return (
    <div
      style={{
        width: 200,
        height: "fit-content",
        minHeight: 300,
        border: "1px solid rgba(0,0,0,0.49)",
        borderRadius: 20,
        marginRight: 30,
        boxShadow: "4px 4px 7px 0px rgba(0,0,0,0.49)",
        display: "flex",
        flexDirection: "column",
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
      }}
    >
      <MenuItem
        opened={projectsOpened}
        onToggle={setProjectsOpened}
        item={{
          label: "Projects",
          items: projects.map((i) => ({
            ...i,
            rightButtonType: MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER,
          })),
          rightButtonType: MENU_ACTION_BUTTON_TYPES.ADD_PROJECT,
        }}
        itemType="PROJECTS"
      />
      <MenuItem
        opened={labelsOpened}
        onToggle={setLabelsOpened}
        item={{
          label: "Labels",
          items: labels,
          rightButtonType: MENU_ACTION_BUTTON_TYPES.ADD_LABEL,
        }}
        itemType="LABELS"
      />
    </div>
  );
};


export default Menu;
