import React from "react";
import MenuItem from "./MenuItem";
import { uiStateFields } from "../actions/uiState";
import {
  useUiStateFieldAPI,
  useProjects,
  useStaticProjects,
  useFavoriteProjects,
} from "../selectors";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";
import { useHover } from "../hooks";
import { useSelector } from "react-redux";

function useLabels() {
  return useSelector((state) => state.labels.labels);
}

const Menu = () => {
  const [projectsOpened, setProjectsOpened] = useUiStateFieldAPI(
    uiStateFields.projectsOpened
  );
  const [labelsOpened, setLabelsOpened] = useUiStateFieldAPI(
    uiStateFields.labelsOpened
  );
  const labels = useLabels();
  const projects = useProjects();
  const staticProjects = useStaticProjects();
  const favoriteProjects = useFavoriteProjects();

  const { hovered, listeners } = useHover();

  return (
    <div
      {...listeners}
      style={{
        width: 200,
        height: "fit-content",
        minHeight: 400,
        border: "1px solid rgba(0,0,0,0.49)",
        borderRadius: 20,
        marginRight: 30,
        boxShadow: "4px 4px 7px 0px rgba(0,0,0,0.49)",
        display: "flex",
        flexDirection: "column",
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        position: "relative",
      }}>
      {staticProjects.map((i) => (
        <MenuItem
          isSubItem={true}
          key={i.id}
          item={i}
          customLeftIcon={i.icon}
          itemType='PROJECTS'
          rightIconVisible={hovered}
        />
      ))}
      {favoriteProjects.map((i) => (
        <MenuItem
          isSubItem={true}
          key={i.id}
          item={i}
          customLeftIcon={i.icon}
          itemType='PROJECTS'
          rightIconVisible={true}
          rightButtonType={MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER}
        />
      ))}
      <MenuItem
        rightIconVisible={hovered}
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
        itemType='PROJECTS'
      />
      <MenuItem
        rightIconVisible={hovered}
        opened={labelsOpened}
        onToggle={setLabelsOpened}
        item={{
          label: "Labels",
          items: labels.map((l) => ({
            ...l,
            rightButtonType: MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER,
          })),
          rightButtonType: MENU_ACTION_BUTTON_TYPES.ADD_LABEL,
        }}
        itemType='LABELS'
      />
    </div>
  );
};

export default Menu;
