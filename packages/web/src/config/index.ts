import { ConfigUtils } from "@project-utk/shared/src/utils";

export const webConfig = {
  notifications: {
    autoHideDurationMs: ConfigUtils.getConfigValue(5000),
    fadeOutTransitionDurationMs: ConfigUtils.getConfigValue(500),
  },
  api: {
    defaultMaxRetries: ConfigUtils.getConfigValue(2),
  },
};
