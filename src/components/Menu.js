import React from "react";
import MenuItem from "./MenuItem";
import { MENU_ACTION_BUTTON_TYPES } from "./MenuItemRightButton";
import { connect } from "react-redux";
import { isProjectMenuOpened } from "../selectors";
import { toggleProjectsMenuItem } from "../actions/uiState";

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

const Menu = ({ projects, projectMenuOpened, toggleProjectMenu }) => {
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
        opened={projectMenuOpened}
        onToggle={toggleProjectMenu}
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

function mapStateToProps(state) {
  return {
    projects: state.projects.projects,
    projectMenuOpened: isProjectMenuOpened(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleProjectMenu: value => {
      dispatch(toggleProjectsMenuItem(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
