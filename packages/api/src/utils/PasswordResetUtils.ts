import { TimeUtils } from "@project-utk/shared/src/utils/TimeUtils";
import Vendor from "../models/vendor/Vendor";
import { JWTUtils } from "./JWTUtils";
import { NodeMailerUtils } from "./NodeMailerUtils";
import jwt from "jsonwebtoken";

type JWTPayload = {
  vendorId: string;
};

export class PasswordResetUtils {
  static tokenExpiry = "1h";
  static tokenExpiryMs = TimeUtils.hoursToMilliseconds(60);
  private static tokenSecret = process.env.EMAIL_VERIFICATION_SECRET!;

  static generateResetToken = (vendor: Vendor) => {
    const payload: JWTPayload = { vendorId: vendor.id };

    return jwt.sign(payload, this.tokenSecret, {
      expiresIn: this.tokenExpiry,
    });
  };

  static sendResetEmail = async (vendor: Vendor) => {
    const verificationToken = this.generateResetToken(vendor);
    vendor.resetToken = verificationToken;
    await vendor.save();

    await NodeMailerUtils.transporter().sendMail({
      from: NodeMailerUtils.email,
      to: vendor.email,
      subject: "Project UTK Password Reset",
      text: `Reset Token: ${verificationToken}`,
    });
  };

  static verifyToken = (token: string) => {
    return JWTUtils.verifyToken<JWTPayload>(token, this.tokenSecret);
  };
}
