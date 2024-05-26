import { UpdateVendor } from "@project-utk/shared/src/api/routes/vendor/UpdateVendor";
import { TAgent, TestUtils, VendorTestUtils } from "../../../utils/";

const testEmail = VendorTestUtils.getTestEmail("updateVendor");

const updatedVendorName = "Updated Vendor";

describe("Update Vendor Endpoint", () => {
  let agent: TAgent;

  const updateVendorRequest = (body: UpdateVendor.ReqBody) =>
    TestUtils.request<UpdateVendor.ReqBody, UpdateVendor.ResBody>(
      UpdateVendor.Path,
      body,
      agent,
    );

  const validUpdateRequest = () =>
    updateVendorRequest({
      name: updatedVendorName,
    });

  const invalidUpdateRequest = () =>
    updateVendorRequest({
      name: "",
    });

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  TestUtils.itShouldRequireAuth(validUpdateRequest, (a) => (agent = a));
  TestUtils.itShouldRejectInvalidInput(invalidUpdateRequest);

  it("should update the vendor's name", async () => {
    await validUpdateRequest();
    const vendor = await VendorTestUtils.getTestVendor(testEmail);

    expect(vendor.name).toBe(updatedVendorName);
  });
});
