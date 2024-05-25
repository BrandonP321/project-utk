import * as cdk from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import { SharedCdkStage } from "../../../config/stage";
import { Construct } from "constructs";
import { addSourcePipelineStage } from "../../helpers/codepipelineHelpers";
import { SharedStack } from "../../sharedStack/shared-stack";

export const sharedCdkPipelineStages: SharedCdkStage[] = [
  SharedCdkStage.DEV,
  SharedCdkStage.PROD,
];

export class SharedCdkPipelineStack extends cdk.Stack {
  props: cdk.StackProps & {
    stageStacks: Record<SharedCdkStage, SharedStack>;
  };
  pipeline: codepipeline.Pipeline;
  sourceOutput = new codepipeline.Artifact();
  cdkOutput = new codepipeline.Artifact();

  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps & {
      stageStacks: Record<SharedCdkStage, SharedStack>;
    },
  ) {
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
          computeType: codebuild.ComputeType.LAMBDA_4GB,
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
            pre_build: {
              commands: ["echo 'Pre build memory usage: ' && free -m"],
            },
            build: {
              commands: [
                "echo 'Building the application'",
                "yarn cdk synth:shared",
              ],
            },
            post_build: {
              commands: ["echo 'Post build memory usage: ' && free -m"],
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
    sharedCdkPipelineStages.forEach((stage) => {
      const stack = props.stageStacks[stage];

      this.pipeline.addStage({
        stageName: `Deploy-${stage}`,
        actions: [
          new CodePipelineAction.CloudFormationCreateUpdateStackAction({
            actionName: `Deploy-${stage}`,
            templatePath: this.cdkOutput.atPath(
              `${stack.stackName}.template.json`,
            ),
            stackName: stack.stackName,
            adminPermissions: true,
            extraInputs: [this.cdkOutput],
          }),
        ],
      });
    });
  }
}
