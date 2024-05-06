import { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { useAPI } from "../../hooks/useAPI";
import { useAuthVendorListingsActions } from "./authVendorListingsSlice";
import { VendorListingAPI } from "../../api/VendorListingAPI";

let isFetching = false;

export const useAuthVendorListings = () => {
  const { setListings, clearListings } = useAuthVendorListingsActions();
  const { listings } = useAppSelector((state) => state.authVendorListings);

  const { isLoading, fetchAPI } = useAPI(
    VendorListingAPI.GetAuthVendorListings,
    {
      onSuccess: setListings,
      onFailure: clearListings,
      onFinally: () => (isFetching = false),
    },
  );

  const fetchAndUpdateVendorListings = () => {
    if (isFetching) return;

    isFetching = true;
    fetchAPI({});
  };

  useEffect(() => {
    if (!isFetching && !listings) {
      fetchAndUpdateVendorListings();
    }
  }, [listings]);

  return {
    listings,
    fetchAndUpdateVendorListings,
    isFetchingAuthVendorListings: isLoading,
  };
};
