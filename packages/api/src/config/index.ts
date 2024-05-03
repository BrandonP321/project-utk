import { ConfigUtils, TimeUtils } from "@project-utk/shared/src/utils";

export const apiConfig = {
  vendor: {
    auth: {
      loginAttemptLimit: ConfigUtils.getConfigValue<number>(5, { test: 3 }),
      accountLockoutDurationMs: ConfigUtils.getConfigValue<number>(
        TimeUtils.minutesToMilliseconds(60),
        { test: 2000 },
      ),
      accessTokenExpirationSec: ConfigUtils.getConfigValue<number>(
        TimeUtils.minutesToSeconds(15),
        {},
      ),
      refreshTokenExpirationSec: ConfigUtils.getConfigValue<number>(
        TimeUtils.daysToSeconds(7),
        {},
      ),
      emailUpdateTokenExpirationSec: ConfigUtils.getConfigValue<number>(
        TimeUtils.hoursToSeconds(1),
        {},
      ),
      emailUpdateTokenSecret: ConfigUtils.getConfigValue<string>(
        process.env.EMAIL_UPDATE_SECRET!,
        {},
      ),
    },
  },
};
