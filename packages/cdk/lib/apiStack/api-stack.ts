import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as elasticbeanstalk from "aws-cdk-lib/aws-elasticbeanstalk";
import { Construct } from "constructs";
import { CdkStack } from "../cdk-stack";
import { APIStage } from "../../config/stage";

export class APIStack extends CdkStack<APIStage> {
  constructor(scope: Construct, id: string, props: CdkStack.Props<APIStage>) {
    super(scope, id, props);

    // S3 bucket to store the application versions
    const appVersionsBucket = new s3.Bucket(this, "App-Versions-Bucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: false,
    });

    const app = new elasticbeanstalk.CfnApplication(this, "Application", {
      applicationName: `UTK-API-EB`,
    });

    // Elastic Beanstalk environment
    const appEnv = new elasticbeanstalk.CfnEnvironment(this, "Environment", {
      environmentName: `UTK-API-EB-Env`,
      applicationName: app.applicationName!,
      solutionStackName: "64bit Amazon Linux 2023 v6.1.5 running Node.js 20",
      optionSettings: [
        {
          namespace: "aws:autoscaling:launchconfiguration",
          optionName: "InstanceType",
          value: "t2.micro",
        },
        {
          namespace: "aws:autoscaling:launchconfiguration",
          optionName: "RootVolumeType",
          value: "gp2",
        },
        {
          namespace: "aws:autoscaling:launchconfiguration",
          optionName: "RootVolumeSize",
          value: "10",
        },
        {
          namespace: "aws:autoscaling:asg",
          optionName: "Cooldown",
          value: "360",
        },
        {
          namespace: "aws:elasticbeanstalk:environment",
          optionName: "EnvironmentType",
          value: "LoadBalanced",
        },
        {
          namespace: "aws:elasticbeanstalk:environment",
          optionName: "LoadBalancerType",
          value: "application",
        },
        {
          namespace: "aws:elasticbeanstalk:environment",
          optionName: "ServiceRole",
          value: "aws-elasticbeanstalk-service-role",
        },
        {
          namespace: "aws:elasticbeanstalk:container:nodejs",
          optionName: "NodeCommand",
          value: "npm start",
        },
        {
          namespace: "aws:elasticbeanstalk:managedactions",
          optionName: "ManagedActionsEnabled",
          value: "true",
        },
        {
          namespace: "aws:elasticbeanstalk:managedactions",
          optionName: "PreferredStartTime",
          value: "Sun:03:00",
        },
        {
          namespace: "aws:elasticbeanstalk:command",
          optionName: "DeploymentPolicy",
          value: "Rolling",
        },
        {
          namespace: "aws:elasticbeanstalk:environment",
          optionName: "EnvironmentType",
          value: "LoadBalanced",
        },
        // Env Variables
        {
          namespace: "aws:elasticbeanstalk:application:environment",
          optionName: "NODE_ENV",
          value: "production",
        },
      ],
      versionLabel: "InitialVersion",
    });

    // IAM role for CodePipeline to interact with Elastic Beanstalk
    const pipelineRole = new iam.Role(this, "PipelineRole", {
      assumedBy: new iam.ServicePrincipal("codepipeline.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
      ],
    });

    // Allow Elastic Beanstalk to access the application bucket
    appVersionsBucket.grantRead(pipelineRole);
  }
}
