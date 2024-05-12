import { Outlet } from "react-router-dom";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import VendorDashboardSidebar from "../VendorDashboardSidebar/VendorDashboardSidebar";
import styles from "./VendorDashboardLayout.module.scss";
import VendorDashboardNav from "../VendorDashboardNav/VendorDashboardNav";

namespace VendorDashboardLayout {
  export type Props = {};
}

function VendorDashboardLayout(props: VendorDashboardLayout.Props) {
  return (
    <SpaceBetween size="n" classes={{ root: styles.layout }} wrap={false}>
      <VendorDashboardSidebar />

      <SpaceBetween
        size="n"
        classes={{ root: styles.rightContent }}
        vertical
        stretchChildren
      >
        <VendorDashboardNav />

        <div className={styles.main}>
          <Outlet />
        </div>
      </SpaceBetween>
    </SpaceBetween>
  );
}

export default VendorDashboardLayout;
