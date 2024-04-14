import { DefaultAPIErrors } from "@project-utk/shared/src/api/routes/routeErrors";
import { TimeUtils } from "@project-utk/shared/src/utils/TimeUtils";
import rateLimit from "express-rate-limit";

const windowMinutes = 15;
const maxPerWindow = 10;

/** IP based rate limiting to prevent brute force token guessing */
export const ResetVendorPasswordLimiter = rateLimit({
  windowMs: TimeUtils.minutesToMilliseconds(windowMinutes),
  max: maxPerWindow,
  message: DefaultAPIErrors.RATE_LIMITED.getErrorWithNewMsg(
    `Too many requests, please try again after ${windowMinutes} minutes.`
  ).apiResponse,
});
