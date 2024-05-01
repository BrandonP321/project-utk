import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { VendorAPI } from "../../api";
import { Actions } from "..";
import { APIHelpers } from "../../api/APIHelpers";

let isFetching = false;

type Props = {
  redirectOnUnauthenticated?: boolean;
};

export const useAuthVendor = (props: Props = {}) => {
  const { redirectOnUnauthenticated = true } = props;

  const dispatch = useAppDispatch();
  const [isFetchingAuthVendor, setIsFetchingAuthVendor] = useState(false);
  const { vendor } = useAppSelector((state) => state.authVendor);

  const fetchAndUpdateVendor = () => {
    if (isFetchingAuthVendor) return;

    isFetching = true;
    setIsFetchingAuthVendor(true);

    VendorAPI.GetAuthenticatedVendor(
      {},
      {
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
          setIsFetchingAuthVendor(false);
        },
      }
    );
  };

  useEffect(() => {
    if (!isFetching && !vendor) {
      fetchAndUpdateVendor();
    }
  }, [vendor]);

  return { vendor, fetchAndUpdateVendor, isFetchingAuthVendor };
};
