import { LogoutVendor } from "@project-utk/shared/src/api/routes";
import { TestUtils } from "../../../../utils/testUtils";
import { VendorTestUtils } from "../../../../utils/testUtils/VendorTestUtils";

const testEmail = VendorTestUtils.getTestEmail("vendor.logout");

describe("Logout Vendor Endpoint", () => {
  let agent = TestUtils.agent();

  const logoutTestVendor = () =>
    TestUtils.request<LogoutVendor.ReqBody, LogoutVendor.ResBody>(
      LogoutVendor.Path,
      {},
      agent
    );

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  it("should remove the JWT cookie", async () => {
    const res = await logoutTestVendor();
    const authCookie = VendorTestUtils.getJWTFromHeader(res.header);

    expect(authCookie).toMatch(/AccessToken=;/);
  });

  it("should remove the vendor's refresh token", async () => {
    await logoutTestVendor();
    const vendor = await VendorTestUtils.getTestVendor(testEmail);

    expect(vendor.refreshToken).toBeNull();
  });
});
