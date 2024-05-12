import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import styles from "./VendorDashboardSidebar.module.scss";
import SidebarLink from "../../SidebarLink/SidebarLink";
import { vendorDashboardPages } from "../../../hooks/vendorDashboard/useVendorDashboardPage";

function VendorDashboardSidebar() {
  return (
    <div className={styles.sidebarWrapper}>
      <SpaceBetween classes={{ root: styles.sidebar }}>
        <SpaceBetween size="xs" vertical stretch>
          {vendorDashboardPages.map((link) => (
            <SidebarLink key={link.href} {...link} />
          ))}
        </SpaceBetween>
      </SpaceBetween>
    </div>
  );
}

export default VendorDashboardSidebar;
