import { DefaultAPIErrors } from "@project-utk/shared/src/api/routes/routeErrors";
import { Controller } from "../utils/Controller";
import { VendorJWTLocals } from "./authenticateJWT.middleware";
import Vendor from "../models/vendor/Vendor";

export type AuthVendorLocals = {
  vendor: Vendor;
};

const controller = new Controller<
  {},
  {},
  VendorJWTLocals,
  AuthVendorLocals,
  typeof DefaultAPIErrors
>(DefaultAPIErrors);

export const getAuthVendor = controller.handler(
  async (req, res, errors, next) => {
    const { vendorId } = res.locals;

    const vendor = await Vendor.findByPk(vendorId);

    if (!vendor) {
      throw errors.VENDOR_NOT_FOUND();
    }

    next({ vendor });
  }
);
