import { GetAuthenticatedVendor } from "@project-utk/shared/src/api/routes/vendor/GetAuthenticatedVendor";
import {
  TAgent,
  TestUtils,
  VendorTestUtils,
} from "../../../../utils/testUtils";

const testEmail = VendorTestUtils.getTestEmail("getAuthenticatedVendor");

describe("Get Authenticated Vendor Endpoint", () => {
  let agent: TAgent;

  const getVendorRequest = () =>
    TestUtils.request<
      GetAuthenticatedVendor.ReqBody,
      GetAuthenticatedVendor.ResBody
    >(GetAuthenticatedVendor.Path, {}, agent);

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  TestUtils.itShouldRequireAuth(getVendorRequest, (a) => (agent = a));

  it("should return the authenticated vendor", async () => {
    const res = await getVendorRequest();

    expect(res.body.email).toBe(testEmail);
  });
});
