import Vendor from "../models/vendor/Vendor";
import { JWTUtils } from "./JWTUtils";
import { NodeMailerUtils } from "./NodeMailerUtils";
import jwt from "jsonwebtoken";

type VendorJWTPayload = {
  vendorId: string;
};

export class EmailVerificationUtils {
  private static tokenExpiry = "1h";
  private static tokenSecret = process.env.EMAIL_VERIFICATION_SECRET!;

  static generateVerificationToken = (vendor: Vendor) => {
    return jwt.sign({ vendorId: vendor.id }, this.tokenSecret, {
      expiresIn: this.tokenExpiry,
    });
  };

  static sendVerificationEmail = async (vendor: Vendor) => {
    const verificationToken = this.generateVerificationToken(vendor);
    vendor.emailVerificationToken = verificationToken;
    await vendor.save();

    await NodeMailerUtils.transporter().sendMail({
      from: NodeMailerUtils.email,
      to: vendor.email,
      subject: "Project UTK Email Verification",
      text: `Verification Token: ${verificationToken}`,
    });
  };

  static verifyToken = (token: string) => {
    return JWTUtils.verifyToken<VendorJWTPayload>(token, this.tokenSecret);
  };
}
