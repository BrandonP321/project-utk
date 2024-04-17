import { APIError } from "../../errors/APIError";
import { getErrorsMap } from "../routeErrors";

export namespace ResetVendorPassword {
  export const Path = "/vendor/reset-password";

  export type ReqBody = {
    token: string;
    password: string;
    confirmPassword: string;
  };

  export type ResBody = {
    vendorId: string;
  };

  export const Errors = getErrorsMap([
    new APIError({
      code: "LINK_EXPIRED",
      msg: "The password reset link has expired",
      statusCode: 400,
    }),
    new APIError({
      code: "INVALID_LINK",
      msg: "The password reset link is invalid",
      statusCode: 400,
    }),
  ]);
}
