import { LoginVendor } from "@project-utk/shared/src/api/routes/vendor/LoginVendor";
import { Controller } from "../../utils/Controller";
import { validateAndFilterLoginVendorInput } from "@project-utk/shared/src/schemas/vendor/loginVendorSchema";
import Vendor from "../../models/vendor/Vendor";
import { JWTUtils } from "../../utils/JWTUtils";

const controller = new Controller<
  LoginVendor.ReqBody,
  LoginVendor.ResBody,
  {},
  {},
  typeof LoginVendor.Errors
>(LoginVendor.Errors);

export const LoginVendorController = controller.handler(
  async (req, res, errors) => {
    req.body = await validateAndFilterLoginVendorInput(req.body);

    const vendor = await Vendor.findByEmail(req.body.email);
    const isCorrectPassword = await vendor?.validatePassword(req.body.password);

    // Respond with generic error message to avoid leaking information
    if (!vendor || !isCorrectPassword) {
      throw errors.INVALID_CREDENTIALS();
    }

    // Generate and set tokens
    await JWTUtils.generateAndSetVendorTokens(res, vendor.id);

    return res.json({ vendorId: vendor.id });
  }
);
