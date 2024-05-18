import { Outlet, useParams } from "react-router-dom";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import VendorDashboardSidebar, {
  TSidebarLink,
} from "../VendorDashboardSidebar/VendorDashboardSidebar";
import styles from "./VendorDashboardLayout.module.scss";
import DrawerProvider from "../../Drawer/DrawerProvider";
import { useResponsive } from "../../../features/responsive/useResponsive";
import VendorDashboardMobileDrawer from "../VendorDashboardMobileDrawer/VendorDashboardMobileDrawer";
import { useMemo } from "react";
import LoadingContainer from "../../LoadingContainer/LoadingContainer";

namespace VendorDashboardLayout {
  export type Props = {
    nav: React.ReactNode;
    links: TSidebarLink[];
  };
}

function VendorDashboardLayout({ nav, links }: VendorDashboardLayout.Props) {
  const { medium } = useResponsive();
  const { listingId } = useParams<"listingId">();

  const modifiedLinks = useMemo(
    () =>
      links
        .map((link) => ({
          ...link,
          href: link.href.replace(":listingId", listingId!),
        }))
        .filter((link) => !link.hideFromNav),
    [listingId, links],
  );

  return (
    <DrawerProvider>
      <SpaceBetween size="n" classes={{ root: styles.layout }} wrap={false}>
        {!medium && <VendorDashboardSidebar links={modifiedLinks} />}
        {medium && <VendorDashboardMobileDrawer links={modifiedLinks} />}

        <SpaceBetween
          size="n"
          classes={{ root: styles.rightContent }}
          wrap={false}
          vertical
          stretchChildren
        >
          {nav}

          <div className={styles.main}>
            <LoadingContainer
              classes={{ root: styles.loadingOverlay }}
              showOnLocationChange
            >
              <Outlet />
            </LoadingContainer>
          </div>
        </SpaceBetween>
      </SpaceBetween>
    </DrawerProvider>
  );
}

export default VendorDashboardLayout;
