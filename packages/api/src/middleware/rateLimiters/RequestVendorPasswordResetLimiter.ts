import { TimeUtils } from "@project-utk/shared/src/utils/TimeUtils";
import { RateLimiterUtils } from "../../utils/RateLimiterUtils";

const windowMinutes = 60;
const maxPerWindow = 10;

/**
 * IP based rate limiting to prevent abuse while allowing genuine
 * users sufficient attemps in case of issues like typos in their
 * email address
 */
export const RequestVendorPasswordResetLimiter =
  RateLimiterUtils.createRateLimiter({
    windowMs: TimeUtils.minutesToMilliseconds(windowMinutes),
    max: maxPerWindow,
    msg: `Too many requests, please try again after ${windowMinutes} minutes.`,
  });
