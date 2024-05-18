import styles from "./ListingEditorPricing.module.scss";
import { useListingPricing } from "../../../hooks/vendorListing/useListingPricing";

namespace ListingEditorPricing {
  export type Props = {};
}

function ListingEditorPricing(props: ListingEditorPricing.Props) {
  const {} = useListingPricing();

  return <div>Listing Pricing</div>;
}

export default ListingEditorPricing;
