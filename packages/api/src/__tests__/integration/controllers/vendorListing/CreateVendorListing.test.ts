import {
  TAgent,
  TestUtils,
  VendorListingTestUtils,
} from "../../../../utils/testUtils";
import { VendorTestUtils } from "../../../../utils/testUtils/VendorTestUtils";

const testEmail = VendorTestUtils.getTestEmail("vendor.Listing.create");

describe("Create Vendor Listing Endpoint", () => {
  let agent: TAgent;

  const createValidListing = () =>
    VendorListingTestUtils.createValidListing(agent);

  const createInvalidListing = () =>
    VendorListingTestUtils.createInvalidListing(agent);

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  TestUtils.itShouldRejectInvalidInput(createInvalidListing);
  TestUtils.itShouldRequireAuth(createValidListing, (a) => (agent = a));

  it("should create a new vendor listing", async () => {
    const res = await createValidListing();

    expect(res.body.listingId).toBeDefined();
  });
});
