import { TupleUnion, TypedExtract, TypedOmit } from "../../../utils";
import { PricingOptionGroupIdForeignKey } from "../PricingOptionGroup/IPricingOptionGroup";

type PricingOptionGroupIdFK = typeof PricingOptionGroupIdForeignKey;

export type PricingOptionBaseProperties = {
  [key in PricingOptionGroupIdFK]: string;
} & {
  label: string;
  price: number;
  min: number | null;
  max: number | null;
  unit: string | null;
};

export type PricingOptionCreationAttributes = Pick<
  PricingOptionBaseProperties,
  PricingOptionGroupIdFK | "label" | "price"
>;

export interface IPricingOption extends PricingOptionBaseProperties {
  id: string;
}

export type SensitivePricingOptionProperties = TypedExtract<
  keyof IPricingOption,
  PricingOptionGroupIdFK
>;

export type PublicPricingOptionProperties = TypedOmit<
  IPricingOption,
  SensitivePricingOptionProperties
>;

export const PricingOptionPublicProps: TupleUnion<
  keyof PublicPricingOptionProperties
> = ["id", "label", "price", "min", "max", "unit"];

export namespace PricingOptionAPI {
  export type CreateRequest = TypedOmit<PricingOptionBaseProperties, "groupId">;

  export type CreateResponse = {
    optionId: string;
  };

  export type UpdateRequest = Partial<CreateRequest>;

  export type UpdateResponse = {
    optionId: string;
  };

  export const PopulatedQueryResponseKey = "pricingOptions";
}
