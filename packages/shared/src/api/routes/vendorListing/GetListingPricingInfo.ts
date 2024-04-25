import { APIError } from "../../errors/APIError";
import { PricingOptionGroupAPI } from "../../models/PricingOptionGroup/IPricingOptionGroup";
import { PublicVendorListingProperties } from "../../models/vendorListing/IVendorListing";
import { getErrorsMap } from "../routeErrors";

export namespace GetListingPricingInfo {
  export const Path = "/vendor-listing/pricing";

  export type ReqBody = {
    listingId: string;
  };

  export type ResBody = {
    pricingGroups: PricingOptionGroupAPI.PopulatedResponseList;
  };

  export const Errors = getErrorsMap([]);
}
