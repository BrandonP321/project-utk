import { DefaultAPIErrors } from "@project-utk/shared/src/api/routes/routeErrors";
import rateLimit from "express-rate-limit";

type RateLimiterParams = {
  windowMs: number;
  max: number;
  msg: string;
};

export class RateLimiterUtils {
  static createRateLimiter({ max, msg, windowMs }: RateLimiterParams) {
    return rateLimit({
      windowMs: windowMs,
      max,
      message:
        DefaultAPIErrors.RATE_LIMITED.getErrorWithNewMsg(msg).apiResponse,
    });
  }
}
