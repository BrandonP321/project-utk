import { StringSchema, AnyObject } from "yup";

type RequiredReturnType = StringSchema<string, AnyObject, undefined, "">;

declare module "yup" {
  interface StringSchema {
    // Vendor
    customEmail(): this;
    requiredWithEmailMsg(): RequiredReturnType;

    password(): RequiredReturnType;
    requiredWithPasswordMsg(): RequiredReturnType;
    confirmPassword(): RequiredReturnType;

    name(): this;
    requiredWithNameMsg(): RequiredReturnType;

    // Listing
    listingName<R extends boolean>(
      required?: R
    ): R extends true ? RequiredReturnType : this;

    // Other
    optionallyRequired<R extends boolean>(
      required: R,
      msg: string
    ): R extends true ? RequiredReturnType : this;
  }
}

export {};
