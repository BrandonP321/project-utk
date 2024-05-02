import ButtonLink from "../../components/ButtonLink/ButtonLink";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import { useAuthVendorListings } from "../../features/authVendorListings/useAuthVendorListings";
import { RouteHelper } from "../../utils/RouteHelper";
import styles from "./VendorDashboard.module.scss";

namespace VendorDashboard {
  export type Props = {};
}

function VendorDashboard(props: VendorDashboard.Props) {
  const { listings } = useAuthVendorListings();

  return (
    <SpaceBetween vertical>
      <ButtonLink href={RouteHelper.VendorAccount()}>My Account</ButtonLink>
      <h1>My Listings</h1>
      <SpaceBetween>
        {listings?.map((l) => (
          <h2 key={l.id}>{l.name}</h2>
        ))}
      </SpaceBetween>
    </SpaceBetween>
  );
}

export default VendorDashboard;
