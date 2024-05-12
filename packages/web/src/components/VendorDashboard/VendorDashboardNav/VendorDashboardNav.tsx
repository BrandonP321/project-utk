import { useVendorDashboardPage } from "../../../hooks/vendorDashboard/useVendorDashboardPage";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import Text from "../../Text/Text";
import styles from "./VendorDashboardNav.module.scss";

namespace VendorDashboardNav {
  export type Props = {};
}

function VendorDashboardNav(props: VendorDashboardNav.Props) {
  const page = useVendorDashboardPage();

  return (
    <SpaceBetween classes={{ root: styles.nav }}>
      <Text v="h1" className={styles.pageTitle}>
        {page?.label}
      </Text>
    </SpaceBetween>
  );
}

export default VendorDashboardNav;
