import { WebStage, APIStage } from "./stage";

export type APIEnvVars = {
  PORT?: string;
  STAGE: APIStage;
  ENV_VARS_SECRET_ID: string;
  RDS_DB_STAGE: string;
};

export type WebEnvVars = {
  REACT_APP_STAGE: WebStage;
  REACT_APP_API_STAGE: Exclude<APIStage, "test">;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {}
  }
}
