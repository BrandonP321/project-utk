import { TimeUtils } from "@project-utk/shared/src/utils/TimeUtils";
import Vendor from "../models/vendor/Vendor";
import { JWTUtils } from "./JWTUtils";
import { NodeMailerUtils } from "./NodeMailerUtils";
import jwt from "jsonwebtoken";
import { URLUtils } from "@project-utk/shared/src/utils/URLUtils";
import { ResetVendorPassword } from "@project-utk/shared/src/api/routes";
import { EnvVars } from "./EnvVars";

type JWTPayload = {
  vendorId: string;
};

export class PasswordResetUtils {
  static tokenExpiry = "1h";
  static tokenExpiryMs = TimeUtils.hoursToMilliseconds(60);
  private static getTokenSecret = () => EnvVars.EMAIL_VERIFICATION_SECRET!;

  static generateResetToken = (vendor: Vendor) => {
    const payload: JWTPayload = { vendorId: vendor.id };

    return jwt.sign(payload, this.getTokenSecret(), {
      expiresIn: this.tokenExpiry,
    });
  };

  static sendResetEmail = async (vendor: Vendor, linkDomain: string) => {
    const verificationToken = this.generateResetToken(vendor);
    vendor.resetToken = verificationToken;
    await vendor.save();

    const link = URLUtils.url(URLUtils.removeTrailingSlash(linkDomain))
      .updateSearchParams({
        [ResetVendorPassword.ResetLinkSearchParamKey]: vendor.resetToken,
      })
      .setPath(ResetVendorPassword.WebPath).href;

    await NodeMailerUtils.transporter().sendMail({
      from: NodeMailerUtils.getEmail(),
      to: vendor.email,
      subject: "Project UTK Password Reset",
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    });
  };

  static verifyToken = (token: string) => {
    return JWTUtils.verifyToken<JWTPayload>(token, this.getTokenSecret());
  };
}
