import {
  GetAuthedVendorListings,
  CreateVendorListing,
  GetListingPricingInfo,
  GetVendorListing,
  UpdateVendorListing,
  UpdateVendorListingPricing,
} from "@project-utk/shared/src/api/routes/vendorListing";
import { APIHelpers } from "./APIHelpers";
import { GetListingImagesPresignedUrls } from "@project-utk/shared/src/api/routes/vendorListing/GetListingImagesPresignedUrls";

export class VendorListingAPI extends APIHelpers {
  static GetAuthVendorListings = this.req<
    GetAuthedVendorListings.ReqBody,
    GetAuthedVendorListings.ResBody,
    typeof GetAuthedVendorListings.Errors
  >(GetAuthedVendorListings.Path);

  static GetVendorListing = this.req<
    GetVendorListing.ReqBody,
    GetVendorListing.ResBody,
    typeof GetVendorListing.Errors
  >(GetVendorListing.Path);

  static CreateVendorListing = this.req<
    CreateVendorListing.ReqBody,
    CreateVendorListing.ResBody,
    typeof CreateVendorListing.Errors
  >(CreateVendorListing.Path);

  static UpdateVendorListing = this.req<
    UpdateVendorListing.ReqBody,
    UpdateVendorListing.ResBody,
    typeof UpdateVendorListing.Errors
  >(UpdateVendorListing.Path, { successMsg: UpdateVendorListing.SuccessMsg });

  static GetListingPricingInfo = this.req<
    GetListingPricingInfo.ReqBody,
    GetListingPricingInfo.ResBody,
    typeof GetListingPricingInfo.Errors
  >(GetListingPricingInfo.Path);

  static UpdateVendorListingPricing = this.req<
    UpdateVendorListingPricing.ReqBody,
    UpdateVendorListingPricing.ResBody,
    typeof UpdateVendorListingPricing.Errors
  >(UpdateVendorListingPricing.Path);

  static GetListingImagesPresignedUrls = this.req<
    GetListingImagesPresignedUrls.ReqBody,
    GetListingImagesPresignedUrls.ResBody,
    typeof GetListingImagesPresignedUrls.Errors
  >(GetListingImagesPresignedUrls.Path);
}
