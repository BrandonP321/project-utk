import { VendorAPI } from "../../api";
import { useAuthVendor } from "../../features/authVendor/useAuthVendor";
import { useAPI } from "../../hooks/useAPI";
import { RouteHelper } from "../../utils/RouteHelper";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import styles from "./MainNav.module.scss";

namespace MainNav {
  export type Props = {};
}

function MainNav(props: MainNav.Props) {
  const { vendor } = useAuthVendor({ redirectOnUnauthenticated: false });
  const { fetchAPI: logout } = useAPI(VendorAPI.logoutVendor, {
    onFinally: () => (window.location.href = RouteHelper.Home()),
  });

  return (
    <SpaceBetween justify="end" classes={{ root: styles.mainNav }}>
      {!vendor && <a href={RouteHelper.VendorLogin()}>Login</a>}
      {vendor && (
        <>
          <p>Hi {vendor.name}</p>
          <a href={RouteHelper.VendorDashboard()}>Dashboard</a>
          <button onClick={() => logout({})}>Logout</button>
        </>
      )}
    </SpaceBetween>
  );
}

export default MainNav;
