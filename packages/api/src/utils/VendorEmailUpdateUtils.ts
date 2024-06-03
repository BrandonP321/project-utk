import jwt from "jsonwebtoken";
import { JWTUtils } from "./JWTUtils";
import { apiConfig } from "../config";
import Vendor from "../models/vendor/Vendor";
import { NodeMailerUtils } from "./NodeMailerUtils";
import { URLUtils } from "@project-utk/shared/src/utils/URLUtils";
import { RequestVendorEmailUpdate } from "@project-utk/shared/src/api/routes";
import { EnvVars } from "./EnvVars";

type TokenPayload = {
  vendorId: string;
  newEmail: string;
};

export class VendorEmailUpdateUtils {
  private static tokenExpiresIn =
    apiConfig.vendor.auth.emailUpdateTokenExpirationSec;
  private static tokenSecret = EnvVars.EMAIL_UPDATE_SECRET;

  static getToken(vendorId: string, newEmail: string) {
    const payload: TokenPayload = { vendorId, newEmail };

    return jwt.sign(payload, this.tokenSecret, {
      expiresIn: this.tokenExpiresIn,
    });
  }

  static verifyToken(token: string) {
    return JWTUtils.verifyToken<TokenPayload>(token, this.tokenSecret);
  }

  static async sendEmail(vendor: Vendor, newEmail: string, linkDomain: string) {
    const token = this.getToken(vendor.id, newEmail);

    vendor.emailUpdateToken = token;
    await vendor.save();

    const link = URLUtils.url(URLUtils.removeTrailingSlash(linkDomain))
      .updateSearchParams({
        [RequestVendorEmailUpdate.EmailUpdateLinkSearchParamKey]: token,
      })
      .setPath(RequestVendorEmailUpdate.WebPath).href;

    await NodeMailerUtils.transporter().sendMail({
      from: NodeMailerUtils.getEmail(),
      to: vendor.email,
      subject: "Project UTK Email Update",
      html: `<p>Click <a href="${link}">here</a> to update your email address.</p>`,
    });
  }
}
