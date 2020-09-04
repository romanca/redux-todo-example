import React from "react";
import Menu from "./components/Menu";
import Todos from "./components/Todos";
import ModalProvider from "./Providers/ModalProvider";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer, { staticReducers } from "./reducers";
import ReduxThunk from "redux-thunk";
import ApiMethods, { mockResolvers } from "./utils/apiMethods";
import { getAllProjects } from "./actions/projects";
import { getUiState } from "./actions/uiState";
import { getAllTodos } from "./actions/todos";
import { getAllLabels } from "./actions/labels";
import ContextMenuProvider from "./Providers/ContextMenuProvider";
import httpClient from "httpClient";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ apiMethods: new ApiMethods() })
    ),
    httpClient.reduxDevEnhancer(staticReducers),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

httpClient.configure({ mockResolvers, fetchDelay: 0 });

httpClient.interceptors.onRequest((value) => {
  console.log("request interceptor called with: ", value);
});

httpClient.interceptors.onResponse((...args) => {
  console.log("response interceptoevalue", args);
});

store.dispatch(getAllLabels());
store.dispatch(getAllProjects());
store.dispatch(getUiState());
store.dispatch(getAllTodos());

function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <ContextMenuProvider>
          <div
            style={{
              padding: 50,
              paddingTop: 100,
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
        </ContextMenuProvider>
      </ModalProvider>
    </Provider>
  );
}

export default App;
