import { useListing } from "../../features/listing/useListing";

export const useListingDetails = () => {
  const { details, fetchListingDetails, isLoadingDetails } = useListing();

  return {
    details,
    fetchListingDetails,
    isLoading: isLoadingDetails,
  };
};
