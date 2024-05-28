import { EBSettingOptionsConfig } from "../lib/helpers/elasticbeanstalkSettingOptions";
import { getAPIStageValue } from "../lib/helpers/stageHelpers";
import { APIStage } from "./stage";

export const getAPIEBConfig = (stage: APIStage): EBSettingOptionsConfig => {
  function getStageValue<T extends string>(
    defaultValue: T,
    overrides: Partial<Record<APIStage, T>>,
  ) {
    return getAPIStageValue(stage, defaultValue, overrides);
  }

  return {
    "aws:autoscaling:asg": {
      MinSize: getStageValue("2", {}),
      MaxSize: getStageValue("10", {}),
      Cooldown: getStageValue("360", {}),
      HealthCheckType: getStageValue("ELB", {}),
      EnableCapacityRebalancing: getStageValue("true", {}),
    },
  };
};
