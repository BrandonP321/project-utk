export enum Stage {
  Local = "local",
  Dev = "dev",
  Prod = "prod",
  Test = "test",
}

export type APIStage = "local" | "dev" | "prod" | "test";

export type WebStage = "local" | "dev" | "staging" | "prod";

export type RDS_DB_STAGE = "dev" | "prod";
