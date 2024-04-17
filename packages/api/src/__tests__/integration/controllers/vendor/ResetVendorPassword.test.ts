import {
  RequestVendorPasswordReset,
  ResetVendorPassword,
} from "@project-utk/shared/src/api/routes";
import { PasswordResetUtils } from "../../../../utils";
import { TestUtils } from "../../../../utils/testUtils";
import { VendorTestUtils } from "../../../../utils/testUtils/VendorTestUtils";
import Vendor from "../../../../models/vendor/Vendor";

const testEmail = VendorTestUtils.getTestEmail("vendor.password.reset");
const newPassword = "NewPassword@123";

const passwordResetRequest = (token: string) =>
  TestUtils.request<ResetVendorPassword.ReqBody, ResetVendorPassword.ResBody>(
    ResetVendorPassword.Path,
    { password: newPassword, confirmPassword: newPassword, token }
  );

const requestPasswordReset = () =>
  TestUtils.request<
    RequestVendorPasswordReset.ReqBody,
    RequestVendorPasswordReset.ResBody
  >(RequestVendorPasswordReset.Path, { email: testEmail });

describe("Reset vendor password endpoint", () => {
  let vendor: Vendor;

  beforeEach(async () => {
    await VendorTestUtils.createTestVendor(testEmail);
    await requestPasswordReset();
    vendor = (await Vendor.findOne({ where: { email: testEmail } }))!;
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  it("should createa a password reset token", async () => {
    expect(vendor.resetToken).toBeDefined();
  });

  it("should reset the vendor's password", async () => {
    const res = await passwordResetRequest(vendor.resetToken!);

    expect(res.body.vendorId).toBeDefined();
  });
});
