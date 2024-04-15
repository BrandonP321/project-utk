import { getErrorsMap } from "../routeErrors";

export namespace LogoutVendor {
  export const Path = "/vendor/logout";

  export type ReqBody = {};

  export type ResBody = {};

  export const Errors = getErrorsMap([]);
}
