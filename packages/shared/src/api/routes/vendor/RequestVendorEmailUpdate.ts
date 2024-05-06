import { APIError } from "../../errors/APIError";
import { getErrorsMap } from "../routeErrors";

export namespace RequestVendorEmailUpdate {
  export const Path = "/vendor/request-email-update";

  export type ReqBody = {
    email: string;
  };

  export type ResBody = {
    /** True if email address was instantly updated; false if email was sent to new address */
    updated: boolean;
  };

  export const SuccessMsg = "Email update request sent";

  export const Errors = getErrorsMap([
    new APIError({
      code: "EMAIL_TAKEN",
      msg: "Email is already taken",
      statusCode: 400,
    }),
  ]);
}
