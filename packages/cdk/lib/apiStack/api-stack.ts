import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as elasticbeanstalk from "aws-cdk-lib/aws-elasticbeanstalk";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { CdkStack } from "../cdk-stack";
import { APIStage } from "../../config/stage";
import { getAPIEBConfig } from "../../config/apiEBConfig";
import { getAPIStageValue } from "../helpers/stageHelpers";

export class APIStack extends CdkStack<APIStage> {
  constructor(scope: Construct, id: string, props: CdkStack.Props<APIStage>) {
    super(scope, id, props);

    // S3 bucket to store the application versions
    const appVersionsBucket = new s3.Bucket(this, "App-Versions-Bucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: false,
    });

    // Elastic Beanstalk application
    const app = new elasticbeanstalk.CfnApplication(this, "Application", {
      applicationName: `UTK-API-EB`,
    });

    const subdomain = this.getStageValue("api", { dev: "api-dev" });
    const apiDomain = `${subdomain}.${this.appDomain}`;

    // ACM certificate
    const cert = new acm.Certificate(this, "Certificate", {
      domainName: apiDomain,
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });

    // IAM role for EC2 instances
    const instanceRole = new iam.Role(this, "InstanceRole", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      roleName: "UTK-API-EB-Instance-Role",
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "AWSElasticBeanstalkWebTier",
        ),
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "AWSElasticBeanstalkWorkerTier",
        ),
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "AmazonEC2ContainerRegistryReadOnly",
        ),
      ],
    });

    // EC2 instance profile
    const instanceProfile = new iam.CfnInstanceProfile(
      this,
      "InstanceProfile",
      { roles: [instanceRole.roleName] },
    );

    // Elastic Beanstalk environment
    const appEnv = new elasticbeanstalk.CfnEnvironment(this, "Environment", {
      environmentName: `UTK-API-EB-Env`,
      applicationName: app.applicationName!,
      solutionStackName: "64bit Amazon Linux 2023 v6.1.5 running Node.js 20",
      optionSettings: getAPIEBConfig(this.props.stage, {
        SSLCertificateArn: cert.certificateArn,
        instanceProfileArn: instanceProfile.attrArn,
      }),
    });

    appEnv.addDependency(app);
    appEnv.addDependency(instanceProfile);

    // Subdomain A Record
    // new route53.ARecord(this, "APIAliasRecord", {
    //   zone: this.hostedZone,
    //   recordName: subdomain,
    //   target: route53.RecordTarget.fromAlias(
    //     new route53targets.ElasticBeanstalkEnvironmentEndpointTarget(
    //       appEnv.ref,
    //     ),
    //   ),
    // });

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
