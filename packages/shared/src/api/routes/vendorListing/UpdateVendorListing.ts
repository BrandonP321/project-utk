import { VendorListingAPI } from "../../models/vendorListing/IVendorListing";
import { getErrorsMap } from "../routeErrors";

export namespace UpdateVendorListing {
  export const Path = "/vendor-listing/update";

  export type ReqBody = {
    listingId: string;
    listing: VendorListingAPI.UpdateRequest;
  };

  export type ResBody = {};

  export const Errors = getErrorsMap([]);
}
