import { PublicVendorListingProperties } from "../../models/vendorListing/IVendorListing";
import { getErrorsMap } from "../routeErrors";

export namespace GetVendorListing {
  export const Path = "/vendor-listing/get";

  export type ReqBody = {
    listingId: string;
  };

  export type ResBody = {
    listing: PublicVendorListingProperties;
  };

  export const Errors = getErrorsMap([]);
}
