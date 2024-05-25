import * as cdk from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as codeartifact from "aws-cdk-lib/aws-codeartifact";
import { Construct } from "constructs";
import { addSourcePipelineStage } from "./helpers/codepipelineHelpers";
import { CdkStack } from "./cdk-stack";
import { capitalize } from "lodash";

export namespace CdkPipeline {
  export type Props<
    Stack extends cdk.Stack,
    Stage extends string,
  > = cdk.StackProps & {
    stageStacks: Record<Stage, Stack>;
    pipelineName: string;
  };
}

export class CdkPipeline<
  Stack extends cdk.Stack,
  Stage extends string,
> extends cdk.Stack {
  props: CdkPipeline.Props<Stack, Stage>;
  pipeline: codepipeline.Pipeline;
  sourceOutput = new codepipeline.Artifact();
  cdkOutput = new codepipeline.Artifact();

  constructor(
    scope: Construct,
    id: string,
    props: CdkPipeline.Props<Stack, Stage>,
  ) {
    super(scope, id, props);

    this.props = props;

    const artifactBucket = new s3.Bucket(this, "Pipeline-Artifacts", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      lifecycleRules: [{ expiration: cdk.Duration.days(1) }],
    });

    this.pipeline = new codepipeline.Pipeline(this, this.props.pipelineName, {
      artifactBucket,
      restartExecutionOnUpdate: true,
      pipelineName: this.props.pipelineName,
    });
  }

  addSourceStage() {
    return addSourcePipelineStage(this.pipeline, this.sourceOutput, {});
  }

  getStackUpdateStageActions(stack: CdkStack<string>, stage: string) {
    return new codepipelineActions.CloudFormationCreateUpdateStackAction({
      actionName: `Deploy-${capitalize(stage)}`,
      templatePath: this.cdkOutput.atPath(`${stack.stackName}.template.json`),
      stackName: stack.stackName,
      adminPermissions: true,
      extraInputs: [this.cdkOutput],
    });
  }

  addCodeArtifactPolicyToProject(
    project: codebuild.PipelineProject,
    repo: codeartifact.CfnRepository,
    domain: codeartifact.CfnDomain,
  ) {
    project.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "codeartifact:GetAuthorizationToken",
          "codeartifact:ReadFromRepository",
          "codeartifact:DescribePackageVersion",
          "codeartifact:DescribeRepository",
          "codeartifact:GetRepositoryEndpoint",
          "codeartifact:ReadFromAsset",
          "codeartifact:ReadPackageVersionAsset",
        ],
        resources: [repo.attrArn, domain.attrArn],
      }),
    );

    project.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["sts:GetServiceBearerToken"],
        resources: ["*"],
        conditions: {
          StringEquals: {
            "sts:AWSServiceName": "codeartifact.amazonaws.com",
          },
        },
      }),
    );
  }
}
