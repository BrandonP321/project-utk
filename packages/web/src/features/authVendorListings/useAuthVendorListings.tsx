import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { VendorAPI } from "../../api";
import { Actions } from "..";
import { useAPI } from "../../hooks/useAPI";

let isFetching = false;

export const useAuthVendorListings = () => {
  const dispatch = useAppDispatch();
  const { listings } = useAppSelector((state) => state.authVendorListings);

  const { isLoading, fetchAPI } = useAPI(VendorAPI.GetAuthVendorListings, {
    onSuccess: (data) => {
      dispatch(Actions.AuthVendorListings.setListings(data));
    },
    onFailure: () => {
      dispatch(Actions.AuthVendorListings.clearListings());
    },
    onFinally: () => {
      isFetching = false;
    },
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
