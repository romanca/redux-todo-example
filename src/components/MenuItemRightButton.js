import React, { useState } from "react";
import { useModal } from "../Providers/ModalProvider";

export const MENU_ACTION_BUTTON_TYPES = {
  ADD_PROJECT: "ADD_PROJECT",
  ADD_LABEL: "ADD_LABEL",
  PROJECTS_HAMBURGER: "PROJECTS_HAMBURGER",
  LABEL_HAMBURGER: "LABEL_HAM",
};

const AddProjectModalContent = ({ actions, onContentValuesChange }) => {
  const [values, setValues] = useState({ title: "" });
  const getFieldChangeHandler = (field) => (e) => {
    setValues({
      ...values,
      [field]: e.target.value,
    });
    onContentValuesChange(values);
  };
  return (
    <div>
      <input value={values.title} onChange={getFieldChangeHandler("title")} />
    </div>
  );
};

const useProjectsModal = () => {
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
          color: "red",
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

const MenuItemRightButton = ({ type }) => {
  const [hovered, setHovered] = useState(false);

  const openProjectsModal = useProjectsModal();

  const toggleHovered = () => {
    setHovered(!hovered);
  };

  const backgroundColor = hovered ? "lightGray" : "white";

  const renderIcon = () => {
    switch (type) {
      case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
      case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
        return <div>+</div>;
      case MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER:
      case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
        return (
          <div style={{ lineHeight: 0.2, fontSize: 20, height: 20 }}>
            <div>.</div>
            <div>.</div>
            <div>.</div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    switch (type) {
      case MENU_ACTION_BUTTON_TYPES.ADD_PROJECT:
      case MENU_ACTION_BUTTON_TYPES.ADD_LABEL:
        openProjectsModal();
        break;
      case MENU_ACTION_BUTTON_TYPES.LABEL_HAMBURGER:
      case MENU_ACTION_BUTTON_TYPES.PROJECTS_HAMBURGER:
        alert(`BUTTON_TYPE: ${type}`);
        break;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={toggleHovered}
      onMouseLeave={toggleHovered}
      style={{
        padding: "0 5px",
        height: "fit-content",
        backgroundColor,
        position: "absolute",
        right: 0,
      }}
    >
      {renderIcon()}
    </div>
  );
};

export default MenuItemRightButton;
