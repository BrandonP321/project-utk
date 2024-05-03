import { getErrorsMap } from "../routeErrors";

export namespace RequestVendorEmailUpdate {
  export const Path = "/vendor/request-email-update";

  export type ReqBody = {};

  export type ResBody = {};

  export const Errors = getErrorsMap([]);
}
