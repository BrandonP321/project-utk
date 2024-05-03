import { noop } from "lodash";
import Vendor from "../../models/vendor/Vendor";
import { JWTUtils } from "../JWTUtils";
import { TAgent, TestUtils } from "./TestUtils";
import { LoginVendor } from "@project-utk/shared/src/api/routes";
import VendorListing from "../../models/vendorListing/VendorListing";
import PricingOptionGroup from "../../models/PricingOptionGroup/PricingOptionGroup";
import PricingOption from "../../models/PricingOption/PricingOption";

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
      cookie.startsWith(JWTUtils.cookieKey),
    );
  };

  /** Only pass in a lowercase ID with words separate by periods */
  static getTestEmail(id: string) {
    return `utktest.${id.toLowerCase()}@example.com`;
  }

  static async deleteTestVendor(email: string) {
    try {
      const vendor = await Vendor.findOne({ where: { email } });
      const listings = await VendorListing.findAll({
        where: { vendorId: vendor?.id },
      });
      const optionGroups = (
        await Promise.all(
          listings.map((l) =>
            PricingOptionGroup.findAll({ where: { listingId: l.id } }),
          ),
        )
      ).flat();

      await Promise.all([
        Vendor.destroy({ where: { id: vendor?.id } }),
        VendorListing.destroy({ where: { vendorId: vendor?.id } }),
        PricingOptionGroup.destroy({
          where: { id: optionGroups.map((o) => o.id) },
        }),
        PricingOption.destroy({
          where: { groupId: optionGroups.map((o) => o.id) },
        }),
      ]);

      await Vendor.destroy({ where: { id: vendor?.id } });
    } catch (err) {
      console.log("Error deleting test vendor", err);
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

  static async getTestVendorListing(listingId: string) {
    return (await VendorListing.findOne({ where: { id: listingId } }))!;
  }

  static loginVendorRequest = TestUtils.getRequestFunc<
    LoginVendor.ReqBody,
    LoginVendor.ResBody,
    typeof LoginVendor.Errors
  >(LoginVendor.Path);

  static async loginTestVendor(
    { email, password = this.correctPassword }: LoginRequestParams,
    agent?: TAgent,
  ) {
    return this.loginVendorRequest({ email, password }, agent);
  }

  static createAndLoginTestVendor = async (email: string) => {
    const agent = TestUtils.agent();
    await VendorTestUtils.createTestVendor(email);
    await VendorTestUtils.loginTestVendor({ email }, agent);

    return agent;
  };

  static verifyVendorEmail = async (email: string) => {
    return await Vendor.update({ isEmailVerified: true }, { where: { email } });
  };
}
