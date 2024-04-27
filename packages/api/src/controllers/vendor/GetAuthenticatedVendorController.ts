import { GetAuthenticatedVendor } from "@project-utk/shared/src/api/routes/vendor/GetAuthenticatedVendor";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";

const controller = new Controller<
  GetAuthenticatedVendor.ReqBody,
  GetAuthenticatedVendor.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof GetAuthenticatedVendor.Errors
>(GetAuthenticatedVendor.Errors);

export const GetAuthenticatedVendorController = controller.handler(
  async (req, res, errors) => {
    const { vendor } = res.locals;

    return res.json(vendor.toPublicJSON()).end();
  }
);
