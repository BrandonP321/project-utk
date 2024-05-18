import { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { VendorAPI } from "../../api";
import { APIHelpers } from "../../api/APIHelpers";
import { useAPI } from "../../hooks/useAPI";
import { useAuthVendorActions } from "./authVendorSlice";

let isFetching = false;

type Props = {
  redirectOnUnauthenticated?: boolean;
};

export const useAuthVendor = (props: Props = {}) => {
  const { redirectOnUnauthenticated = true } = props;

  const { setVendor, clearVendor } = useAuthVendorActions();
  const { vendor } = useAppSelector((state) => state.authVendor);

  const { isLoading, fetchAPI } = useAPI(VendorAPI.GetAuthenticatedVendor, {
    onSuccess: (data) => {
      setVendor({ vendor: data });
    },
    onFailure: () => {
      clearVendor();
      if (redirectOnUnauthenticated) {
        APIHelpers.redirectToVendorLogin();
      }
    },
    onFinally: () => {
      isFetching = false;
    },
  });

  const fetchAndUpdateVendor = () => {
    if (isFetching) return;

    isFetching = true;
    fetchAPI({});
  };

  useEffect(() => {
    if (!isFetching && !vendor) {
      fetchAndUpdateVendor();
    }
  }, [vendor]);

  return { vendor, fetchAndUpdateVendor, isFetchingAuthVendor: isLoading };
};
