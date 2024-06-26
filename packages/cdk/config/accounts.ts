import { APIStage, SharedCdkStage, WebStage } from "./stage";

export type Account = {
  account: string;
  region: string;
};

const defaultAccount: Account = {
  account: "757269603777",
  region: "us-east-1",
};

export const APIAccounts: Record<APIStage, Account> = {
  dev: defaultAccount,
  prod: defaultAccount,
};

export const APIPipelineAccount: Account = defaultAccount;

export const SharedCdkAccounts: Record<SharedCdkStage, Account> = {
  local: defaultAccount,
  dev: defaultAccount,
  prod: defaultAccount,
};

export const SharedCdkPipelineAccount: Account = defaultAccount;

export const WebAccounts: Record<WebStage, Account> = {
  dev: defaultAccount,
  staging: defaultAccount,
  prod: defaultAccount,
};

export const WebPipelineAccount: Account = defaultAccount;
