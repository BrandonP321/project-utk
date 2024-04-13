import { RegisterVendor } from "@project-utk/shared/src/api/routes/vendor/RegisterVendor";
import { Controller } from "../../Controller";
import { validateRegisterVendorInput } from "@project-utk/shared/src/schemas/vendor/registerVendorSchema";
import { ObjectUtils } from "@project-utk/shared/src/utils/ObjectUtils";
import Vendor from "../../models/vendor/Vendor";

const controller = new Controller<
  RegisterVendor.ReqBody,
  RegisterVendor.ResBody,
  {},
  typeof RegisterVendor.Errors
>(RegisterVendor.Errors);

const allowedProps: (keyof RegisterVendor.ReqBody)[] = [
  "email",
  "password",
  "name",
];

export const RegisterVendorController = controller.handler(
  async (req, res, errors) => {
    // Extract body
    const body = ObjectUtils.filterProps(req.body, allowedProps);

    // Validate input
    await validateRegisterVendorInput(body);

    body.email = body.email.toLowerCase().trim();

    // Check if email already exists
    const emailExists = await Vendor.findByEmail(body.email);
    if (emailExists) {
      throw errors.EMAIL_ALREADY_EXISTS();
    }

    // Create vendor
    const newVendor = await Vendor.create(body);

    return res.json({ vendorId: newVendor.id });
  }
);
