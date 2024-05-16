import { Outlet } from "react-router-dom";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import VendorDashboardSidebar from "../VendorDashboardSidebar/VendorDashboardSidebar";
import styles from "./VendorDashboardLayout.module.scss";
import VendorDashboardNav from "../VendorDashboardNav/VendorDashboardNav";
import DrawerProvider from "../../Drawer/DrawerProvider";
import { useResponsive } from "../../../features/responsive/useResponsive";
import VendorDashboardMobileDrawer from "../VendorDashboardMobileDrawer/VendorDashboardMobileDrawer";

namespace VendorDashboardLayout {
  export type Props = {};
}

function VendorDashboardLayout(props: VendorDashboardLayout.Props) {
  const { medium } = useResponsive();

  return (
    <DrawerProvider>
      <SpaceBetween size="n" classes={{ root: styles.layout }} wrap={false}>
        {!medium && <VendorDashboardSidebar />}
        {medium && <VendorDashboardMobileDrawer />}

        <SpaceBetween
          size="n"
          classes={{ root: styles.rightContent }}
          wrap={false}
          vertical
          stretchChildren
        >
          <VendorDashboardNav />

          <div className={styles.main}>
            <Outlet />
          </div>
        </SpaceBetween>
      </SpaceBetween>
    </DrawerProvider>
  );
}

export default VendorDashboardLayout;
