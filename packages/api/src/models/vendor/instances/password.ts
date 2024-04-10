import bcrypt from "bcrypt";
import Vendor from "../Vendor";

function validatePassword(this: Vendor, password: string) {
  return bcrypt.compare(password, this.password);
}

export const passwordInstanceMethods = {
  validatePassword,
};
