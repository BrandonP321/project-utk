import { RequestVendorPasswordReset } from "@project-utk/shared/src/api/routes/vendor/RequestVendorPasswordReset";
import { Controller } from "../../utils/Controller";
import Vendor from "../../models/vendor/Vendor";
import { validateAndFilterRequestVendorPasswordResetInput } from "@project-utk/shared/src/schemas/vendor/requestVendorPasswordResetSchema";
import { PasswordResetUtils } from "../../utils/PasswordResetUtils";
import { noop } from "lodash";

const controller = new Controller<
  RequestVendorPasswordReset.ReqBody,
  RequestVendorPasswordReset.ResBody,
  {},
  {},
  typeof RequestVendorPasswordReset.Errors
>(RequestVendorPasswordReset.Errors);

export const RequestVendorPasswordResetController = controller.handler(
  async (req, res) => {
    // And invalid email address should be the only error that can be returned
    req.body = await validateAndFilterRequestVendorPasswordResetInput(req.body);

    try {
      const vendor = await Vendor.findByEmail(req.body.email);

      if (vendor) {
        await PasswordResetUtils.sendResetEmail(vendor, req.headers.referer!);
      }
    } catch (err) {
      // noop on error so we don't leak information
      noop();
    }

    return res.json({}).end();
  },
);
