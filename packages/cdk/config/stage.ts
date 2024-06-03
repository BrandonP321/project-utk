export enum APIStage {
  DEV = "dev",
  PROD = "prod",
}

export const orderedApiStages: APIStage[] = [APIStage.DEV];

export enum WebStage {
  DEV = "dev",
  STAGING = "staging",
  PROD = "prod",
}

export const orderedWebStages: WebStage[] = [WebStage.DEV];

export enum SharedCdkStage {
  LOCAL = "local",
  DEV = "dev",
  PROD = "prod",
}
