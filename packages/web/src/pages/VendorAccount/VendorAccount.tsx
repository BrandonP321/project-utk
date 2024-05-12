import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import VendorEmailUpdateContainer from "./components/VendorEmailUpdateContainer";
import VendorEmailVerificationAlert from "../../components/VendorDashboard/VendorEmailVerificationAlert/VendorEmailVerificationAlert";
import VendorBasicInfoContainer from "./components/VendorBasicInfoContainer";

export default function VendorAccount() {
  return (
    <SpaceBetween size="xl" vertical stretchChildren>
      <VendorEmailVerificationAlert />
      <VendorBasicInfoContainer />
      <VendorEmailUpdateContainer />
    </SpaceBetween>
  );
}
