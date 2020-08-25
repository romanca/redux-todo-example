import React from "react";

const ContextMenuContext = React.createContext({});

const ContextMenuProvider = ({ children }) => {
  const getMenuItems = () => {};

  return (
    <ContextMenuContext.Provider value={{ getMenuItems }}>
      {children}
    </ContextMenuContext.Provider>
  );
};

export default ContextMenuProvider;
