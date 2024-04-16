import { Stage } from "@types";

export type EnvVars = {
  STAGE: Stage;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVars {}
  }
}
