import { ResetVendorPassword } from "@project-utk/shared/src/api/routes/vendor/ResetVendorPassword";
import { Controller } from "../../utils/Controller";
import { PasswordResetUtils } from "../../utils/PasswordResetUtils";
import Vendor from "../../models/vendor/Vendor";
import { validateResetVendorPasswordInput } from "@project-utk/shared/src/schemas/vendor/resetVendorPasswordSchema";
import { JWTUtils } from "../../utils/JWTUtils";

const controller = new Controller<
  ResetVendorPassword.ReqBody,
  ResetVendorPassword.ResBody,
  {},
  {},
  typeof ResetVendorPassword.Errors
>(ResetVendorPassword.Errors);

export const ResetVendorPasswordController = controller.handler(
  async (req, res, errors) => {
    await validateResetVendorPasswordInput(req.body);

    try {
      const { vendorId } = PasswordResetUtils.verifyToken(req.body.token);

      const vendor = await Vendor.findByPk(vendorId);

      if (!vendor || vendor.resetToken !== req.body.token) {
        throw errors.INVALID_LINK();
      }

      try {
        await vendor.update({ resetToken: null, password: req.body.password });
      } catch (err) {
        throw errors.INTERNAL_SERVER_ERROR();
      }

      return res.json({ vendorId }).end();
    } catch (err) {
      throw JWTUtils.isExpiredError(err)
        ? errors.LINK_EXPIRED()
        : errors.INVALID_LINK();
    }
  }
);
