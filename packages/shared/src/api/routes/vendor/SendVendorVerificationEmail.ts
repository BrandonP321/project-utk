import { getErrorsMap } from "../routeErrors";

export namespace SendVendorVerificationEmail {
  export const Path = "/vendor/verify-email/send";

  export type ReqBody = {};

  export type ResBody = {};

  export const SuccessMsg = "Email sent successfully";

  export const Errors = getErrorsMap([]);
}
