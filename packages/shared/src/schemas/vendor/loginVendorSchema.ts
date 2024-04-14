import * as yup from "yup";
import { SchemaUtils } from "../../utils/SchemaUtils";
import { LoginVendor } from "../../api/routes/vendor/LoginVendor";

export const loginVendorSchema = yup.object().shape({
  email: yup.string().requiredWithEmailMsg().customEmail(),
  password: yup.string().requiredWithPasswordMsg(),
});

export const validateLoginVendorInput =
  SchemaUtils.getValidationFunc<LoginVendor.ReqBody>(loginVendorSchema);

export const validateAndFilterLoginVendorInput =
  SchemaUtils.getValidationAndFilterFunc<LoginVendor.ReqBody>(
    loginVendorSchema
  );
