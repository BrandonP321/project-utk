import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { VendorAPI } from "../../api";
import { Actions } from "..";

let isFetching = false;

export const useAuthVendorListings = () => {
  const dispatch = useAppDispatch();
  const [isFetchingAuthVendorListings, setIsFetchingAuthVendorListings] =
    useState(false);
  const { listings } = useAppSelector((state) => state.authVendorListings);

  const fetchAndUpdateVendorListings = () => {
    if (isFetchingAuthVendorListings) return;

    isFetching = true;
    setIsFetchingAuthVendorListings(true);

    VendorAPI.GetAuthVendorListings(
      {},
      {
        onSuccess: (data) => {
          dispatch(Actions.AuthVendorListings.setListings(data));
        },
        onFailure: () => {
          dispatch(Actions.AuthVendorListings.clearListings());
        },
        onFinally: () => {
          isFetching = false;
          setIsFetchingAuthVendorListings(false);
        },
      }
    );
  };

  useEffect(() => {
    if (!isFetching && !listings) {
      fetchAndUpdateVendorListings();
    }
  }, [listings]);

  return {
    listings,
    fetchAndUpdateVendorListings,
    isFetchingAuthVendorListings,
  };
};
