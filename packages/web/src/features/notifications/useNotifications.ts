import { useAppSelector } from "../../hooks";

export const useNotifications = () =>
  useAppSelector((state) => state.notifications);
