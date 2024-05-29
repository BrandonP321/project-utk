export enum APIStage {
  DEV = "dev",
  PROD = "prod",
}

export const orderedApiStages: APIStage[] = [APIStage.DEV];

export enum WebStage {
  LOCAL = "local",
  DEV = "dev",
  STAGING = "staging",
  PROD = "prod",
}

export enum SharedCdkStage {
  LOCAL = "local",
  DEV = "dev",
  PROD = "prod",
}
