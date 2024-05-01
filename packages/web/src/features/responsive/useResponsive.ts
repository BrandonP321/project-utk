import { useAppSelector } from "../../hooks";

export const useResponsive = () => useAppSelector((state) => state.responsive);
