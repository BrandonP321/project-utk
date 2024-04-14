import { StringSchema, AnyObject } from "yup";

type RequiredReturnType = StringSchema<string, AnyObject, undefined, "">;

declare module "yup" {
  interface StringSchema {
    customEmail(): this;
    requiredWithEmailMsg(): RequiredReturnType;

    password(): RequiredReturnType;
    requiredWithPasswordMsg(): RequiredReturnType;
    confirmPassword(): RequiredReturnType;

    name(): this;
    requiredWithNameMsg(): RequiredReturnType;
  }
}

export {};
