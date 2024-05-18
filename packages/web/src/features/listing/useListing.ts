import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useListingActions } from "./listingSlice";
import { useAPI } from "../../hooks/useAPI";
import { VendorListingAPI } from "../../api/VendorListingAPI";
import { useEffect } from "react";

let isFetchingDetails = false;
let isFetchingMedia = false;
let isFetchingPricing = false;

type Props = {
  fetchAllOnMount?: boolean;
};

export const useListing = (props?: Props) => {
  const { fetchAllOnMount } = props ?? {};

  const actions = useListingActions();
  const { listingId } = useParams<"listingId">();
  const { details, media, pricing } = useAppSelector((state) => state.listing);

  const { isLoading: isLoadingDetails, fetchAPI: fetchDetailsAPI } = useAPI(
    VendorListingAPI.GetVendorListing,
    {
      onSuccess: actions.setDetails,
      onFinally: () => (isFetchingDetails = false),
    },
  );

  const { isLoading: isLoadingPricing, fetchAPI: fetchPricingAPI } = useAPI(
    VendorListingAPI.GetListingPricingInfo,
    {
      onSuccess: actions.setPricing,
      onFinally: () => (isFetchingPricing = false),
    },
  );

  const fetchListingDetails = () => {
    if (isFetchingDetails) return;

    isFetchingDetails = true;
    fetchDetailsAPI({ listingId: listingId! });
  };

  const fetchListingPricing = () => {
    if (isFetchingPricing) return;

    isFetchingPricing = true;
    fetchPricingAPI({ listingId: listingId! });
  };

  useEffect(() => {
    !details && fetchAllOnMount && fetchListingDetails();
  }, [details]);

  useEffect(() => {
    !pricing && fetchAllOnMount && fetchListingPricing();
  }, [pricing]);

  return {
    details,
    media,
    pricing,
    fetchListingDetails,
    fetchListingPricing,
    isLoadingDetails,
    isLoadingPricing,
  };
};
