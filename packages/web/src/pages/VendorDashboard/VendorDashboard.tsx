import Grid from "../../components/Grid/Grid";
import GridItem from "../../components/GridItem/GridItem";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import { useAuthVendorListings } from "../../features/authVendorListings/useAuthVendorListings";
import styles from "./VendorDashboard.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { RouteHelper } from "../../utils/RouteHelper";

const tempListings = [
  { id: 1, name: "Listing 1" },
  { id: 2, name: "Listing 2" },
  { id: 3, name: "Listing 3" },
  { id: 4, name: "Listing 4" },
  { id: 5, name: "Listing 5" },
];

namespace VendorDashboard {
  export type Props = {};
}

function VendorDashboard(props: VendorDashboard.Props) {
  const { listings } = useAuthVendorListings();

  return (
    <SpaceBetween size="l" vertical>
      <Grid gapSize="m">
        {tempListings?.map((l, i) => (
          <GridItem
            key={l.id}
            span={4}
            responsiveSpan={{ mobile: 6 }}
            classes={{
              root: classNames(styles.gridItem),
            }}
          >
            <Link
              to={RouteHelper.ListingEditorBasicInfo({
                urlParams: { listingId: "1234" },
              })}
              className={classNames(styles.listingCard)}
            >
              <h3>{l.name}</h3>
            </Link>
          </GridItem>
        ))}
      </Grid>

      <div className={styles.divider} />
    </SpaceBetween>
  );
}

export default VendorDashboard;
