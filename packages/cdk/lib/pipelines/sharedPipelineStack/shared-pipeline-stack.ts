import * as cdk from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as iam from "aws-cdk-lib/aws-iam";
import { SharedCdkStage } from "../../../config/stage";
import { Construct } from "constructs";
import { SharedStackStage } from "./shared-stack-stage";
import { addSourcePipelineStage } from "../../helpers/codepipelineHelpers";

const stages: SharedCdkStage[] = [SharedCdkStage.DEV, SharedCdkStage.PROD];

export class SharedCdkPipelineStack extends cdk.Stack {
  props;
  pipeline: codepipeline.Pipeline;
  sourceOutput = new codepipeline.Artifact();
  cdkOutput = new codepipeline.Artifact();

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.props = props;

    const artifactBucket = new s3.Bucket(this, `UTKSharedPipelineArtifact`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      lifecycleRules: [{ expiration: cdk.Duration.days(1) }],
    });

    this.pipeline = new codepipeline.Pipeline(this, `UTKSharedPipeline`, {
      artifactBucket,
      restartExecutionOnUpdate: true,
      pipelineName: `UTK-Shared-Pipeline`,
    });

    // Source stage
    addSourcePipelineStage(this.pipeline, this.sourceOutput, {});

    // Build stage
    const project = new codebuild.PipelineProject(
      this,
      `UTKSharedPipelineProject`,
      {
        projectName: `UTK-Shared-Pipeline-Project`,
        environment: {
          privileged: false,
          computeType: codebuild.ComputeType.LAMBDA_2GB,
          buildImage: codebuild.LinuxLambdaBuildImage.AMAZON_LINUX_2023_NODE_20,
          environmentVariables: {
            FONTAWESOME_NPM_AUTH_TOKEN: {
              value: "74BF9580-6A40-4C4E-ABEE-33976F854B74",
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            },
          },
        },
        buildSpec: codebuild.BuildSpec.fromObject({
          version: "0.2",
          phases: {
            install: {
              commands: [
                "echo 'Installing dependencies'",
                "yarn workspace @project-utk/cdk install --frozen-lockfile",
              ],
            },
            build: {
              commands: [
                "echo 'Building the application'",
                "yarn cdk synth:shared",
              ],
            },
          },
          artifacts: {
            "base-directory": "packages/cdk/cdk.out",
            files: ["**/*"],
          },
        }),
      },
    );

    this.pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: "BuildCDK",
          project,
          input: this.sourceOutput,
          outputs: [this.cdkOutput],
        }),
      ],
    });

    // Deploy stages
  }
}
