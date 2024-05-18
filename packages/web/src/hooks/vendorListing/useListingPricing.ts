import { useListing } from "../../features/listing/useListing";

export const useListingPricing = () => {
  const { pricing, isLoadingPricing, fetchListingPricing } = useListing();

  return {
    pricing,
    fetchListingPricing,
    isLoading: isLoadingPricing,
  };
};
