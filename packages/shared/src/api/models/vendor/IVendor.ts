export type TypedExtract<T, K extends T> = Extract<T, K>;

export interface VendorBaseProperties {
  email: string;
  password: string;
  name: string;
  refreshToken: string | null;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  resetToken: string | null;
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

export type SensitiveVendorProperties = TypedExtract<keyof IVendor, "password">;

export type PublicVendorProperties = Omit<IVendor, SensitiveVendorProperties>;

export namespace VendorAPI {
  export type CreateRequest = VendorBaseProperties;

  export type CreateResponse = { vendorId: string } & VendorBaseProperties;

  export type UpdateRequest = Partial<VendorBaseProperties>;

  export type UpdateResponse = VendorBaseProperties;
}
