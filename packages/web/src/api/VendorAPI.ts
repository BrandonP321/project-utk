import {
  RegisterVendor,
  SendVendorVerificationEmail,
} from "@project-utk/shared/src/api/routes";
import { APIHelpers } from "./APIHelpers";

export class VendorAPI extends APIHelpers {
  static RegisterVendor = this.req<
    RegisterVendor.ReqBody,
    RegisterVendor.ResBody,
    typeof RegisterVendor.Errors
  >(RegisterVendor.Path, { displayError: false });

  static SendVerificationEmail = this.req<
    SendVendorVerificationEmail.ReqBody,
    SendVendorVerificationEmail.ResBody,
    typeof SendVendorVerificationEmail.Errors
  >(SendVendorVerificationEmail.Path);
}
