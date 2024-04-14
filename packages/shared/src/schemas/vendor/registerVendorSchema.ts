import * as yup from "yup";
import { SchemaUtils } from "../../utils/SchemaUtils";
import { RegisterVendor } from "../../api/routes/vendor/RegisterVendor";

export const registerVendorSchema = yup.object().shape({
  email: yup.string().customEmail().requiredWithEmailMsg(),
  password: yup.string().password(),
  confirmPassword: yup.string().confirmPassword(),
  name: yup.string().requiredWithNameMsg().name(),
});

export const validateRegisterVendorInput =
  SchemaUtils.getValidationFunc<RegisterVendor.ReqBody>(registerVendorSchema);

export const validateAndFilterRegisterVendorInput =
  SchemaUtils.getValidationAndFilterFunc<RegisterVendor.ReqBody>(
    registerVendorSchema
  );
