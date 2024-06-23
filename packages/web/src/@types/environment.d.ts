import { WebEnvVars } from "@project-utk/shared/src/@types/environment";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends WebEnvVars {}
  }
}

export {};
