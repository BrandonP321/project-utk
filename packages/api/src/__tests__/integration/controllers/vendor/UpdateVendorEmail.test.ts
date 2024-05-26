import { UpdateVendorEmail } from "@project-utk/shared/src/api/routes/vendor/UpdateVendorEmail";
import { TAgent, TestUtils, VendorTestUtils } from "../../../utils/";
import { RequestVendorEmailUpdate } from "@project-utk/shared/src/api/routes/vendor/RequestVendorEmailUpdate";

const testEmail = VendorTestUtils.getTestEmail("vendor.email.update");
const updatedEmail = VendorTestUtils.getTestEmail(
  "vendor.email.update.updated",
);

const updateVendorEmailReq = TestUtils.getRequestFunc<
  UpdateVendorEmail.ReqBody,
  UpdateVendorEmail.ResBody,
  typeof UpdateVendorEmail.Errors
>(UpdateVendorEmail.Path);

const getValidReq = (token: string): UpdateVendorEmail.ReqBody => ({
  password: VendorTestUtils.correctPassword,
  token,
});

const getInvalidInputReq = (token: string): UpdateVendorEmail.ReqBody => ({
  password: VendorTestUtils.incorrectPassword,
  token,
});

const invalidTokenReq: UpdateVendorEmail.ReqBody = {
  password: VendorTestUtils.correctPassword,
  token: "asdf",
};

describe("Update vendor email endpoint", () => {
  let agent: TAgent;

  const requestValidEmailUpdate = (token: string) =>
    updateVendorEmailReq(getValidReq(token), agent);

  const requestInvalidPasswordEmailUpdate = (token: string) =>
    updateVendorEmailReq(getInvalidInputReq(token), agent);

  const requestInvalidTokenEmailUpdate = () =>
    updateVendorEmailReq(invalidTokenReq, agent);

  beforeEach(async () => {
    agent = await VendorTestUtils.createAndLoginTestVendor(testEmail);
    await VendorTestUtils.verifyVendorEmail(testEmail);
    await TestUtils.request<
      RequestVendorEmailUpdate.ReqBody,
      RequestVendorEmailUpdate.ResBody
    >(RequestVendorEmailUpdate.Path, { email: updatedEmail }, agent);
  });

  afterEach(async () => {
    await VendorTestUtils.deleteTestVendor(testEmail);
    await VendorTestUtils.deleteTestVendor(updatedEmail);
  });

  it("should update the vendor's email if the email is not already in use", async () => {
    const vendor = await VendorTestUtils.getTestVendor(testEmail);
    await requestValidEmailUpdate(vendor!.emailUpdateToken!);

    const updatedVendor = await VendorTestUtils.getTestVendor(updatedEmail);

    expect(updatedVendor.email).toBe(updatedEmail);
  });

  it("should not update the vendor's email if the password is incorrect", async () => {
    const vendor = await VendorTestUtils.getTestVendor(testEmail);
    const res = await requestInvalidPasswordEmailUpdate(
      vendor!.emailUpdateToken!,
    );

    expect(res.body.errCode).toBe(
      UpdateVendorEmail.Errors.INVALID_PASSWORD.code,
    );
  });

  it("should flag the new email as verified", async () => {
    const vendor = await VendorTestUtils.getTestVendor(testEmail);
    await requestValidEmailUpdate(vendor!.emailUpdateToken!);

    const updatedVendor = await VendorTestUtils.getTestVendor(updatedEmail);

    expect(updatedVendor.isEmailVerified).toBe(true);
  });

  it("should not update the email if the token is invalid", async () => {
    const res = await requestInvalidTokenEmailUpdate();

    expect(res.body.errCode).toBe(UpdateVendorEmail.Errors.INVALID_LINK.code);
  });

  it("should not update the email if the email is already in use", async () => {
    await VendorTestUtils.createTestVendor(updatedEmail);

    const vendor = await VendorTestUtils.getTestVendor(testEmail);
    const res = await requestValidEmailUpdate(vendor!.emailUpdateToken!);

    expect(res.body.errCode).toBe(UpdateVendorEmail.Errors.EMAIL_TAKEN.code);
  });
});
