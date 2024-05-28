import { ebConfigToSettingOptions } from "../lib/helpers/elasticbeanstalkHelpers";
import { EBSettingOptionsConfig } from "../lib/helpers/elasticbeanstalkSettingOptions";
import { getStageValueFunc } from "../lib/helpers/stageHelpers";
import { APIStage } from "./stage";

type Params = {
  SSLCertificateArn: string;
  instanceProfileArn: string;
};

export const getAPIEBConfig = (stage: APIStage, params: Params) => {
  const getStageValue = getStageValueFunc(stage);

  const config: EBSettingOptionsConfig = {
    "aws:autoscaling:asg": {
      MinSize: getStageValue("2", { dev: "1" }),
      MaxSize: getStageValue("10", { dev: "2" }),
      Cooldown: getStageValue("360", {}),
      EnableCapacityRebalancing: getStageValue("true", { dev: "false" }),
    },
    "aws:autoscaling:launchconfiguration": {
      RootVolumeType: getStageValue("gp3", { dev: "gp2" }),
      RootVolumeSize: getStageValue("20", { dev: "8" }),
      IamInstanceProfile: params.instanceProfileArn,
    },
    "aws:elasticbeanstalk:environment": {
      EnvironmentType: getStageValue("LoadBalanced", { dev: "SingleInstance" }),
      LoadBalancerType: getStageValue("application", { dev: undefined }),
    },
    "aws:elasticbeanstalk:command": {
      DeploymentPolicy: getStageValue("Rolling", { dev: "AllAtOnce" }),
      BatchSizeType: getStageValue("Percentage", { dev: "Fixed" }),
      BatchSize: getStageValue("30", { dev: "1" }),
      Timeout: getStageValue("600", {}),
    },
    "aws:elasticbeanstalk:healthreporting:system": {
      SystemType: getStageValue("enhanced", { dev: "basic" }),
      EnhancedHealthAuthEnabled: getStageValue("true", { dev: "false" }),
      HealthCheckSuccessThreshold: getStageValue("Ok", {}),
    },
    "aws:elasticbeanstalk:cloudwatch:logs": {
      StreamLogs: getStageValue("true", {}),
      DeleteOnTerminate: getStageValue("false", { dev: "true" }),
      RetentionInDays: getStageValue("30", { dev: "7" }),
    },
    "aws:ec2:instances": {
      InstanceTypes: getStageValue("t3.medium, t3.large", { dev: "t2.micro" }),
      EnableSpot: getStageValue("false", { dev: "true" }),
      SupportedArchitectures: getStageValue("x86_64", {}),
      SpotMaxPrice: getStageValue("", { dev: "0.007" }),
    },
    "aws:elasticbeanstalk:application:environment": {},
  };

  if (stage === "prod") {
    config["aws:elbv2:listener:default"] = {
      DefaultProcess: getStageValue("default", {}),
      ListenerEnabled: getStageValue("true", {}),
      Protocol: getStageValue("HTTP", {}),
      SSLCertificateArns: getStageValue(params.SSLCertificateArn, {}),
      SSLPolicy: getStageValue("ELBSecurityPolicy-2016-08", {}),
    };
  }

  return ebConfigToSettingOptions(config);
};
