import { TupleUnion, TypedExtract, TypedOmit } from "../../../utils";
import {
  IPricingOption,
  PricingOptionAPI,
} from "../PricingOption/IPricingOption";
import { VendorListingIdForeignKey } from "../vendorListing/IVendorListing";

export const PricingOptionGroupIdForeignKey = "groupId" as const;

type ListingIdFK = typeof VendorListingIdForeignKey;

export type PricingOptionGroupBaseProperties = {
  [key in ListingIdFK]: string;
} & {
  groupType: string;
  groupLabel: string;
  isLive: boolean;
};

export type PricingOptionGroupCreationAttributes = Pick<
  PricingOptionGroupBaseProperties,
  ListingIdFK | "groupType" | "groupLabel" | "isLive"
>;

export interface IPricingOptionGroup extends PricingOptionGroupBaseProperties {
  id: string;
}

export type SensitivePricingOptionGroupProperties = TypedExtract<
  keyof IPricingOptionGroup,
  ListingIdFK | "isLive"
>;

export type PublicPricingOptionGroupProperties = TypedOmit<
  IPricingOptionGroup,
  SensitivePricingOptionGroupProperties
>;

export const PricingOptionGroupPublicProps: TupleUnion<
  keyof PublicPricingOptionGroupProperties
> = ["id", "groupType", "groupLabel"];

export namespace PricingOptionGroupAPI {
  export type CreateRequest = TypedOmit<
    PricingOptionGroupBaseProperties,
    ListingIdFK | "isLive"
  > & {
    [PricingOptionAPI.PopulatedQueryResponseKey]: PricingOptionAPI.CreateRequest[];
  };

  export type CreateResponse = {
    groupId: string;
  };

  export type UpdateRequest = Partial<CreateRequest>;

  export type UpdateResponse = {
    groupId: string;
  };

  export type PopulatedResponse = IPricingOptionGroup & {
    [PricingOptionAPI.PopulatedQueryResponseKey]: IPricingOption[];
  };

  export type PopulatedResponseList = PopulatedResponse[];

  export const PopulatedQueryResponseKey = "pricingOptionGroups";
}
