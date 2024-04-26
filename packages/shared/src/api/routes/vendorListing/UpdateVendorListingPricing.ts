import { PricingOptionGroupAPI } from "../../models/PricingOptionGroup/IPricingOptionGroup";
import { getErrorsMap } from "../routeErrors";

export namespace UpdateVendorListingPricing {
  export const Path = "/vendor-listing/pricing/update";

  export type ReqBody = {
    listingId: string;
    pricingGroups: PricingOptionGroupAPI.CreateRequest[];
  };

  export type ResBody = {
    success: boolean;
  };

  export const Errors = getErrorsMap([]);
}
