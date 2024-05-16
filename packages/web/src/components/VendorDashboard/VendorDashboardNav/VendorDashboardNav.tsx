import { useResponsive } from "../../../features/responsive/useResponsive";
import { useVendorDashboardPage } from "../../../hooks/vendorDashboard/useVendorDashboardPage";
import Button from "../../Button/Button";
import { useDrawer } from "../../Drawer/useDrawer";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import Text from "../../Text/Text";
import styles from "./VendorDashboardNav.module.scss";

namespace VendorDashboardNav {
  export type Props = {};
}

function VendorDashboardNav(props: VendorDashboardNav.Props) {
  const page = useVendorDashboardPage();
  const { medium } = useResponsive();
  const { toggleDrawer } = useDrawer();

  return (
    <SpaceBetween classes={{ root: styles.nav }}>
      <Text v="h1" className={styles.pageTitle}>
        {page?.label}
      </Text>
      {medium && <Button onClick={toggleDrawer}>Mobile Nav</Button>}
    </SpaceBetween>
  );
}

export default VendorDashboardNav;
