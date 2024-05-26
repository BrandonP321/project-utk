import { EmailVerificationUtils } from "../../../../utils";
import { TestUtils, VendorTestUtils } from "../../../utils/";
import { RegisterVendor } from "@project-utk/shared/src/api/routes";

const registerVendorRequest = TestUtils.getRequestFunc<
  RegisterVendor.ReqBody,
  RegisterVendor.ResBody,
  typeof RegisterVendor.Errors
>(RegisterVendor.Path);

const testEmail = VendorTestUtils.getTestEmail("vendor.register");

const validReq: RegisterVendor.ReqBody = {
  email: testEmail,
  password: VendorTestUtils.correctPassword,
  name: "Test Vendor",
  confirmPassword: VendorTestUtils.correctPassword,
};

const invalidReq: RegisterVendor.ReqBody = {
  email: VendorTestUtils.invalidEmail,
  password: VendorTestUtils.invalidPassword,
  name: "Test Vendor",
  confirmPassword: VendorTestUtils.correctPassword,
};

describe("Register Vendor Endpoint", () => {
  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  TestUtils.itShouldRejectInvalidInput(() => registerVendorRequest(invalidReq));

  it("should return a new vendor id after successful registration", async () => {
    const res = await registerVendorRequest(validReq);

    expect(res.body.vendorId).toBeDefined();
  });

  it("should reject registration if the email is already in use", async () => {
    await registerVendorRequest(validReq);
    const res = await registerVendorRequest(validReq);

    expect(res.body.errCode).toBe(
      RegisterVendor.Errors.EMAIL_ALREADY_EXISTS.code,
    );
  });

  it("should set a JWT on successful registration", async () => {
    const res = await registerVendorRequest(validReq);

    expect(VendorTestUtils.getJWTFromHeader(res.header)).toBeDefined();
  });

  it("should send a verification email on successful registration", async () => {
    jest
      .spyOn(EmailVerificationUtils, "sendVerificationEmail")
      .mockResolvedValue();

    await registerVendorRequest(validReq);

    expect(EmailVerificationUtils.sendVerificationEmail).toHaveBeenCalled();
  });
});
