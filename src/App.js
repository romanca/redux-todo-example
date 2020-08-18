import React from "react";
import Menu from "./components/Menu";
import Todos from "./components/Todos";
import ModalProvider from "./Providers/ModalProvider";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers';

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store} >
      <ModalProvider>
        <div
          style={{
            padding: 50,
            paddingTop: 100
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Menu />
              <Todos />
            </div>
          </div>
        </div>
      </ModalProvider>
    </Provider>
  );
}

export default App;
