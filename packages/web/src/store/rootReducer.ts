import { combineReducers } from "@reduxjs/toolkit";
import responsiveSlice from "../features/responsive/responsiveSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";

const rootReducer = combineReducers({
  responsive: responsiveSlice.reducer,
  notifications: notificationsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
