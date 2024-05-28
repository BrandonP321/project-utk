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
    .flat()
    .filter((option) => option.value !== undefined);
};

export const EBRegionHostedZoneIdMap: Record<string, string> = {
  "us-east-1": "Z117KPS5GTRQ2G",
  "us-east-2": "Z14LCN19Q5QHIC",
  "us-west-1": "Z1LQECGX5PH1X",
  "us-west-2": "Z38NKT9BP95V3O",
};
