import { combineReducers } from "@reduxjs/toolkit";
import responsiveSlice from "../features/responsive/responsiveSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";
import authVendorSlice from "../features/authVendor/authVendorSlice";
import authVendorListingsSlice from "../features/authVendorListings/authVendorListingsSlice";
import listingSlice from "../features/listing/listingSlice";

const rootReducer = combineReducers({
  responsive: responsiveSlice.reducer,
  notifications: notificationsSlice.reducer,
  authVendor: authVendorSlice.reducer,
  authVendorListings: authVendorListingsSlice.reducer,
  listing: listingSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
