import { createContext } from "react";

type TDrawerContext = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const DrawerContext = createContext({} as TDrawerContext);
