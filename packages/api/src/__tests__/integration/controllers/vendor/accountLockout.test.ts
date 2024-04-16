import { LoginVendor } from "@project-utk/shared/src/api/routes";
import { VendorTestUtils } from "../../../../utils/testUtils/VendorTestUtils";
import { apiConfig } from "../../../../config";
import { Helpers } from "@project-utk/shared/src/utils";

const testEmail = VendorTestUtils.getTestEmail("vendor.account.lockout");
const loginAttemptLimit = apiConfig.vendor.auth.loginAttemptLimit;
const lockoutDurationMs = apiConfig.vendor.auth.accountLockoutDurationMs;

const attemptInvalidLogin = () =>
  VendorTestUtils.loginTestVendor(testEmail, VendorTestUtils.incorrectPassword);

const attemptValidLogin = () =>
  VendorTestUtils.loginTestVendor(testEmail, VendorTestUtils.correctPassword);

const lockAcount = async () => {
  for (let i = 0; i < loginAttemptLimit; i++) {
    await attemptInvalidLogin();
  }
};

const accountLockoutCode = LoginVendor.Errors.ACCOUNT_LOCKED.code;

describe("Account Lockout", () => {
  beforeEach(async () => {
    await VendorTestUtils.createTestVendor(testEmail);
    await lockAcount();
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  it(`should lock the account after ${loginAttemptLimit} failed login attempts`, async () => {
    // 6th login attempt should fail
    const res = await attemptInvalidLogin();

    expect(res.body.errCode).toBe(accountLockoutCode);
  });

  it("should prevent login with correct credentials after account is locked", async () => {
    const res = await attemptValidLogin();

    expect(res.body.errCode).toBe(accountLockoutCode);
  });

  it(`should unlock the account after ${lockoutDurationMs}ms`, async () => {
    // Wait for lockout duration
    await Helpers.wait(lockoutDurationMs + 500);

    const res = await attemptValidLogin();

    expect(res.body.vendorId).toBeDefined();
  });

  // it("should still allow password reset operations for locked accounts", async () => {});

  // it("should reset the failed attempts counter after a successful password reset", async () => {});
});
