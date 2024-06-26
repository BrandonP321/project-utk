import { SendVendorVerificationEmail } from "@project-utk/shared/src/api/routes";
import { EmailVerificationUtils } from "../../../../utils";
import { VendorTestUtils, TAgent, TestUtils } from "../../../utils/";

const testEmail = VendorTestUtils.getTestEmail(
  "vendor.email.verification.send",
);

describe("Endpoint to send vendor email verification email", () => {
  let agent: TAgent;

  const sendEmailRequest = () =>
    TestUtils.request(SendVendorVerificationEmail.Path, {}, agent);

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
  });

  TestUtils.itShouldRequireAuth(sendEmailRequest, (a) => (agent = a));

  it("should send a verification email", async () => {
    jest
      .spyOn(EmailVerificationUtils, "sendVerificationEmail")
      .mockResolvedValue();

    await sendEmailRequest();

    expect(EmailVerificationUtils.sendVerificationEmail).toHaveBeenCalled();
  });
});
