import { useListingDetails } from "../../../hooks/vendorListing/useListingDetails";
import styles from "./ListingEditorBasicInfo.module.scss";

namespace ListingEditorBasicInfo {
  export type Props = {};
}

function ListingEditorBasicInfo(props: ListingEditorBasicInfo.Props) {
  const {} = useListingDetails();

  return <div />;
}

export default ListingEditorBasicInfo;
