import { RequestVendorEmailUpdate } from "@project-utk/shared/src/api/routes/vendor/RequestVendorEmailUpdate";
import { TAgent, TestUtils, VendorTestUtils } from "../../../utils/";
import { VendorEmailUpdateUtils } from "../../../../utils/VendorEmailUpdateUtils";

const testEmail = VendorTestUtils.getTestEmail("vendor.email.update.request");
const updatedEmail = VendorTestUtils.getTestEmail("vendor.email.updated");

const requestEmailUpdateReq = TestUtils.getRequestFunc<
  RequestVendorEmailUpdate.ReqBody,
  RequestVendorEmailUpdate.ResBody,
  typeof RequestVendorEmailUpdate.Errors
>(RequestVendorEmailUpdate.Path);

const validReq: RequestVendorEmailUpdate.ReqBody = {
  email: updatedEmail,
};

const invalidReq: RequestVendorEmailUpdate.ReqBody = {
  email: VendorTestUtils.invalidEmail,
};

describe("Request vendor email update endpoint", () => {
  let agent: TAgent;

  const requestValidEmailUpdate = () => requestEmailUpdateReq(validReq, agent);

  const requestInvalidEmailUpdate = () =>
    requestEmailUpdateReq(invalidReq, agent);

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
    await VendorTestUtils.deleteTestVendor(updatedEmail);
  });

  TestUtils.itShouldRequireAuth(requestValidEmailUpdate, (a) => (agent = a));
  TestUtils.itShouldRejectInvalidInput(requestInvalidEmailUpdate);

  it("should update the vendor's email if the email is not already in use and email is not verified", async () => {
    const res = await requestValidEmailUpdate();

    expect(res.body.updated).toBe(true);
  });

  it("should not update email or send email if the email is already in use", async () => {
    await VendorTestUtils.createTestVendor(updatedEmail);

    const res = await requestValidEmailUpdate();
    const vendor = await VendorTestUtils.getTestVendor(testEmail);

    expect(res.body.errCode).toBe(
      RequestVendorEmailUpdate.Errors.EMAIL_TAKEN.code,
    );
    expect(vendor!.email).toBe(testEmail);
  });

  it("Should send an email to the new email address if current email is verified", async () => {
    jest.spyOn(VendorEmailUpdateUtils, "sendEmail").mockResolvedValue();

    await VendorTestUtils.verifyVendorEmail(testEmail);
    await requestValidEmailUpdate();

    const vendor = await VendorTestUtils.getTestVendor(testEmail);

    expect(vendor!.emailUpdateToken).toBeDefined();
    expect(VendorEmailUpdateUtils.sendEmail).toHaveBeenCalled();
  });
});
