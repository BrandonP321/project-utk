import { APIStage } from "../../config/stage";

function getStageValue<T, Stage extends string>(
  stage: Stage,
  defaultValue: T,
  overrides: Partial<Record<Stage, T | undefined>>,
): T {
  const hasOverride = Object.prototype.hasOwnProperty.call(overrides, stage);

  return hasOverride ? (overrides[stage] as T) : defaultValue;
}

export function getStageValueFunc<Stage extends string>(stage: Stage) {
  return <T>(
    defaultValue: T,
    overrides: Partial<Record<Stage, T | undefined>>,
  ): T => getStageValue(stage, defaultValue, overrides);
}

export function getAPIStageValue<T>(
  stage: APIStage,
  defaultValue: T,
  overrides: Partial<Record<APIStage, T | undefined>>,
): T {
  return getStageValue(stage, defaultValue, overrides);
}
