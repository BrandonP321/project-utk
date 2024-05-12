import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./appSetup";
import App from "./App";
import store from "./store/configureStore";
import "./index.scss";
import { ThemeProvider, createTheme } from "@mui/material";
import { breakpointWidths } from "./features/responsive/useResponsiveSetup";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        theme={createTheme({
          breakpoints: {
            values: breakpointWidths,
          },
        })}
      >
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
