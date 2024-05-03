import * as yup from "yup";
import { SchemaUtils } from "../../utils/SchemaUtils";
import { RequestVendorEmailUpdate } from "../../api/routes/vendor/RequestVendorEmailUpdate";
import { UpdateVendorEmail } from "../../api/routes/vendor/UpdateVendorEmail";

export const updateVendorEmailSchema = yup.object().shape({
  password: yup.string().requiredWithPasswordMsg().password(),
});

type ReqBody = Pick<UpdateVendorEmail.ReqBody, "password">;

export const validateUpdateVendorEmailInput =
  SchemaUtils.getValidationFunc<ReqBody>(updateVendorEmailSchema);

export const validateAndFilterUpdateVendorEmailInput =
  SchemaUtils.getValidationAndFilterFunc<ReqBody>(updateVendorEmailSchema);
