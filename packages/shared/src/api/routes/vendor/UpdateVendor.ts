import { VendorAPI } from "../../models/vendor/IVendor";
import { getErrorsMap } from "../routeErrors";

export namespace UpdateVendor {
  export const Path = "/vendor/update";

  export type ReqBody = VendorAPI.UpdateRequest;

  export type ResBody = {};

  export const Errors = getErrorsMap([]);
}
