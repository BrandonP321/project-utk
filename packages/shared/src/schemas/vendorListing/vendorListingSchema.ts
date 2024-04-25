import * as yup from "yup";
import { SchemaUtils } from "../../utils/SchemaUtils";
import { CreateVendorListing } from "../../api/routes/vendorListing/CreateVendorListing";

export function vendorListingSchema<R extends boolean>(allPropsOptional: R) {
  return yup.object().shape({
    name: yup.string().listingName(allPropsOptional),
  });
}

export const vendorListingCreationSchema = vendorListingSchema(true);
export const vendorListingUpdateSchema = vendorListingSchema(false);

export const validateCreateVendorListingInput =
  SchemaUtils.getValidationFunc<CreateVendorListing.ReqBody>(
    vendorListingCreationSchema
  );

export const validateAndFilterCreateVendorListingInput =
  SchemaUtils.getValidationAndFilterFunc<CreateVendorListing.ReqBody>(
    vendorListingCreationSchema
  );
