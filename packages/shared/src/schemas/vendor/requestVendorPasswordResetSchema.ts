import * as yup from "yup";
import { SchemaUtils } from "../../utils/SchemaUtils";
import { RequestVendorPasswordReset } from "../../api/routes/vendor/RequestVendorPasswordReset";

export const requestVendorPasswordResetSchema = yup.object().shape({
  email: yup.string().requiredWithEmailMsg().customEmail(),
});

export const validateRequestVendorPasswordResetInput =
  SchemaUtils.getValidationFunc<RequestVendorPasswordReset.ReqBody>(
    requestVendorPasswordResetSchema
  );

export const validateAndFilterRequestVendorPasswordResetInput =
  SchemaUtils.getValidationAndFilterFunc<RequestVendorPasswordReset.ReqBody>(
    requestVendorPasswordResetSchema
  );
