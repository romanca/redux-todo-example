import React, { useState } from "react";
import { useModal } from "../Providers/ModalProvider";
import AddProjectModalContent from "../components/AddProjectModalContent";
import AddTicketModalContent from "../components/AddTodoModalContent";

export const useProjectEditModal = () => {
  const { setModal, closeModal } = useModal();
  return () => {
    setModal({
      opened: true,
      title: "Project creation",
      content: AddProjectModalContent,
      actions: [
        {
          label: "Cancel",
          requestClose: true,
        },
        {
          label: "Add",
          type: "CONTENT_CONFIRMATION",
          onClick: (values) => {
            alert(JSON.stringify(values, null, 2));
            closeModal();
          },
        },
      ],
    });
  };
};

export const useEditTodoDialog = ({ onConfirm }) => {
  const { setModal, closeModal } = useModal();
  return () => {
    setModal({
      opened: true,
      title: "New todo",
      content: AddTicketModalContent,
      validate: values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Requuired';
        };
        return errors;
      },
      actions: [
        {
          label: "Cancel",
          requestClose: true,
        },
        {
          label: "Add",
          type: "CONTENT_CONFIRMATION",
          onClick: ({values, errors}) => {
            console.log("useEditTodoDialog -> values", {values, errors})
            if (!(Object.values(errors).length)) {
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
      onMouseLeave: () => setHovered(false)
    },
    hovered
  }

}
