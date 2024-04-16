import { ConfigUtils, TimeUtils } from "@project-utk/shared/src/utils";

export const apiConfig = {
  vendor: {
    auth: {
      loginAttemptLimit: ConfigUtils.getConfigValue<number>(5, { test: 3 }),
      accountLockoutDurationMs: ConfigUtils.getConfigValue<number>(
        TimeUtils.minutesToMilliseconds(60),
        { test: 2000 }
      ),
    },
  },
};
