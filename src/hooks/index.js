import React from "react";
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

export const useEditTodoDialog = () => {
  const { setModal, closeModal } = useModal();
  return () => {
    setModal({
      opened: true,
      title: "New todo",
      content: AddTicketModalContent,
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
