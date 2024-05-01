import { notificationsActions } from "./notifications/notificationsSlice";
import { responsiveActions } from "./responsive/responsiveSlice";

export const Actions = {
  Responsive: responsiveActions,
  Notifications: notificationsActions,
};
