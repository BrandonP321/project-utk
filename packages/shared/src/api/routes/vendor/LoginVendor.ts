import { APIError } from "../../errors/APIError";
import { getErrorsMap } from "../routeErrors";

export namespace LoginVendor {
  export const Path = "/vendor/login";

  export type ReqBody = {
    email: string;
    password: string;
  };

  export type ResBody = {};

  export const Errors = getErrorsMap([
    new APIError({
      code: "INVALID_CREDENTIALS",
      msg: "Incorrect email or password",
      statusCode: 401,
    }),
  ]);
}
