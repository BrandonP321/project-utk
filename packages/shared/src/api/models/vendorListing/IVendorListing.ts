import { TupleUnion, TypedExtract, TypedOmit } from "../../../utils";
import { VendorIdForeignKey } from "../vendor/IVendor";

export const VendorListingIdForeignKey = "listingId" as const;

type VendorIdFK = typeof VendorIdForeignKey;

export type VendorListingBaseProperties = {
  [key in VendorIdFK]: string;
} & {
  name: string;
};

export type VendorListingCreationAttributes = Pick<
  VendorListingBaseProperties,
  VendorIdFK | "name"
>;

export interface IVendorListing extends VendorListingBaseProperties {
  id: string;
}

export type SensitiveVendorListingProperties = TypedExtract<
  keyof IVendorListing,
  VendorIdFK
>;

export type PublicVendorListingProperties = Omit<
  IVendorListing,
  SensitiveVendorListingProperties
>;

export const VendorListingPublicProps: TupleUnion<
  keyof PublicVendorListingProperties
> = ["id", "name"];

export namespace VendorListingAPI {
  export type CreateRequest = TypedOmit<
    VendorListingBaseProperties,
    VendorIdFK
  >;

  export type CreateResponse = {
    listingId: string;
  };

  export type UpdateRequest = Partial<CreateRequest>;

  export type UpdateResponse = {
    listingId: string;
  };

  export const PopulatedQueryResponseKey = "listings";

  type AllKeysOfPublicVendorListingProperties = {
    [K in keyof PublicVendorListingProperties]: K;
  }[keyof PublicVendorListingProperties][];

  export const publicVendorListingProperties: AllKeysOfPublicVendorListingProperties =
    [];
}
