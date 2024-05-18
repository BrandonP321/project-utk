import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import styles from "./VendorDashboardSidebar.module.scss";
import SidebarLink from "../../SidebarLink/SidebarLink";

namespace VendorDashboardSidebar {
  export type Props = {
    links: SidebarLink.Props[];
  };
}

function VendorDashboardSidebar({ links }: VendorDashboardSidebar.Props) {
  return (
    <div className={styles.sidebarWrapper}>
      <SpaceBetween classes={{ root: styles.sidebar }}>
        <SpaceBetween size="xs" vertical stretch>
          {links.map((link) => (
            <SidebarLink key={link.href} {...link} />
          ))}
        </SpaceBetween>
      </SpaceBetween>
    </div>
  );
}

export default VendorDashboardSidebar;
