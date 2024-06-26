import { TypedExtract } from "../../../utils";

export const VendorIdForeignKey = "vendorId" as const;

export interface VendorBaseProperties {
  email: string;
  password: string;
  name: string;
  refreshToken: string | null;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  resetToken: string | null;
  emailUpdateToken: string | null;
  failedLoginAttempts: number;
  lockUntil: number | null;
}

export type VendorCreationAttributes = Pick<
  VendorBaseProperties,
  "email" | "password" | "name"
>;

export interface IVendor extends VendorBaseProperties {
  id: string;
}

export type SensitiveVendorProperties = TypedExtract<
  keyof IVendor,
  | "password"
  | "emailVerificationToken"
  | "failedLoginAttempts"
  | "lockUntil"
  | "refreshToken"
  | "resetToken"
  | "emailUpdateToken"
>;

export type PublicVendorProperties = Omit<IVendor, SensitiveVendorProperties>;

export type UpdatableVendorProperties = TypedExtract<
  keyof PublicVendorProperties,
  "name"
>;

export namespace VendorAPI {
  export type CreateRequest = VendorBaseProperties;

  export type CreateResponse = { vendorId: string } & VendorBaseProperties;

  export type UpdateRequest = Partial<
    Pick<PublicVendorProperties, UpdatableVendorProperties>
  >;

  export type UpdateResponse = VendorBaseProperties;
}
