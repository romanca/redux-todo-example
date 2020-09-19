import React, { useState } from "react";
import { useModal } from "../Providers/ModalProvider";
import AddProjectModalContent from "../components/AddProjectModalContent";
import AddTicketModalContent from "../components/AddTodoModalContent";
import AddEditModalContent from "../components/AddLabelModalContent";
import { useDispatch } from "react-redux";
import { createProject, editProject, removeProject } from "../actions/projects";
import { createLabel, updateLabel, removeLabel } from "../actions/labels";
import { useIndexedProjects, useLabels } from "../selectors";
import { MENU_ACTION_BUTTON_TYPES } from "../utils/Constants";

export const useProjectEditModal = () => {
  const { setModal, closeModal } = useModal();
  const dispatch = useDispatch();
  return ({ initialValues } = {}) => {
    setModal({
      opened: true,
      initialValues,
      title: initialValues ? "Edit project" : "Project creation",
      content: AddProjectModalContent,
      validate: (values) => {
        const errors = {};
        if (!values.label) {
          errors.label = "Requuired";
        }
        return errors;
      },
      actions: [
        {
          label: "Cancel",
          requestClose: true,
        },
        {
          label: initialValues ? "Edit" : "Add",
          type: "CONTENT_CONFIRMATION",
          onClick: ({ values }) => {
            if (!initialValues) {
              dispatch(createProject(values));
            } else {
              dispatch(editProject(values));
            }
            closeModal();
          },
        },
      ],
    });
  };
};

export const useLabelEditModal = () => {
  const { setModal, closeModal } = useModal();
  const dispatch = useDispatch();
  return ({ initialValues } = {}) => {
    setModal({
      opened: true,
      initialValues,
      title: initialValues ? "Label edit" : "Label creation",
      content: AddEditModalContent,
      validate: (values) => {
        const errors = {};
        if (!values.label) {
          errors.label = "Requuired";
        }
        return errors;
      },
      actions: [
        {
          label: "Cancel",
          requestClose: true,
        },
        {
          label: initialValues ? "Edit" : "Add",
          type: "CONTENT_CONFIRMATION",
          onClick: ({ values }) => {
            if (!initialValues) {
              dispatch(createLabel(values));
            } else {
              dispatch(updateLabel(values));
            }
            closeModal();
          },
        },
      ],
    });
  };
};

export const useEditTodoDialog = ({ onConfirm }) => {
  const { setModal, closeModal } = useModal();
  return ({ initialValues }) => {
    setModal({
      opened: true,
      initialValues,
      title: "New todo",
      content: AddTicketModalContent,
      validate: (values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Requuired";
        }
        return errors;
      },
      actions: [
        {
          label: "Cancel",
          requestClose: true,
        },
        {
          label: initialValues ? "Edit" : "Add",
          type: "CONTENT_CONFIRMATION",
          onClick: ({ values, errors }) => {
            if (!Object.values(errors).length) {
              onConfirm(values);
              closeModal();
            }
          },
        },
      ],
    });
  };
};

export const useConfirmationDialog = () => {
  const { setModal } = useModal();
  return ({ title, message, onConfirm }) => {
    setModal({
      small: true,
      opened: true,
      title,
      content: () => <div>{message}</div>,
      actions: [
        {
          label: "Cancel",
          requestClose: true,
        },
        {
          label: "Acept",
          requestClose: true,
          onClick: onConfirm,
        },
      ],
    });
  };
};

export const useHover = () => {
  const [hovered, setHovered] = useState(false);

  return {
    listeners: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
    hovered,
  };
};

function useProjectContextMenu(item) {
  const openProjectsModal = useProjectEditModal();
  const indexedProjects = useIndexedProjects();
  const showConfirmDialog = useConfirmationDialog();
  const dispatch = useDispatch();
  

  const items = [
    {
      label: "edit",
      method: () => {
        openProjectsModal({ initialValues: indexedProjects[item.id] });
      },
    },
    {
      label: item.isFavorite ? 'remove' : 'add',
      method: () => {
        showConfirmDialog({
          title: "Project Removal",
          message: "Are you sure you want to remove this task?",
          onConfirm: () => {
            dispatch(removeProject(item.id));
          },
        });
      },
    },
  ];

  return items;
}

function useLabelContextMenu(item) {
  const openLabelsModal = useLabelEditModal();
  const labels = useLabels();
  const showConfirmDialog = useConfirmationDialog();
  const dispatch = useDispatch();



  const items = [
    {
      label: "edit",
      method: () => {
        openLabelsModal({
          initialValues: labels.find((l) => l.id === item.id),
        });
      },
    },
    {
      label: "delete",
      method: () => {
        showConfirmDialog({
          title: "Label Removal",
          message: "Are you sure , you want to remove this label?",
          onConfirm: () => {
            dispatch(removeLabel(item.id));
          },
        });
      },
    },
  ];
  return items;
}

export function useRightButtonContextMenu(item, actionButtonType) {
  const labelsItems = useLabelContextMenu(item);
  const projectItems = useProjectContextMenu(item);
  return actionButtonType === MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER
    ? projectItems
    : labelsItems;
}
