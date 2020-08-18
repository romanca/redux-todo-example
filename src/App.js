import React from "react";
import Menu from "./components/Menu";
import Todos from "./components/Todos";
import ModalProvider from "./Providers/ModalProvider";

function App() {
  return (
    <ModalProvider>
      <div
        style={{
          padding: 50
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Menu />
          <Todos />
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;
