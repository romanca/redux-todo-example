import React from "react";
import {
  useProjectEditModal,
  useConfirmationDialog,
  useLabelEditModal,
} from "../hooks";
import IconButton, { ICON_BUTTON_TYPES } from "./IconButton";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";
import { useIndexedProjects, useLabels } from "../selectors";
import { useDispatch } from "react-redux";
import { removeProject } from "../actions/projects";
import { removeLabel } from "../actions/labels";

const HAMBURGER_ITEMS = [
  {
    label: "edit",
    id: "EDIT",
  },
  {
    label: "delete",
    id: "DELETE",
  },
];

const MenuItemRightButton = ({ type, itemId, isVisible = true }) => {
  const openProjectsModal = useProjectEditModal();

  const openLabelsModal = useLabelEditModal();

  const indexedProjects = useIndexedProjects();

  const labels = useLabels();

  const showConfirmDialog = useConfirmationDialog();

  const dispatch = useDispatch();

  const handleClick = (event, value) => {
    event.stopPropagation();
    switch (type) {
      case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
        openProjectsModal();
        break;
      case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
        openLabelsModal();
        break;
      case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
        if (value.id === "EDIT") {
          openProjectsModal({ initialValues: indexedProjects[itemId] });
          return;
        }
        if (value.id === "DELETE") {
          showConfirmDialog({
            title: "Project Removal",
            message: "Are you sure you want to remove this task?",
            onConfirm: () => {
              dispatch(removeProject(itemId));
            },
          });
        }
        break;
      case MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER:
        console.log(value);
        if (value.id === "EDIT") {
          openLabelsModal({
            initialValues: labels.find((l) => l.id === itemId),
          });
          return;
        }
        if (value.id === "DELETE") {
          showConfirmDialog({
            title: "Label Removal",
            message: "Are you sure , you want to remove this label?",
            onConfirm: () => {
              dispatch(removeLabel(itemId));
            },
          });
        }
        break;
      default:
        return null;
    }
  };

  switch (type) {
    case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
    case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
      return <IconButton type={ICON_BUTTON_TYPES.PLUS} onClick={handleClick} isVisible={isVisible} />;
    case MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER:
    case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
      return (
        <IconButton
          isVisible={isVisible}
          type={ICON_BUTTON_TYPES.CONTEXT_MENU}
          onClick={(value, event) => handleClick(event, value)}
          contextMenuId={`CONTEXT_MENU_${MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER}_${itemId}`}
          items={HAMBURGER_ITEMS}
        />
      );
    default:
      return null;
  }
};

export default MenuItemRightButton;
