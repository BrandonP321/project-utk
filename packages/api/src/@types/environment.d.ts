import {
  APIEnvVars,
  EnvVars,
} from "@project-utk/shared/src/@types/environment";
import { APIStage } from "@project-utk/shared/src/@types/stage";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends APIEnvVars {}
  }
}

export {};
