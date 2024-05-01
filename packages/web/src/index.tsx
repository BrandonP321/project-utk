import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./appSetup";
import "destyle.css";
import "./styles/globalStyles.scss";
import "./index.scss";
import App from "./App";
import store from "./store/configureStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
