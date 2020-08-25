import React, { useState } from "react";
import { useModal } from "../Providers/ModalProvider";
import AddProjectModalContent from "../components/AddProjectModalContent";
import AddTicketModalContent from "../components/AddTodoModalContent";
import AddEditModalContent from "../components/AddLabelModalContent";
import { useDispatch } from "react-redux";
import { createProject, editProject } from "../actions/projects";
import { createLabel } from "../actions/labels";

export const useProjectEditModal = () => {
  const { setModal, closeModal } = useModal();
  const dispatch = useDispatch();
  return ({ initialValues } = {}) => {
    setModal({
      opened: true,
      initialValues,
      title: "Project creation",
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
      title: "Label creation",
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
              // dispatch(editProject(values));
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
