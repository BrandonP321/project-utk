import { PricingOptionGroupAPI } from "../../models/PricingOptionGroup/IPricingOptionGroup";
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
