import { APIError } from "../../errors/APIError";
import { VendorBaseProperties } from "../../models/vendor/IVendor";
import { getErrorsMap } from "../routeErrors";

export namespace RegisterVendor {
  export const Path = "/vendor/register";

  export type ReqBody = Pick<
    VendorBaseProperties,
    "email" | "password" | "name"
  > & {
    confirmPassword: string;
  };

  export type ResBody = {
    vendorId: string;
  };

  export const Errors = getErrorsMap([
    new APIError({
      code: "EMAIL_ALREADY_EXISTS",
      msg: "Email already exists",
      statusCode: 409,
    }),
  ]);
}
