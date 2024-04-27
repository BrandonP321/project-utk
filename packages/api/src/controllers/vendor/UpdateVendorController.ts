import { UpdateVendor } from "@project-utk/shared/src/api/routes/vendor/UpdateVendor";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import { validateAndFilterUpdateVendorInput } from "@project-utk/shared/src/schemas/vendor/updateVendorSchema";

const controller = new Controller<
  UpdateVendor.ReqBody,
  UpdateVendor.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof UpdateVendor.Errors
>(UpdateVendor.Errors);

export const UpdateVendorController = controller.handler(
  async (req, res, errors) => {
    const { vendor } = res.locals;

    req.body = await validateAndFilterUpdateVendorInput(req.body);

    await vendor.update(req.body);

    return res.json({}).end();
  }
);
