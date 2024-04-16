import { authInstanceMethods } from "./auth";
import { passwordInstanceMethods } from "./password";

export const vendorInstanceMethods = {
  ...passwordInstanceMethods,
  ...authInstanceMethods,
};
