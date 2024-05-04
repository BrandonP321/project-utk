import { SendVendorVerificationEmail } from "@project-utk/shared/src/api/routes/vendor/SendVendorVerificationEmail";
import { Controller } from "../../utils/Controller";
import { AuthVendorLocals } from "../../middleware/getAuthVendor.middleware";
import { EmailVerificationUtils } from "../../utils/EmailVerificationUtils";
import { VendorJWTLocals } from "../../middleware/authenticateJWT.middleware";

const controller = new Controller<
  SendVendorVerificationEmail.ReqBody,
  SendVendorVerificationEmail.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof SendVendorVerificationEmail.Errors
>(SendVendorVerificationEmail.Errors);

export const sendVendorVerificationEmailController = controller.handler(
  async (req, res) => {
    await EmailVerificationUtils.sendVerificationEmail(
      res.locals.vendor,
      req.headers.referer!,
    );

    return res.json({}).end();
  },
);
