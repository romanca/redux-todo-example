import React, { useState, useContext } from "react";
import Modal from "../components/Modal";

const defaultContext = {
  opened: true,
  title: "My title",
  content: <div>this is my modal content</div>,
  actions: [
    {
      label: "cancel",
      onClick: () => {
        alert("cancel clicked");
      },
    },
  ],
};

const ModalsContext = React.createContext({ setModal: () => {} });

const ModalProvider = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const setModal = ({ opened, title, content, actions }) => {
    setOpened(opened);
    setModalContent({ title, content, actions });
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
