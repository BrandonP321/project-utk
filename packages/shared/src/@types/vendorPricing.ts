import { PricingOptionGroupAPI } from "../api/models/PricingOptionGroup/IPricingOptionGroup";

export namespace VendorPricing {
  export type APICreateRequest = {
    [PricingOptionGroupAPI.PopulatedQueryResponseKey]: PricingOptionGroupAPI.CreateRequest[];
  };
}
