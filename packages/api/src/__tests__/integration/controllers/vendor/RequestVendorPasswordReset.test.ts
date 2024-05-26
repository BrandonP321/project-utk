import { RequestVendorPasswordReset } from "@project-utk/shared/src/api/routes";
import { PasswordResetUtils } from "../../../../utils";
import { TestUtils, VendorTestUtils } from "../../../utils/";

const testEmail = VendorTestUtils.getTestEmail("vendor.request.password.reset");

describe("Endpoint to send vendor password reset email", () => {
  const sendEmailRequest = () =>
    TestUtils.request<
      RequestVendorPasswordReset.ReqBody,
      RequestVendorPasswordReset.ResBody
    >(RequestVendorPasswordReset.Path, { email: testEmail });

  beforeEach(async () => {
    await VendorTestUtils.createTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  it("should send a password reset email", async () => {
    jest.spyOn(PasswordResetUtils, "sendResetEmail").mockResolvedValue();

    await sendEmailRequest();

    expect(PasswordResetUtils.sendResetEmail).toHaveBeenCalled();
  });
});
