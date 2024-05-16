import { vendorDashboardPages } from "../../../hooks/vendorDashboard/useVendorDashboardPage";
import Drawer from "../../Drawer/Drawer";
import SidebarLink from "../../SidebarLink/SidebarLink";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";

function VendorDashboardMobileDrawer() {
  return (
    <Drawer>
      <SpaceBetween size="xs" vertical stretch>
        {vendorDashboardPages.map((link) => (
          <SidebarLink key={link.href} {...link} />
        ))}
      </SpaceBetween>
    </Drawer>
  );
}

export default VendorDashboardMobileDrawer;
