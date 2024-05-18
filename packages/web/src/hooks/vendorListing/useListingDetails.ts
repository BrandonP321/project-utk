import { useEffect } from "react";
import { useListing } from "../../features/listing/useListing";
import { useLoading } from "../../components/LoadingContainer/useLoading";

export const useListingDetails = () => {
  const { details, fetchListingDetails, isLoadingDetails } = useListing();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isLoadingDetails);
  }, [isLoadingDetails]);

  useEffect(() => {
    !details && fetchListingDetails();
  }, [details]);

  return {
    details,
    fetchListingDetails,
    isLoading: isLoadingDetails,
  };
};
