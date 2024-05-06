import { RequestVendorEmailUpdate } from "@project-utk/shared/src/api/routes/vendor/RequestVendorEmailUpdate";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import Vendor from "../../models/vendor/Vendor";
import { VendorEmailUpdateUtils } from "../../utils/VendorEmailUpdateUtils";
import { validateRequestVendorEmailUpdateInput } from "@project-utk/shared/src/schemas/vendor/requestVendorEmailUpdateSchema";

const controller = new Controller<
  RequestVendorEmailUpdate.ReqBody,
  RequestVendorEmailUpdate.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof RequestVendorEmailUpdate.Errors
>(RequestVendorEmailUpdate.Errors);

export const RequestVendorEmailUpdateController = controller.handler(
  async (req, res, errors) => {
    const { vendor } = res.locals;

    req.body = await validateRequestVendorEmailUpdateInput(req.body);

    // Ensure email is not already in use
    const existingVendor = await Vendor.findByEmail(req.body.email);
    if (existingVendor) {
      throw errors.EMAIL_TAKEN();
    }

    if (vendor.isEmailVerified) {
      // Send email to new email address
      await VendorEmailUpdateUtils.sendEmail(
        vendor,
        req.body.email,
        req.headers.referer!,
      );
    } else {
      // Update email instantly
      await vendor.update({ email: req.body.email });
    }

    return res.json({ updated: !vendor.isEmailVerified }).end();
  },
);
