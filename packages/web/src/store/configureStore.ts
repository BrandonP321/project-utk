import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_STAGE === "local",
});

export type AppDispatch = typeof store.dispatch;
export default store;
