import * as yup from "yup";
import { SchemaUtils } from "../../utils/SchemaUtils";
import { RequestVendorEmailUpdate } from "../../api/routes/vendor/RequestVendorEmailUpdate";

export const requestVendorEmailUpdateSchema = yup.object().shape({
  email: yup.string().customEmail().requiredWithEmailMsg(),
});

export const validateRequestVendorEmailUpdateInput =
  SchemaUtils.getValidationFunc<RequestVendorEmailUpdate.ReqBody>(
    requestVendorEmailUpdateSchema,
  );

export const validateAndFilterRequestVendorEmailUpdateInput =
  SchemaUtils.getValidationAndFilterFunc<RequestVendorEmailUpdate.ReqBody>(
    requestVendorEmailUpdateSchema,
  );
