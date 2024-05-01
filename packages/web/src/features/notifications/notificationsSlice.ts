import { TypedOmit } from "@project-utk/shared/src/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NotificationType = "error" | "info" | "success";

type TNotification = {
  id: string;
  type: NotificationType;
  msg: string;
};

type NotificationsState = {
  notifications: TNotification[];
};

const initialState: NotificationsState = {
  notifications: [],
};

type AddNotificationPayload = TypedOmit<TNotification, "id">;

let lastId = 0;

const addNotification = (
  state: NotificationsState,
  payload: AddNotificationPayload
) => {
  lastId++;

  state.notifications = [
    ...state.notifications,
    {
      ...payload,
      id: `notification_${lastId}`,
    },
  ];
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<{ msg: string }>) => {
      addNotification(state, {
        type: "error",
        ...action.payload,
      });
    },
    addInfo: (state, action: PayloadAction<{ msg: string }>) => {
      addNotification(state, {
        type: "info",
        ...action.payload,
      });
    },
    addSuccess: (state, action: PayloadAction<{ msg: string }>) => {
      addNotification(state, {
        type: "success",
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<{ id: string }>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload.id
      );
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export default notificationsSlice;
