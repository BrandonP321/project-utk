import {
  ResetVendorPassword,
  SendVendorVerificationEmail,
  VerifyVendorEmail,
} from "@project-utk/shared/src/api/routes";
import { TAgent, TestUtils } from "../../../../utils/testUtils";
import { VendorTestUtils } from "../../../../utils/testUtils/VendorTestUtils";
import Vendor from "../../../../models/vendor/Vendor";

const testEmail = VendorTestUtils.getTestEmail("vendor.verify.email");

describe("Verify vendor email endpoint", () => {
  let agent: TAgent;

  const verifyEmailRequest = (token: string) =>
    TestUtils.request<VerifyVendorEmail.ReqBody, VerifyVendorEmail.ResBody>(
      VerifyVendorEmail.Path,
      { token },
      agent
    );

  const requestVerificationEmail = () =>
    TestUtils.request<
      SendVendorVerificationEmail.ReqBody,
      SendVendorVerificationEmail.ResBody
    >(SendVendorVerificationEmail.Path, { email: testEmail }, agent);

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
    await requestVerificationEmail();
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  it("should createa a verification token", async () => {
    const vendor = (await Vendor.findOne({ where: { email: testEmail } }))!;

    expect(vendor.emailVerificationToken).toBeDefined();
  });

  it("should mark the vendor's email as verified", async () => {
    const vendor = (await Vendor.findByEmail(testEmail))!;

    await verifyEmailRequest(vendor.emailVerificationToken!);
    const updatedVendor = (await Vendor.findByEmail(testEmail))!;

    expect(updatedVendor.isEmailVerified).toBe(true);
  });
});
