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

    if (!vendor) {
      throw errors.INVALID_CREDENTIALS();
    }

    if (vendor.isAccountLocked()) {
      throw errors.ACCOUNT_LOCKED();
    } else if (vendor.isAccountReadyForUnlock()) {
      await vendor.resetFailedLoginAttempts();
    }

    if (!isCorrectPassword) {
      vendor.incrementFailedLoginAttempts();

      if (vendor.hasReachedLoginAttemptLimit()) {
        await vendor.lockAccount();
        throw errors.ACCOUNT_LOCKED();
      }

      await vendor.save();
      throw errors.INVALID_CREDENTIALS();
    }

    // Generate and set tokens
    await JWTUtils.generateAndSetVendorTokens(res, vendor.id);

    // Reset failed login attempts and lockUntil on successful login
    await vendor.resetFailedLoginAttempts();

    return res.json({ vendorId: vendor.id });
  }
);
