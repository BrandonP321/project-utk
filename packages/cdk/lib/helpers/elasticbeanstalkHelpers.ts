import * as elasticbeanstalk from "aws-cdk-lib/aws-elasticbeanstalk";
import { EBSettingOptionsConfig } from "./elasticbeanstalkSettingOptions";

type SettingOption = elasticbeanstalk.CfnEnvironment.OptionSettingProperty;

export const ebConfigToSettingOptions = (
  config: EBSettingOptionsConfig,
): SettingOption[] => {
  return Object.entries(config)
    .map(([namespace, options]) =>
      Object.entries(options).map(([optionName, value]) => ({
        namespace,
        optionName,
        value,
      })),
    )
    .flat();
};
