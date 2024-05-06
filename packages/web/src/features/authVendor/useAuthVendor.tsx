import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { VendorAPI } from "../../api";
import { Actions } from "..";
import { APIHelpers } from "../../api/APIHelpers";
import { useAPI } from "../../hooks/useAPI";

let isFetching = false;

type Props = {
  redirectOnUnauthenticated?: boolean;
};

export const useAuthVendor = (props: Props = {}) => {
  const { redirectOnUnauthenticated = true } = props;

  const dispatch = useAppDispatch();
  const { vendor } = useAppSelector((state) => state.authVendor);

  const { isLoading, fetchAPI } = useAPI(VendorAPI.GetAuthenticatedVendor, {
    onSuccess: (data) => {
      dispatch(Actions.AuthVendor.setVendor({ vendor: data }));
    },
    onFailure: () => {
      dispatch(Actions.AuthVendor.clearVendor());
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
