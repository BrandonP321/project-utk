import * as yup from "yup";
import { SchemaUtils } from "../../utils";
import { UpdateVendor } from "../../api/routes/vendor/UpdateVendor";

export const updateVendorSchema = yup.object().shape({
  name: yup.string().name(),
});

export const validateAndFilterUpdateVendorInput =
  SchemaUtils.getValidationAndFilterFunc<UpdateVendor.ReqBody>(
    updateVendorSchema
  );
