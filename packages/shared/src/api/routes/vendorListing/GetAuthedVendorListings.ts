import { PublicVendorListingProperties } from "../../models/vendorListing/IVendorListing";
import { getErrorsMap } from "../routeErrors";

export namespace GetAuthedVendorListings {
  export const Path = "/vendor-listing/get-authed-vendor-listings";

  export type ReqBody = {};

  export type ResBody = {
    listings: PublicVendorListingProperties[];
  };

  export const Errors = getErrorsMap([]);
}
