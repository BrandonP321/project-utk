import { Stage } from "@types";

export type EnvVars = {
  STAGE: Stage;
};

export type APIEnvVars = {
  PORT?: string;
  STAGE: APIStage;
  ENV_VARS_SECRET_ID: string;
  RDS_DB_STAGE: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVars {}
  }
}
