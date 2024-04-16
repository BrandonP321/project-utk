import { LoginVendor } from "@project-utk/shared/src/api/routes";
import { TestUtils } from "../../../../utils/testUtils";
import { VendorTestUtils } from "../../../../utils/testUtils/VendorTestUtils";

const loginVendorRequest = TestUtils.getRequestFunc<
  LoginVendor.ReqBody,
  LoginVendor.ResBody,
  typeof LoginVendor.Errors
>(LoginVendor.Path);

const testEmail = VendorTestUtils.getTestEmail("vendor.login");

const validReq: LoginVendor.ReqBody = {
  email: testEmail,
  password: VendorTestUtils.validPassword,
};

const invalidReq: LoginVendor.ReqBody = {
  email: VendorTestUtils.invalidEmail,
  password: VendorTestUtils.invalidPassword,
};

describe("Login Vendor Endpoint", () => {
  beforeEach(async () => {
    await VendorTestUtils.createTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  it("should return a new vendor id after successful login", async () => {
    const res = await loginVendorRequest(validReq);
    expect(res.body.vendorId).toBeDefined();
  });

  it("should reject login attempts with incorrect passwords", async () => {
    const res = await loginVendorRequest({
      email: testEmail,
      password: "WrongPassword123!",
    });
    expect(res.body.errCode).toBe(LoginVendor.Errors.INVALID_CREDENTIALS.code);
  });

  it("should reject logins with non-existent emails", async () => {
    const res = await loginVendorRequest({
      email: "some-non-existent-email@email.com",
      password: VendorTestUtils.validPassword,
    });
    expect(res.body.errCode).toBe(LoginVendor.Errors.INVALID_CREDENTIALS.code);
  });

  it("should reject logins with invalid email formats", async () => {
    const res = await loginVendorRequest(invalidReq);
    expect(res.body.errCode).toBe(LoginVendor.Errors.INVALID_INPUT.code);
  });

  it("should return a JWT on successful login", async () => {
    const res = await loginVendorRequest(validReq);
    expect(VendorTestUtils.getJWTFromHeader(res.header)).toBeDefined();
  });
});
