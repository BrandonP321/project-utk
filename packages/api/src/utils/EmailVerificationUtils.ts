import { URLUtils } from "@project-utk/shared/src/utils/URLUtils";
import Vendor from "../models/vendor/Vendor";
import { JWTUtils } from "./JWTUtils";
import { NodeMailerUtils } from "./NodeMailerUtils";
import jwt from "jsonwebtoken";
import { VerifyVendorEmail } from "@project-utk/shared/src/api/routes";

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

  static sendVerificationEmail = async (vendor: Vendor, linkDomain: string) => {
    const verificationToken = this.generateVerificationToken(vendor);
    vendor.emailVerificationToken = verificationToken;
    await vendor.save();

    const link = URLUtils.url(URLUtils.removeTrailingSlash(linkDomain))
      .updateSearchParams({
        [VerifyVendorEmail.VerificationLinkSearchParamKey]:
          vendor.emailVerificationToken,
      })
      .setPath(VerifyVendorEmail.WebPath).href;

    await NodeMailerUtils.transporter().sendMail({
      from: NodeMailerUtils.email,
      to: vendor.email,
      subject: "Project UTK Email Verification",
      html: `<p>Click <a href="${link}">here</a> to verify your email address.</p>`,
    });
  };

  static verifyToken = (token: string) => {
    return JWTUtils.verifyToken<VendorJWTPayload>(token, this.tokenSecret);
  };
}
