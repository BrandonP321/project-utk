import { authVendorActions } from "./authVendor/authVendorSlice";
import { authVendorListingsActions } from "./authVendorListings/authVendorListingsSlice";
import { notificationsActions } from "./notifications/notificationsSlice";
import { responsiveActions } from "./responsive/responsiveSlice";

export const Actions = {
  Responsive: responsiveActions,
  Notifications: notificationsActions,
  AuthVendor: authVendorActions,
  AuthVendorListings: authVendorListingsActions,
};
