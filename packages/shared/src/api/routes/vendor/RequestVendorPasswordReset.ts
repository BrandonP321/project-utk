import { getErrorsMap } from "../routeErrors";

export namespace RequestVendorPasswordReset {
  export const Path = "/vendor/request-password-reset";

  export type ReqBody = {
    email: string;
  };

  export type ResBody = {};

  export const SuccessMsg = "Password reset email sent";

  export const Errors = getErrorsMap([]);
}
