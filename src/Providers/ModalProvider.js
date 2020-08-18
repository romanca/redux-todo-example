import React, { useState, useContext } from "react";
import Modal from "../components/Modal";

const ModalsContext = React.createContext({ setModal: () => {} });

const ModalProvider = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const setModal = ({ opened, title, content, actions, validate }) => {
    setOpened(opened);
    setModalContent({ title, content, actions, validate });
  };

  const handleCloseRequest = () => {
    setOpened(false);
    setModalContent(null);
  };

  return (
    <ModalsContext.Provider value={{ setModal, closeModal: handleCloseRequest }}>
      {opened && modalContent && (
        <Modal modalContent={modalContent} onRequestClose={handleCloseRequest} />
      )}
      {children}
    </ModalsContext.Provider>
  );
};

export const useModal = () => useContext(ModalsContext);

export default ModalProvider;
