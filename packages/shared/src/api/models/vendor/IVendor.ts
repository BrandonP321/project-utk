export type TypedExtract<T, K extends T> = Extract<T, K>;

export interface VendorBaseProperties {
  email: string;
  password: string;
  name: string;
}

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
