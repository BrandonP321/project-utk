import { UpdateVendorListing } from "@project-utk/shared/src/api/routes/vendorListing";
import {
  TAgent,
  TestUtils,
  VendorListingTestUtils,
  VendorTestUtils,
} from "../../../../utils/testUtils";
import { VendorListingAPI } from "@project-utk/shared/src/api/models/vendorListing/IVendorListing";

const testEmail = VendorTestUtils.getTestEmail("vendor.Listing.update");

const updatedListingName = "Updated listing";

const validListingUpdate: VendorListingAPI.UpdateRequest = {
  name: updatedListingName,
};

describe("Update vendor listing endpoint", () => {
  let agent: TAgent;
  let listingId: string;

  const updateListingRequest = TestUtils.getRequestFunc<
    UpdateVendorListing.ReqBody,
    UpdateVendorListing.ResBody,
    typeof UpdateVendorListing.Errors
  >(UpdateVendorListing.Path);

  const updateValidListing = () =>
    updateListingRequest({ listingId, listing: validListingUpdate }, agent);

  const updateNonexistentListing = () =>
    updateListingRequest(
      { listingId: TestUtils.nonexistentUUID, listing: validListingUpdate },
      agent
    );

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
    const res = await VendorListingTestUtils.createValidListing(agent);

    listingId = res.body.listingId!;
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  TestUtils.itShouldRequireAuth(updateValidListing, (a) => (agent = a));
  TestUtils.itShouldReturn404(updateNonexistentListing);

  it("should update a vendor listing", async () => {
    await updateValidListing();

    const res = await VendorListingTestUtils.getTestListing(listingId, agent);

    expect(res.body.listing?.name).toEqual(updatedListingName);
  });
});
