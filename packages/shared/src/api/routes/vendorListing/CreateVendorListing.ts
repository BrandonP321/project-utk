import { VendorListingAPI } from "../../models/vendorListing/IVendorListing";
import { getErrorsMap } from "../routeErrors";

export namespace CreateVendorListing {
  export const Path = "/vendor-listing/create";

  export type ReqBody = VendorListingAPI.CreateRequest;

  export type ResBody = {
    listingId: string;
  };

  export const Errors = getErrorsMap([]);
}
