import { useEffect, useState } from "react";
import { DrawerContext } from "./DrawerContext";
import { useLocation } from "react-router-dom";

namespace DrawerProvider {
  export type Props = React.PropsWithChildren<{}>;
}

function DrawerProvider({ children }: DrawerProvider.Props) {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <DrawerContext.Provider
      value={{
        open,
        openDrawer: () => setOpen(true),
        closeDrawer: () => setOpen(false),
        toggleDrawer: () => setOpen(!open),
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export default DrawerProvider;
