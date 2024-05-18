import Drawer from "../../Drawer/Drawer";
import SidebarLink from "../../SidebarLink/SidebarLink";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import { TSidebarLink } from "../VendorDashboardSidebar/VendorDashboardSidebar";

export namespace VendorDashboardMobileDrawer {
  export type Props = {
    links: TSidebarLink[];
  };
}

function VendorDashboardMobileDrawer({
  links,
}: VendorDashboardMobileDrawer.Props) {
  return (
    <Drawer>
      <SpaceBetween size="xs" vertical stretch>
        {links.map((link) => (
          <SidebarLink key={link.href} {...link} />
        ))}
      </SpaceBetween>
    </Drawer>
  );
}

export default VendorDashboardMobileDrawer;
