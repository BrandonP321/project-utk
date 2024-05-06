import { useEffect } from "react";
import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { SearchParamKeys } from "../../utils/RouteHelper";
import styles from "./VerifyVendorEmail.module.scss";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import { VendorAPI } from "../../api";
import { useAPI } from "../../hooks/useAPI";
import { useNotificationsActions } from "../../features/notifications/notificationsSlice";

namespace VerifyVendorEmail {
  export type Props = {};
}

function VerifyVendorEmail(props: VerifyVendorEmail.Props) {
  const { addError } = useNotificationsActions();
  const { token } = useURLSearchParams<SearchParamKeys.Token>();

  const { fetchAPI: verifyEmail, isLoading: isVerifyingEmail } = useAPI(
    VendorAPI.VerifyEmail,
  );

  useEffect(() => {
    token ? verifyEmail({ token }) : addError({ msg: "Invalid link" });
  }, [token]);

  return (
    <SpaceBetween align="center" vertical>
      {isVerifyingEmail ? <h1>Verifying...</h1> : <h1>Finished</h1>}
    </SpaceBetween>
  );
}

export default VerifyVendorEmail;
