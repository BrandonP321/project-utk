import { combineReducers } from "@reduxjs/toolkit";
import responsiveSlice from "../features/responsive/responsiveSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";
import authVendorSlice from "../features/authVendor/authVendorSlice";
import authVendorListingsSlice from "../features/authVendorListings/authVendorListingsSlice";

const rootReducer = combineReducers({
  responsive: responsiveSlice.reducer,
  notifications: notificationsSlice.reducer,
  authVendor: authVendorSlice.reducer,
  authVendorListings: authVendorListingsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
