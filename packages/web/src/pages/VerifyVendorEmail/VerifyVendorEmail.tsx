import { useEffect, useState } from "react";
import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { SearchParamKeys } from "../../utils/RouteHelper";
import styles from "./VerifyVendorEmail.module.scss";
import { useAppDispatch } from "../../hooks";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import { Actions } from "../../features";
import { VendorAPI } from "../../api";

namespace VerifyVendorEmail {
  export type Props = {};
}

function VerifyVendorEmail(props: VerifyVendorEmail.Props) {
  const [isVerifying, setIsVerifying] = useState(true);
  const dispatch = useAppDispatch();
  const { token } = useURLSearchParams<SearchParamKeys.Token>();

  useEffect(() => {
    if (token) {
      VendorAPI.VerifyEmail(
        { token },
        {
          onSuccess: () => {
            dispatch(
              Actions.Notifications.addSuccess({
                msg: "Email verified",
              }),
            );
          },
          onFinally: () => {
            setIsVerifying(false);
          },
        },
      );
    } else {
      dispatch(
        Actions.Notifications.addError({ msg: "Invalid verification link" }),
      );
      setIsVerifying(false);
    }
  }, [token]);

  return (
    <SpaceBetween align="center" vertical>
      {isVerifying ? <h1>Verifying...</h1> : <h1>Finished</h1>}
    </SpaceBetween>
  );
}

export default VerifyVendorEmail;
