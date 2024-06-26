import { TimeUtils } from "@project-utk/shared/src/utils/TimeUtils";
import { RateLimiterUtils } from "../../utils/RateLimiterUtils";

const windowMinutes = 15;
const maxPerWindow = 10;

/** IP based rate limiting to prevent brute force token guessing */
export const ResetVendorPasswordLimiter = RateLimiterUtils.createRateLimiter({
  windowMs: TimeUtils.minutesToMilliseconds(windowMinutes),
  max: maxPerWindow,
  msg: `Too many requests, please try again after ${windowMinutes} minutes.`,
});
