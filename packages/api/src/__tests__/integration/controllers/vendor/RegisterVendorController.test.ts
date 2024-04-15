import { EmailVerificationUtils, JWTUtils } from "../../../../utils";
import { TestUtils } from "../../../../utils/testUtils";
import { RegisterVendor } from "@project-utk/shared/src/api/routes";

const registerVendorRequest = TestUtils.getRequestFunc<
  RegisterVendor.ReqBody,
  RegisterVendor.ResBody,
  typeof RegisterVendor.Errors
>(RegisterVendor.Path);

const testEmail = TestUtils.getTestEmail("vendor.register");

const validReq: RegisterVendor.ReqBody = {
  email: testEmail,
  password: TestUtils.validPassword,
  name: "Test Vendor",
  confirmPassword: TestUtils.validPassword,
};

const invalidReq: RegisterVendor.ReqBody = {
  email: TestUtils.invalidEmail,
  password: TestUtils.invalidPassword,
  name: "Test Vendor",
  confirmPassword: TestUtils.validPassword,
};

describe("Register Vendor Endpoint", () => {
  beforeAll(async () => {
    await TestUtils.waitForServerToStart();
  });

  afterEach(async () => {
    await TestUtils.deleteTestVendor(testEmail);
  });

  it("should return a new vendor id after successful registration", async () => {
    const res = await registerVendorRequest(validReq);

    expect(res.body.vendorId).toBeDefined();
  });

  it("should reject registration wth invalid input", async () => {
    const res = await registerVendorRequest(invalidReq);

    expect(res.body.errCode).toBe(RegisterVendor.Errors.INVALID_INPUT.code);
  });

  it("should reject registration if the email is already in use", async () => {
    await registerVendorRequest(validReq);
    const res = await registerVendorRequest(validReq);

    expect(res.body.errCode).toBe(
      RegisterVendor.Errors.EMAIL_ALREADY_EXISTS.code
    );
  });

  it("should set a JWT on successful registration", async () => {
    const res = await registerVendorRequest(validReq);
    const cookieHeader = res.header["set-cookie"] as unknown;

    expect(
      (cookieHeader as string[]).find((cookie: string) =>
        cookie.startsWith(JWTUtils.cookieKey)
      )
    ).toBeDefined();
  });

  it("should send a verification email on successful registration", async () => {
    jest
      .spyOn(EmailVerificationUtils, "sendVerificationEmail")
      .mockResolvedValue();

    await registerVendorRequest(validReq);

    expect(EmailVerificationUtils.sendVerificationEmail).toHaveBeenCalled();
  });
});
