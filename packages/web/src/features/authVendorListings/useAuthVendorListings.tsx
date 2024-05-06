import { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { VendorAPI } from "../../api";
import { useAPI } from "../../hooks/useAPI";
import { useAuthVendorListingsActions } from "./authVendorListingsSlice";

let isFetching = false;

export const useAuthVendorListings = () => {
  const { setListings, clearListings } = useAuthVendorListingsActions();
  const { listings } = useAppSelector((state) => state.authVendorListings);

  const { isLoading, fetchAPI } = useAPI(VendorAPI.GetAuthVendorListings, {
    onSuccess: setListings,
    onFailure: clearListings,
    onFinally: () => (isFetching = false),
  });

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
