import {
  GetAuthedVendorListings,
  CreateVendorListing,
  GetListingPricingInfo,
  GetVendorListing,
  UpdateVendorListing,
  UpdateVendorListingPricing,
} from "@project-utk/shared/src/api/routes/vendorListing";
import { APIHelpers } from "./APIHelpers";

export class VendorListingAPI extends APIHelpers {
  static GetAuthVendorListings = this.req<
    GetAuthedVendorListings.ReqBody,
    GetAuthedVendorListings.ResBody,
    typeof GetAuthedVendorListings.Errors
  >(GetAuthedVendorListings.Path);
}
