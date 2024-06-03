import { ConfigUtils, TimeUtils } from "@project-utk/shared/src/utils";

const dbConfig = {
  db: {
    devDB: {
      name: "utkdevserverlessdb",
      host: "utk-dev-aurora-serverless.cluster-cveiephms8k5.us-east-1.rds.amazonaws.com",
      authSecretId: "rds!cluster-1814e6ed-f907-48fc-8f56-e239df30f001",
    },
    prodDB: {
      name: "",
      host: "",
      authSecretId: "",
    },
  },
};

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
    },
  },
  db:
    process.env.RDS_DB_STAGE === "dev" ? dbConfig.db.devDB : dbConfig.db.prodDB,
};
