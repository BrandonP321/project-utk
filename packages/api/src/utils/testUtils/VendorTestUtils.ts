import { noop } from "lodash";
import Vendor from "../../models/vendor/Vendor";
import { JWTUtils } from "../JWTUtils";
import { TAgent, TestUtils } from "./TestUtils";
import { LoginVendor } from "@project-utk/shared/src/api/routes";

type LoginRequestParams = {
  email: string;
  password?: string;
};

export class VendorTestUtils {
  static correctPassword = "Password123!";
  static invalidPassword = "password";
  static incorrectPassword = "Password321@";
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
      password: this.correctPassword,
      name: "Test Vendor",
    });
  }

  static async getTestVendor(email: string) {
    return (await Vendor.findOne({ where: { email } }))!;
  }

  static loginVendorRequest = TestUtils.getRequestFunc<
    LoginVendor.ReqBody,
    LoginVendor.ResBody,
    typeof LoginVendor.Errors
  >(LoginVendor.Path);

  static async loginTestVendor(
    { email, password = this.correctPassword }: LoginRequestParams,
    agent?: TAgent
  ) {
    return this.loginVendorRequest({ email, password }, agent);
  }

  static createAndLoginTestVendor = async (email: string) => {
    const agent = TestUtils.agent();
    await VendorTestUtils.createTestVendor(email);
    await VendorTestUtils.loginTestVendor({ email }, agent);

    return agent;
  };
}
