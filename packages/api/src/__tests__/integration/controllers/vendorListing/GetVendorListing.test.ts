import { GetVendorListing } from "@project-utk/shared/src/api/routes/vendorListing/GetVendorListing";
import {
  TestUtils,
  VendorListingTestUtils,
  VendorTestUtils,
} from "../../../../utils/testUtils";

const testEmail = VendorTestUtils.getTestEmail("vendor.listing.get");

describe("Get Vendor Listing Endpoint", () => {
  let listingId: string;

  const getListingRequest = TestUtils.getRequestFunc<
    GetVendorListing.ReqBody,
    GetVendorListing.ResBody,
    typeof GetVendorListing.Errors
  >(GetVendorListing.Path);

  const getListing = () => getListingRequest({ listingId });

  const getNonExistentListing = () =>
    getListingRequest({ listingId: TestUtils.nonexistentUUID });

  beforeEach(async () => {
    const agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
    const res = await VendorListingTestUtils.createValidListing(agent);

    listingId = res.body.listingId!;
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  TestUtils.itShouldReturn404(getNonExistentListing);

  it("should return the listing", async () => {
    const res = await getListing();

    expect(res.body.listing?.id).toBe(listingId);
  });
});
