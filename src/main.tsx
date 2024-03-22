import React from "react";
import ReactDOM from "react-dom/client";
import AppEntry from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppEntry />
    </Provider>
  </React.StrictMode>
);
