import { APIError } from "../../errors/APIError";
import { getErrorsMap } from "../routeErrors";

export namespace UpdateVendorEmail {
  export const Path = "/vendor/update-email";

  export type ReqBody = {
    token: string;
    password: string;
  };

  export type ResBody = {};

  export const Errors = getErrorsMap([
    new APIError({
      code: "EMAIL_TAKEN",
      msg: "Email is already taken",
      statusCode: 400,
    }),
    new APIError({
      code: "INVALID_LINK",
      msg: "Invalid link",
      statusCode: 400,
    }),
    new APIError({
      code: "LINK_EXPIRED",
      msg: "Link expired",
      statusCode: 400,
    }),
    new APIError({
      code: "INVALID_PASSWORD",
      msg: "Invalid password",
      statusCode: 400,
    }),
  ]);
}
