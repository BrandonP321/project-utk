import { vendorBaseSchema } from "./vendorBaseSchema";
import { SchemaUtils } from "../../utils/SchemaUtils";
import { RegisterVendor } from "../../api/routes/vendor/RegisterVendor";

export const registerVendorSchema = vendorBaseSchema.shape({});

export const validateRegisterVendorInput =
  SchemaUtils.getValidationFunc<RegisterVendor.ReqBody>(registerVendorSchema);

export const validateAndFilterRegisterVendorInput =
  SchemaUtils.getValidationAndFilterFunc<RegisterVendor.ReqBody>(
    registerVendorSchema
  );
