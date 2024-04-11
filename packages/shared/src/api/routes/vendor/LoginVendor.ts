import { APIError } from "../../errors/APIError";
import { getErrorsMap } from "../routeErrors";

export namespace LoginVendor {
  export type ReqBody = {
    email: string;
    password: string;
  };

  export type ResBody = {};

  export const Errors = getErrorsMap([
    new APIError({
      code: "INVALID_CREDENTIALS",
      msg: "Invalid credentials",
      statusCode: 401,
    }),
  ]);
}
