import { RegisterVendor } from "@project-utk/shared/src/api/routes/vendor/RegisterVendor";
import { Controller } from "../../utils/Controller";
import { validateAndFilterRegisterVendorInput } from "@project-utk/shared/src/schemas/vendor/registerVendorSchema";
import Vendor from "../../models/vendor/Vendor";
import { JWTUtils } from "../../utils/JWTUtils";
import { EmailVerificationUtils } from "../../utils/EmailVerificationUtils";

const controller = new Controller<
  RegisterVendor.ReqBody,
  RegisterVendor.ResBody,
  {},
  {},
  typeof RegisterVendor.Errors
>(RegisterVendor.Errors);

export const RegisterVendorController = controller.handler(
  async (req, res, errors) => {
    req.body = await validateAndFilterRegisterVendorInput(req.body);

    // Throw error if email is already in use
    const emailExists = await Vendor.findByEmail(req.body.email);
    if (emailExists) {
      throw errors.EMAIL_ALREADY_EXISTS();
    }

    const newVendor = await Vendor.create(req.body);

    // Create and set JWT
    await JWTUtils.generateAndSetVendorTokens(res, newVendor.id);

    // Send verification email
    await EmailVerificationUtils.sendVerificationEmail(
      newVendor,
      req.headers.referer!,
    );

    return res.json({ vendorId: newVendor.id }).end();
  },
);
