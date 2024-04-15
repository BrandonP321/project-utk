import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Vendor from "../models/vendor/Vendor";
import { DefaultAPIErrors } from "@project-utk/shared/src/api/routes/routeErrors";
import { v4 as uuid } from "uuid";

type VendorJWTPayload = {
  vendorId: string;
  tokenId: string;
};

const jwtCookieKey = "AccessToken";

export class JWTUtils {
  static cookieKey = jwtCookieKey;

  static generateAccessToken<P extends {}>(payload: P) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });
  }

  static generateRefreshToken<P extends {}>(payload: P) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
  }

  static generateVendorTokens(vendorId: string) {
    const tokenId = uuid();
    const payload = { vendorId, tokenId };

    return {
      accessToken: JWTUtils.generateAccessToken<VendorJWTPayload>(payload),
      refreshToken: JWTUtils.generateRefreshToken<VendorJWTPayload>(payload),
    };
  }

  static setJWTCookie(res: Response, token: string) {
    // TODO: Make conditional based on environment
    res.cookie(jwtCookieKey, token, {
      httpOnly: true,
      sameSite: "lax", // strict on prod
      // secure: true, // true on prod
    });
  }

  static removeJWTCookie(res: Response) {
    return res.clearCookie(jwtCookieKey);
  }

  static getJWTCookie(req: Request): string | undefined {
    return req.cookies[jwtCookieKey];
  }

  static async generateAndSetVendorTokens(res: Response, vendorId: string) {
    const jwt = JWTUtils.generateVendorTokens(vendorId);

    const [affected] = await Vendor.update(
      { refreshToken: jwt.refreshToken },
      { where: { id: vendorId } }
    );

    // If no rows were affected, throw an error
    if (!affected) {
      throw DefaultAPIErrors.UNAUTHENTICATED;
    }

    JWTUtils.setJWTCookie(res, jwt.accessToken);

    return jwt;
  }

  static verifyToken<T extends {}>(token: string, secret: string) {
    return jwt.verify(token, secret) as T & jwt.JwtPayload;
  }

  static verifyVendorAccessToken(token: string) {
    return JWTUtils.verifyToken<VendorJWTPayload>(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    );
  }

  static verifyVendorRefreshToken(token: string) {
    return JWTUtils.verifyToken<VendorJWTPayload>(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    );
  }

  static decodeToken<T extends {}>(token: string) {
    return jwt.decode(token) as T & jwt.JwtPayload;
  }

  static decodeVendorToken(token: string) {
    return JWTUtils.decodeToken<VendorJWTPayload>(token);
  }

  static isExpiredError(err: any) {
    return err instanceof jwt.TokenExpiredError;
  }
}
