import { useEffect, useState } from "react";
import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { SearchParamKeys } from "../../utils/RouteHelper";
import styles from "./VerifyVendorEmail.module.scss";
import { useAppDispatch } from "../../hooks";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import { Actions } from "../../features";
import { VendorAPI } from "../../api";
import { useAPI } from "../../hooks/useAPI";

namespace VerifyVendorEmail {
  export type Props = {};
}

function VerifyVendorEmail(props: VerifyVendorEmail.Props) {
  const dispatch = useAppDispatch();
  const { token } = useURLSearchParams<SearchParamKeys.Token>();

  const { fetchAPI: verifyEmail, isLoading: isVerifyingEmail } = useAPI(
    VendorAPI.VerifyEmail,
    {
      onSuccess: () => {
        dispatch(
          Actions.Notifications.addSuccess({
            msg: "Email verified",
          }),
        );
      },
    },
  );

  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    } else {
      dispatch(
        Actions.Notifications.addError({ msg: "Invalid verification link" }),
      );
    }
  }, [token]);

  return (
    <SpaceBetween align="center" vertical>
      {isVerifyingEmail ? <h1>Verifying...</h1> : <h1>Finished</h1>}
    </SpaceBetween>
  );
}

export default VerifyVendorEmail;
