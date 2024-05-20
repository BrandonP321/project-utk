import Grid from "../../components/Grid/Grid";
import GridItem from "../../components/GridItem/GridItem";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import { useAuthVendorListings } from "../../features/authVendorListings/useAuthVendorListings";
import styles from "./VendorDashboard.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { RouteHelper } from "../../utils/RouteHelper";

namespace VendorDashboard {
  export type Props = {};
}

function VendorDashboard(props: VendorDashboard.Props) {
  const { listings } = useAuthVendorListings();

  return (
    <SpaceBetween size="l" vertical>
      <Grid gapSize="m">
        {listings?.map((l, i) => (
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
                urlParams: { listingId: l.id },
              })}
              className={classNames(styles.listingCard)}
            >
              <h3>{l.name}</h3>
            </Link>
          </GridItem>
        ))}
        <GridItem
          span={4}
          responsiveSpan={{ mobile: 6 }}
          classes={{ root: styles.gridItem }}
        >
          <Link to={RouteHelper.CreateListing()} className={styles.listingCard}>
            <h3>Create a new listing</h3>
          </Link>
        </GridItem>
      </Grid>

      <div className={styles.divider} />
    </SpaceBetween>
  );
}

export default VendorDashboard;
