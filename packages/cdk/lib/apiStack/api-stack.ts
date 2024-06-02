import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as elasticbeanstalk from "aws-cdk-lib/aws-elasticbeanstalk";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as cr from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import { CdkStack } from "../cdk-stack";
import { APIStage } from "../../config/stage";
import { getAPIEBConfig } from "../../config/apiEBConfig";
import path from "path";
import { addCodeArtifactPolicyToRole } from "../helpers/codeartifactHelpers";

export const getApiEbAppName = (stage: APIStage) => `UTK-API-EB-App-${stage}`;
export const getApiEbEnvName = (stage: APIStage) => `UTK-API-EB-Env-${stage}`;

export class APIStack extends CdkStack<APIStage> {
  appVersionsBucket: s3.Bucket;
  ebApp: elasticbeanstalk.CfnApplication;
  appEnv: elasticbeanstalk.CfnEnvironment;
  subdomain = this.getStageValue("api", { dev: "api-dev" });
  apiDomain = `${this.subdomain}.${this.appDomain}`;
  cert: acm.Certificate;
  instanceRole: iam.Role;
  instanceProfile: iam.CfnInstanceProfile;
  aliasFunction: lambda.Function;

  constructor(scope: Construct, id: string, props: CdkStack.Props<APIStage>) {
    super(scope, id, props);

    // S3 bucket to store the application versions
    this.createAppVersionsBucket();

    // Elastic Beanstalk application
    this.createElasticBeanstalkApp();

    // ACM certificate
    this.createACMCertificate();

    // IAM role & profile for EC2 instances
    this.createEc2InstanceRoleAndProfile();

    // Elastic Beanstalk environment
    this.createElasticBeanstalkAppEnv();

    addCodeArtifactPolicyToRole(this.instanceRole);

    // Create lambda function to handle the Route 53 alias record
    this.createAliasFunction();

    // Custom resource to create the Route 53 alias record
    this.createAliasLambdaCustomResource();
  }

  private createAppVersionsBucket() {
    this.appVersionsBucket = new s3.Bucket(this, "App-Versions-Bucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: false,
    });
  }

  private createElasticBeanstalkApp() {
    this.ebApp = new elasticbeanstalk.CfnApplication(this, "Application", {
      applicationName: getApiEbAppName(this.props.stage),
    });
  }

  private createACMCertificate() {
    this.cert = new acm.Certificate(this, "Certificate", {
      domainName: this.apiDomain,
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });
  }

  private createEc2InstanceRoleAndProfile() {
    this.instanceRole = new iam.Role(this, "InstanceRole", {
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

    this.instanceProfile = new iam.CfnInstanceProfile(this, "InstanceProfile", {
      roles: [this.instanceRole.roleName],
    });
  }

  private createElasticBeanstalkAppEnv() {
    this.appEnv = new elasticbeanstalk.CfnEnvironment(this, "Environment", {
      environmentName: getApiEbEnvName(this.props.stage),
      applicationName: this.ebApp.applicationName!,
      solutionStackName: "64bit Amazon Linux 2023 v6.1.5 running Docker",
      optionSettings: getAPIEBConfig(this.props.stage, {
        SSLCertificateArn: this.cert.certificateArn,
        instanceProfileArn: this.instanceProfile.attrArn,
      }),
    });

    this.appEnv.addDependency(this.ebApp);
    this.appEnv.addDependency(this.instanceProfile);
  }

  private createAliasFunction() {
    // For NodeJsFunction to work, esbuild MUST be listed as a dependency
    // in the root level package.json
    this.aliasFunction = new NodejsFunction(this, "AliasFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "handler",
      entry: path.join(
        __dirname,
        "../../lambda/api-alias-record-lambda-handler.ts",
      ),
      environment: {
        HOSTED_ZONE_ID: this.hostedZone.hostedZoneId,
        EB_ENV_REGION: this.region,
      },
      bundling: {
        minify: true,
        externalModules: ["aws-sdk/*"],
      },
    });

    this.aliasFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          "route53:ChangeResourceRecordSets",
          "elasticbeanstalk:DescribeEnvironments",
        ],
        resources: ["*"],
      }),
    );
  }

  private createAliasLambdaCustomResource() {
    const customResourceProviderRole = new iam.Role(
      this,
      "CustomResourceProviderRole",
      {
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      },
    );

    customResourceProviderRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["lambda:InvokeFunction"],
        resources: [this.aliasFunction.functionArn],
      }),
    );

    const getCustomResourceSDKCall = (requestType: string): cr.AwsSdkCall => ({
      service: "Lambda",
      action: "invoke",
      parameters: {
        FunctionName: this.aliasFunction.functionArn,
        Payload: JSON.stringify({
          RequestType: requestType,
          ResourceProperties: {
            RecordName: this.apiDomain,
            EnvironmentName: this.appEnv.environmentName,
            // Dummy property to force an update when the environment changes
            DummyProperty: new Date().toISOString(),
          },
        }),
      },
      physicalResourceId: cr.PhysicalResourceId.of(
        `AliasRecord-${this.apiDomain}`,
      ),
    });

    new cr.AwsCustomResource(this, "AliasRecordCustomResource", {
      onCreate: getCustomResourceSDKCall("Create"),
      onUpdate: getCustomResourceSDKCall("Update"),
      onDelete: getCustomResourceSDKCall("Delete"),
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
      role: customResourceProviderRole,
    });
  }

  public addPoliciesToPipelineRole(pipelineRole: iam.IRole) {
    pipelineRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject",
          "s3:ListBuckets",
          "s3:ListBucket",
        ],
        resources: [
          this.appVersionsBucket.bucketArn,
          `${this.appVersionsBucket.bucketArn}/*`,
        ],
      }),
    );

    this.appVersionsBucket.grantRead(pipelineRole);
  }
}
