import { APIStage } from "../../config/stage";

function getStageValue<T, Stage extends string>(
  stage: Stage,
  defaultValue: T,
  overrides: Partial<Record<Stage, T>>,
): T {
  const overrideValue = overrides[stage];

  return overrideValue !== undefined ? (overrideValue as T) : defaultValue;
}

export function getAPIStageValue<T>(
  stage: APIStage,
  defaultValue: T,
  overrides: Partial<Record<APIStage, T>>,
): T {
  return getStageValue(stage, defaultValue, overrides);
}
