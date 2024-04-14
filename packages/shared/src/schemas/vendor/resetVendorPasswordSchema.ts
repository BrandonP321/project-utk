import * as yup from "yup";
import { SchemaUtils } from "../../utils/SchemaUtils";
import { ResetVendorPassword } from "../../api/routes/vendor/ResetVendorPassword";

export const resetVendorPasswordSchema = yup.object().shape({
  password: yup.string().requiredWithPasswordMsg().password(),
  confirmPassword: yup.string().confirmPassword(),
});

type ReqBody = Pick<
  ResetVendorPassword.ReqBody,
  "password" | "confirmPassword"
>;

export const validateResetVendorPasswordInput =
  SchemaUtils.getValidationFunc<ReqBody>(resetVendorPasswordSchema);
