import { useState } from "react";
import Grid from "../../components/Grid/Grid";
import GridItem from "../../components/GridItem/GridItem";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import { useAuthVendorListings } from "../../features/authVendorListings/useAuthVendorListings";
import styles from "./VendorDashboard.module.scss";
import classNames from "classnames";

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

  const [selectedListing, setSelectedListing] = useState(1);

  return (
    <SpaceBetween size="l" vertical>
      <Grid gapSize="m">
        {tempListings?.map((l, i) => (
          <GridItem
            key={l.id}
            span={4}
            responsiveSpan={{ mobile: 6 }}
            classes={{
              root: classNames(
                styles.gridItem,
                selectedListing === l.id && styles.selected,
              ),
            }}
          >
            <button
              className={classNames(
                styles.listingCard,
                selectedListing === l.id && styles.selected,
              )}
              onClick={() => setSelectedListing(l.id)}
            >
              <h3>{l.name}</h3>
            </button>
          </GridItem>
        ))}
      </Grid>

      <div className={styles.divider} />
    </SpaceBetween>
  );
}

export default VendorDashboard;
