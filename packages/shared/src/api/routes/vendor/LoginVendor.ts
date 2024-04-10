import { getTypedErrors } from "../routeErrors";

export namespace LoginVendor {
  export type ReqBody = {
    email: string;
    password: string;
  };

  export type ResBody = {};

  export const Errors = getTypedErrors({
    InvalidCredentials: {
      msg: "Invalid credentials",
      statusCode: 401,
    },
  });
}
