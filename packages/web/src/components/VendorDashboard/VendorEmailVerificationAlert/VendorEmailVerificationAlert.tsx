import { VendorAPI } from "../../../api";
import { useAuthVendor } from "../../../features/authVendor/useAuthVendor";
import { useAPI } from "../../../hooks/useAPI";
import Alert from "../../Alert/Alert";
import Button from "../../Button/Button";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";

function VendorEmailVerificationAlert() {
  const { vendor } = useAuthVendor();

  const { fetchAPI: sendEmail, isLoading } = useAPI(
    VendorAPI.SendVerificationEmail,
  );

  return (
    <Alert
      title="Email not verified"
      type="error"
      visible={!!vendor && !vendor.isEmailVerified}
    >
      <SpaceBetween vertical>
        Your email address has not been verified. Please verify your email to
        continue using the platform.
        <SpaceBetween justify="start" stretch>
          <Button onClick={() => sendEmail({})} loading={isLoading}>
            Re-send email
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    </Alert>
  );
}

export default VendorEmailVerificationAlert;
