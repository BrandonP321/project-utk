import jwt from "jsonwebtoken";
import { JWTUtils } from "./JWTUtils";
import { apiConfig } from "../config";
import Vendor from "../models/vendor/Vendor";
import { NodeMailerUtils } from "./NodeMailerUtils";

type TokenPayload = {
  vendorId: string;
  newEmail: string;
};

export class VendorEmailUpdateUtils {
  private static tokenExpiresIn =
    apiConfig.vendor.auth.emailUpdateTokenExpirationSec;
  private static tokenSecret = apiConfig.vendor.auth.emailUpdateTokenSecret;

  static getToken(vendorId: string, newEmail: string) {
    const payload: TokenPayload = { vendorId, newEmail };

    return jwt.sign(payload, this.tokenSecret, {
      expiresIn: this.tokenExpiresIn,
    });
  }

  static verifyToken(token: string) {
    return JWTUtils.verifyToken<TokenPayload>(token, this.tokenSecret);
  }

  static async sendEmail(vendor: Vendor, newEmail: string) {
    const token = this.getToken(vendor.id, newEmail);

    vendor.emailUpdateToken = token;
    await vendor.save();

    await NodeMailerUtils.transporter().sendMail({
      from: NodeMailerUtils.email,
      to: vendor.email,
      subject: "Project UTK Email Update",
      text: `Email Update Token: ${token}`,
    });
  }
}
