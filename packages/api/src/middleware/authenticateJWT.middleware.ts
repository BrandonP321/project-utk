import { DefaultAPIErrors } from "@project-utk/shared/src/api/routes/routeErrors";
import { Controller } from "../utils/Controller";
import { JWTUtils } from "../utils/JWTUtils";
import Vendor from "../models/vendor/Vendor";

export type VendorJWTLocals = {
  vendorId: string;
};

const controller = new Controller<
  {},
  {},
  {},
  VendorJWTLocals,
  typeof DefaultAPIErrors
>(DefaultAPIErrors);

export const authenticateJWT = controller.handler(
  async (req, res, errors, next) => {
    const respondWithUnauthenticated = () => {
      JWTUtils.removeJWTCookie(res);
      throw errors.UNAUTHENTICATED();
    };

    try {
      const aToken = JWTUtils.getJWTCookie(req);
      if (!aToken) return respondWithUnauthenticated();

      let vendorId: string;
      try {
        vendorId = JWTUtils.verifyVendorAccessToken(aToken).vendorId;
      } catch (err) {
        const oldAToken = JWTUtils.decodeVendorToken(aToken);
        const vendor = await Vendor.findByPk(oldAToken.vendorId);
        const refreshToken = vendor?.refreshToken;

        if (!vendor || !refreshToken) return respondWithUnauthenticated();

        const rToken = JWTUtils.verifyVendorRefreshToken(refreshToken);
        if (rToken.tokenId !== oldAToken.tokenId) {
          await vendor.update({ refreshToken: null });
          respondWithUnauthenticated();
        }

        await JWTUtils.generateAndSetVendorTokens(res, vendor.id);
        vendorId = oldAToken.vendorId;
      }

      next({ vendorId });
    } catch (err) {
      respondWithUnauthenticated();
    }
  }
);
