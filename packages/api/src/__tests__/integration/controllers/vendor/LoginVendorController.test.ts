import { LoginVendor } from "@project-utk/shared/src/api/routes";
import { VendorTestUtils } from "../../../../utils/testUtils/VendorTestUtils";

const testEmail = VendorTestUtils.getTestEmail("vendor.login");

const invalidCredentialsCode = LoginVendor.Errors.INVALID_CREDENTIALS.code;
const invalidInputCode = LoginVendor.Errors.INVALID_INPUT.code;

describe("Login Vendor Endpoint", () => {
  beforeEach(async () => {
    await VendorTestUtils.createTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  it("should return a new vendor id after successful login", async () => {
    const res = await VendorTestUtils.loginTestVendor({ email: testEmail });
    expect(res.body.vendorId).toBeDefined();
  });

  it("should reject login attempts with incorrect passwords", async () => {
    const res = await VendorTestUtils.loginTestVendor({
      email: testEmail,
      password: VendorTestUtils.incorrectPassword,
    });
    expect(res.body.errCode).toBe(invalidCredentialsCode);
  });

  it("should reject logins with non-existent emails", async () => {
    const res = await VendorTestUtils.loginTestVendor({
      email: "incorrect@example.com",
    });
    expect(res.body.errCode).toBe(invalidCredentialsCode);
  });

  it("should reject logins with invalid email formats", async () => {
    const res = await VendorTestUtils.loginTestVendor({
      email: VendorTestUtils.invalidEmail,
    });
    expect(res.body.errCode).toBe(invalidInputCode);
  });

  it("should return a JWT on successful login", async () => {
    const res = await VendorTestUtils.loginTestVendor({ email: testEmail });
    expect(VendorTestUtils.getJWTFromHeader(res.header)).toBeDefined();
  });
});
