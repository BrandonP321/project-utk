import Drawer from "../../Drawer/Drawer";
import SidebarLink from "../../SidebarLink/SidebarLink";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";

export namespace VendorDashboardMobileDrawer {
  export type Props = {
    links: SidebarLink.Props[];
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
