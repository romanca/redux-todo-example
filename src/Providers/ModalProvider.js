import React, { useState, useContext } from "react";
import Modal from "../components/Modal";

const ModalsContext = React.createContext({ setModal: () => {} });

const ModalProvider = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const setModal = ({
    opened,
    title,
    content,
    actions,
    validate,
    small,
    initialValues,
  }) => {
    if (opened) {
      setModalContent({
        title,
        content,
        actions,
        validate,
        small,
        initialValues,
      });
      openModal();
    } else {
      closeModal();
    }
  };

  const openModal = () => {
    setOpened(true);
    setTimeout(() => {
      setVisible(true);
    }, 100);
  };

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      setOpened(false);
      setModalContent(null);
    }, 500);
  };

  const handleCloseRequest = () => {
    closeModal();
  };

  return (
    <ModalsContext.Provider
      value={{ setModal, closeModal: handleCloseRequest }}
    >
      {opened && modalContent && (
        <Modal
          visible={visible}
          modalContent={modalContent}
          onRequestClose={handleCloseRequest}
        />
      )}
      {children}
    </ModalsContext.Provider>
  );
};

export const useModal = () => useContext(ModalsContext);

export default ModalProvider;
