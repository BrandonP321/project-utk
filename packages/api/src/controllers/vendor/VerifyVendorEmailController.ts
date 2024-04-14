import { VerifyVendorEmail } from "@project-utk/shared/src/api/routes/vendor/VerifyVendorEmail";
import { Controller } from "../../utils/Controller";
import { EmailVerificationUtils } from "../../utils/EmailVerificationUtils";
import Vendor from "../../models/vendor/Vendor";
import { JWTUtils } from "../../utils/JWTUtils";

const controller = new Controller<
  VerifyVendorEmail.ReqBody,
  VerifyVendorEmail.ResBody,
  {},
  {},
  typeof VerifyVendorEmail.Errors
>(VerifyVendorEmail.Errors);

export const VerifyVendorEmailController = controller.handler(
  async (req, res, errors) => {
    const { token } = req.body;

    if (!token) {
      throw errors.INVALID_LINK();
    }

    try {
      const { vendorId } = EmailVerificationUtils.verifyToken(token);

      const vendor = await Vendor.findByPk(vendorId);

      if (vendor?.isEmailVerified) {
        throw errors.EMAIL_ALREADY_VERIFIED();
      } else if (!vendor || vendor.emailVerificationToken !== token) {
        throw errors.INVALID_LINK();
      }

      await vendor.update({
        isEmailVerified: true,
        emailVerificationToken: null,
      });

      return res.json({ vendorId }).end();
    } catch (err) {
      throw JWTUtils.isExpiredError(err)
        ? errors.LINK_EXPIRED()
        : errors.INVALID_LINK();
    }
  }
);
