import * as yup from "yup";
import { SchemaUtils } from "../../utils";
import { UpdateVendorListingPricing } from "../../api/routes/vendorListing/UpdateVendorListingPricing";

const pricingOptionShema = yup.object().shape({
  label: yup.string().required(),
  price: yup.number().required(),
  max: yup.number().nullable(),
  min: yup.number().nullable(),
  unit: yup.string().nullable(),
});

const pricingGroupSchema = yup.object().shape({
  groupLabel: yup.string().required(),
  groupType: yup.string().required(),
  pricingOptions: yup
    .array()
    .of(pricingOptionShema)
    .required()
    .test({
      name: "max/min/unit check",
      message: "Max, min, and unit must be provided together",
      test: function (options) {
        const {
          parent: { groupType },
        } = this;

        if (groupType === "number") {
          return options.every(
            (option) =>
              typeof option.max === "number" &&
              typeof option.min === "number" &&
              typeof option.unit === "string"
          );
        }

        return true;
      },
    }),
});

export const pricingGroupsSchema = yup.object().shape({
  pricingGroups: yup.array().of(pricingGroupSchema).required(),
});

type PricingInput = {
  pricingGroups: UpdateVendorListingPricing.ReqBody["pricingGroups"];
};

export const validatePricingGroupsInput =
  SchemaUtils.getValidationFunc<PricingInput>(pricingGroupsSchema as any);
