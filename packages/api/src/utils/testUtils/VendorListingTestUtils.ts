import {
  CreateVendorListing,
  GetVendorListing,
} from "@project-utk/shared/src/api/routes/vendorListing";
import { TAgent, TestUtils } from "./TestUtils";

export class VendorListingTestUtils {
  static validCreationReqBody: CreateVendorListing.ReqBody = {
    name: "Test Listing",
  };

  static invalidCreationReqBody: CreateVendorListing.ReqBody = {
    ...this.validCreationReqBody,
    name: "",
  };

  static createListingRequest = TestUtils.getRequestFunc<
    CreateVendorListing.ReqBody,
    CreateVendorListing.ResBody,
    typeof CreateVendorListing.Errors
  >(CreateVendorListing.Path);

  static createValidListing = (agent?: TAgent) =>
    this.createListingRequest(this.validCreationReqBody, agent);

  static createInvalidListing = (agent?: TAgent) =>
    this.createListingRequest(this.invalidCreationReqBody, agent);

  static getTestListing = (listingId: string, agent?: TAgent) =>
    TestUtils.getRequestFunc<
      GetVendorListing.ReqBody,
      GetVendorListing.ResBody,
      typeof GetVendorListing.Errors
    >(GetVendorListing.Path)({ listingId }, agent);
}
