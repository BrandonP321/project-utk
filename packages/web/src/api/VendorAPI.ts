import {
  LoginVendor,
  LogoutVendor,
  RegisterVendor,
  RequestVendorPasswordReset,
  ResetVendorPassword,
  SendVendorVerificationEmail,
  VerifyVendorEmail,
  GetAuthenticatedVendor,
  RequestVendorEmailUpdate,
  UpdateVendor,
  UpdateVendorEmail,
} from "@project-utk/shared/src/api/routes/vendor";
import { APIHelpers } from "./APIHelpers";

export class VendorAPI extends APIHelpers {
  static RegisterVendor = this.req<
    RegisterVendor.ReqBody,
    RegisterVendor.ResBody,
    typeof RegisterVendor.Errors
  >(RegisterVendor.Path, { displayError: false });

  static LoginVendor = this.req<
    LoginVendor.ReqBody,
    LoginVendor.ResBody,
    typeof LoginVendor.Errors
  >(LoginVendor.Path);

  static logoutVendor = this.req<
    LogoutVendor.ReqBody,
    LogoutVendor.ResBody,
    typeof LogoutVendor.Errors
  >(LogoutVendor.Path, { displayError: false });

  static SendVerificationEmail = this.req<
    SendVendorVerificationEmail.ReqBody,
    SendVendorVerificationEmail.ResBody,
    typeof SendVendorVerificationEmail.Errors
  >(SendVendorVerificationEmail.Path);

  static VerifyEmail = this.req<
    VerifyVendorEmail.ReqBody,
    VerifyVendorEmail.ResBody,
    typeof VerifyVendorEmail.Errors
  >(VerifyVendorEmail.Path, { successMsg: VerifyVendorEmail.SuccessMsg });

  static RequestPasswordReset = this.req<
    RequestVendorPasswordReset.ReqBody,
    RequestVendorPasswordReset.ResBody,
    typeof RequestVendorPasswordReset.Errors
  >(RequestVendorPasswordReset.Path, {
    successMsg: RequestVendorPasswordReset.SuccessMsg,
  });

  static ResetPassword = this.req<
    ResetVendorPassword.ReqBody,
    ResetVendorPassword.ResBody,
    typeof ResetVendorPassword.Errors
  >(ResetVendorPassword.Path, { successMsg: ResetVendorPassword.SuccessMsg });

  static GetAuthenticatedVendor = this.req<
    GetAuthenticatedVendor.ReqBody,
    GetAuthenticatedVendor.ResBody,
    typeof GetAuthenticatedVendor.Errors
  >(GetAuthenticatedVendor.Path, {
    displayError: false,
    redirectOnUnauthenticated: false,
  });

  static UpdateVendor = this.req<
    UpdateVendor.ReqBody,
    UpdateVendor.ResBody,
    typeof UpdateVendor.Errors
  >(UpdateVendor.Path, { successMsg: UpdateVendor.SuccessMsg });

  static UpdateVendorEmail = this.req<
    UpdateVendorEmail.ReqBody,
    UpdateVendorEmail.ResBody,
    typeof UpdateVendorEmail.Errors
  >(UpdateVendorEmail.Path, { successMsg: UpdateVendorEmail.SuccessMsg });

  static RequestEmailUpdate = this.req<
    RequestVendorEmailUpdate.ReqBody,
    RequestVendorEmailUpdate.ResBody,
    typeof RequestVendorEmailUpdate.Errors
  >(RequestVendorEmailUpdate.Path, {
    successMsg: RequestVendorEmailUpdate.SuccessMsg,
  });
}
