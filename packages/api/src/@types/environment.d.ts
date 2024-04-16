import { EnvVars } from "@project-utk/shared/src/@types/environment";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVars {
      RDS_DB_SECRET_ID?: string;
      PORT?: string;
      RDS_DB_NAME?: string;
      RDS_DB_HOST?: string;
      ACCESS_TOKEN_SECRET?: string;
      REFRESH_TOKEN_SECRET?: string;
      EMAIL_VERIFICATION_SECRET?: string;
      EMAIL_VERIFICATION_EMAIL?: string;
      EMAIL_VERIFICATION_PASSWORD?: string;
    }
  }
}

export {};
