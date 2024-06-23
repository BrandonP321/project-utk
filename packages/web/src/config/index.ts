import { APIStage } from "@project-utk/shared/src/@types/stage";
import { ConfigUtils } from "@project-utk/shared/src/utils";

type APIConnection = {
  url: string;
};

const apiConnection: Record<Exclude<APIStage, "test">, APIConnection> = {
  local: {
    url: "http://localhost:8000",
  },
  dev: {
    url: "http://api-dev.project-utk.com",
  },
  prod: {
    url: "https://api.project-utk.com",
  },
};

export const webConfig = {
  notifications: {
    autoHideDurationMs: ConfigUtils.getConfigValue(5000),
    fadeOutTransitionDurationMs: ConfigUtils.getConfigValue(500),
  },
  api: {
    defaultMaxRetries: ConfigUtils.getConfigValue(2),
    connection: apiConnection[process.env.REACT_APP_API_STAGE],
  },
};
