import { GetAuthedVendorListings } from "@project-utk/shared/src/api/routes/vendorListing";
import {
  TAgent,
  TestUtils,
  VendorListingTestUtils,
  VendorTestUtils,
} from "../../../utils/";

const testEmail = VendorTestUtils.getTestEmail("vendor.auth.listings");

describe("Get auth vendor listings endpoint", () => {
  let agent: TAgent;

  const getAuthListingsRequest = () =>
    TestUtils.request<
      GetAuthedVendorListings.ReqBody,
      GetAuthedVendorListings.ResBody
    >(GetAuthedVendorListings.Path, {}, agent);

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
    await VendorListingTestUtils.createValidListing(agent);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  TestUtils.itShouldRequireAuth(getAuthListingsRequest, (a) => (agent = a));

  it("should return the listings for the authenticated vendor", async () => {
    const res = await getAuthListingsRequest();

    expect(res.body.listings).toHaveLength(1);

    expect(res.body.listings![0].id).toBeDefined();
  });
});
