import {
  RequestVendorPasswordReset,
  ResetVendorPassword,
} from "@project-utk/shared/src/api/routes";
import { TestUtils, VendorTestUtils } from "../../../utils/";
import Vendor from "../../../../models/vendor/Vendor";

const testEmail = VendorTestUtils.getTestEmail("vendor.password.reset");
const newPassword = "NewPassword@123";

const passwordResetRequest = (req: ResetVendorPassword.ReqBody) =>
  TestUtils.request<ResetVendorPassword.ReqBody, ResetVendorPassword.ResBody>(
    ResetVendorPassword.Path,
    req,
  );

const validPasswordResetRequest = (token: string) =>
  passwordResetRequest({
    token,
    password: newPassword,
    confirmPassword: newPassword,
  });

const invalidPasswordResetRequest = (token: string) =>
  passwordResetRequest({
    token,
    password: VendorTestUtils.invalidPassword,
    confirmPassword: VendorTestUtils.invalidPassword,
  });

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

  TestUtils.itShouldRejectInvalidInput(() =>
    invalidPasswordResetRequest(vendor.resetToken!),
  );

  it("should create a password reset token", async () => {
    expect(vendor.resetToken).toBeDefined();
  });

  it("should reset the vendor's password", async () => {
    const res = await validPasswordResetRequest(vendor.resetToken!);

    expect(res.body.vendorId).toBeDefined();
  });
});
