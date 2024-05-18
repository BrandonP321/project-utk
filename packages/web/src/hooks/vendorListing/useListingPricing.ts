import { useEffect } from "react";
import { useListing } from "../../features/listing/useListing";
import { useLoading } from "../../components/LoadingContainer/useLoading";

export const useListingPricing = () => {
  const { pricing, isLoadingPricing, fetchListingPricing } = useListing();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isLoadingPricing);
  }, [isLoadingPricing]);

  useEffect(() => {
    !pricing && fetchListingPricing();
  }, [pricing]);

  return {
    pricing,
    fetchListingPricing,
    isLoading: isLoadingPricing,
  };
};
