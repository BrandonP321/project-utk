import { JWTUtils } from "../../utils";
import { Controller } from "../../utils/Controller";
import { UpdateVendorEmail } from "@project-utk/shared/src/api/routes/vendor/UpdateVendorEmail";
import { VendorEmailUpdateUtils } from "../../utils/VendorEmailUpdateUtils";
import Vendor from "../../models/vendor/Vendor";
import { APIError } from "@project-utk/shared/src/api/errors/APIError";

const controller = new Controller<
  UpdateVendorEmail.ReqBody,
  UpdateVendorEmail.ResBody,
  {},
  {},
  typeof UpdateVendorEmail.Errors
>(UpdateVendorEmail.Errors);

export const UpdateVendorEmailController = controller.handler(
  async (req, res, errors) => {
    const { token } = req.body;

    if (!token) {
      throw errors.INVALID_LINK();
    }

    try {
      const { vendorId, newEmail } = VendorEmailUpdateUtils.verifyToken(token);

      const existingVendor = await Vendor.findByEmail(newEmail);
      if (existingVendor) {
        throw errors.EMAIL_TAKEN();
      }

      const vendor = await Vendor.findByPk(vendorId);

      if (!vendor || vendor.emailUpdateToken !== token) {
        throw errors.INVALID_LINK();
      }

      const isCorrectPassword = await vendor.validatePassword(
        req.body.password,
      );
      if (!isCorrectPassword) {
        throw errors.INVALID_PASSWORD();
      }

      // Update email and ensure it is flagged as verified
      await vendor.update({
        email: newEmail,
        emailUpdateToken: null,
        isEmailVerified: true,
      });

      return res.json({}).end();
    } catch (err) {
      if (JWTUtils.isExpiredError(err)) {
        throw errors.LINK_EXPIRED();
      } else if (err instanceof APIError) {
        throw err;
      } else {
        throw errors.INVALID_LINK();
      }
    }
  },
);
