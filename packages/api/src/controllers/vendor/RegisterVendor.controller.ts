import { RegisterVendor } from "@project-utk/shared/src/api/routes/vendor/RegisterVendor";
import { Controller } from "../../Controller";
import { validateRegisterVendorInput } from "@project-utk/shared/src/schemas/vendor/registerVendorSchema";

const controller = new Controller<
  RegisterVendor.ReqBody,
  RegisterVendor.ResBody,
  {},
  typeof RegisterVendor.Errors
>(RegisterVendor.Errors);

export const RegisterVendorController = controller.handler(
  async (req, res, errors) => {
    const { email, password, name } = req.body;

    await validateRegisterVendorInput(req.body);

    // Check if email already exists
    const emailExists = true;
    if (emailExists) {
      throw errors.EMAIL_ALREADY_EXISTS();
    }

    // Create vendor
    const vendorId = "1";

    return res.json({ vendorId });
  }
);
