import { LogoutVendor } from "@project-utk/shared/src/api/routes/vendor/LogoutVendor";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import { Controller, JWTUtils } from "../../utils";

const controller = new Controller<
  LogoutVendor.ReqBody,
  LogoutVendor.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof LogoutVendor.Errors
>(LogoutVendor.Errors);

export const LogoutVendorController = controller.handler(
  async (req, res, errors) => {
    const { vendor } = res.locals;

    JWTUtils.removeJWTCookie(res);
    await vendor.update({ refreshToken: null });

    return res.json({}).end();
  }
);
