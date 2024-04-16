import { noop } from "lodash";
import Vendor from "../../models/vendor/Vendor";
import { JWTUtils } from "../JWTUtils";

export class VendorTestUtils {
  static validPassword = "Password123!";
  static invalidPassword = "password";
  static invalidEmail = "testemail.com";

  static getJWTFromHeader = (header: Record<string, string>) => {
    const cookieHeader = header["set-cookie"] as unknown;

    return (cookieHeader as string[]).find((cookie: string) =>
      cookie.startsWith(JWTUtils.cookieKey)
    );
  };

  /** Only pass in a lowercase ID with words separate by periods */
  static getTestEmail(id: string) {
    return `utktest.${id}@example.com`;
  }

  static async deleteTestVendor(email: string) {
    try {
      await Vendor.destroy({ where: { email } });
    } catch (err) {
      noop();
    }
  }

  static async createTestVendor(email: string) {
    return Vendor.create({
      email,
      password: this.validPassword,
      name: "Test Vendor",
    });
  }
}
