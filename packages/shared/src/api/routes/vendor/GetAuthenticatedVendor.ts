import { PublicVendorProperties } from "../../models/vendor/IVendor";
import { getErrorsMap } from "../routeErrors";

export namespace GetAuthenticatedVendor {
  export const Path = "/vendor/authenticated";

  export type ReqBody = {};

  export type ResBody = PublicVendorProperties;

  export const Errors = getErrorsMap([]);
}
