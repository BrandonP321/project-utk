import { APIError } from "../../errors/APIError";
import { getErrorsMap } from "../routeErrors";

export namespace VerifyVendorEmail {
  export const Path = "/vendor/verify-email";

  export const VerificationLinkSearchParamKey = "token";
  export const WebPath = `/vendor/verify-email`;

  export type ReqBody = {
    token: string;
  };

  export type ResBody = {
    vendorId: string;
  };

  export const Errors = getErrorsMap([
    new APIError({
      code: "LINK_EXPIRED",
      msg: "The verification link has expired",
      statusCode: 400,
    }),
    new APIError({
      code: "INVALID_LINK",
      msg: "The verification link is invalid",
      statusCode: 400,
    }),
    new APIError({
      code: "EMAIL_ALREADY_VERIFIED",
      msg: "Email is already verified",
      statusCode: 400,
    }),
  ]);
}
