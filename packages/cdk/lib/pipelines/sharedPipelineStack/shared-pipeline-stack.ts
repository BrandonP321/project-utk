import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import { SharedCdkStage } from "../../../config/stage";
import { Construct } from "constructs";
import { SharedStack } from "../../sharedStack/shared-stack";
import { capitalize } from "lodash";
import { CdkPipeline } from "../../cdk-pipeline";
import {
  codebuildDefaultEnvironmentVariables,
  codebuildInstallPhase,
  codebuildLambdaEnvironment,
  codebuildPostBuildPhase,
  codebuildPreBuildPhase,
} from "../../helpers/codebuildHelpers";

export const sharedCdkPipelineStages: SharedCdkStage[] = [
  SharedCdkStage.DEV,
  SharedCdkStage.PROD,
];

export class SharedCdkPipelineStack extends CdkPipeline<
  SharedStack,
  SharedCdkStage
> {
  constructor(
    scope: Construct,
    id: string,
    props: CdkPipeline.Props<SharedStack, SharedCdkStage>,
  ) {
    super(scope, id, props);

    // Source stage
    this.addSourceStage();

    // Build stage
    this.pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: "BuildCDK",
          project: this.buildStageCodeBuildProject(),
          input: this.sourceOutput,
          outputs: [this.cdkOutput],
        }),
      ],
    });

    // Deploy stages
    sharedCdkPipelineStages.forEach((stage) => {
      const stack = props.stageStacks[stage];

      this.pipeline.addStage({
        stageName: capitalize(stage),
        actions: [this.getStackUpdateStageActions(stack, stage)],
      });
    });
  }

  buildStageCodeBuildProject() {
    return new codebuild.PipelineProject(
      this,
      `UTK-Shared-Pipeline-Build-Project`,
      {
        projectName: `UTK-Shared-Pipeline-Build-Project`,
        environment: {
          ...codebuildLambdaEnvironment,
          environmentVariables: {
            ...codebuildDefaultEnvironmentVariables,
          },
        },
        buildSpec: codebuild.BuildSpec.fromObject({
          version: "0.2",
          phases: {
            install: codebuildInstallPhase,
            pre_build: codebuildPreBuildPhase,
            build: {
              commands: [
                "echo 'Building the application'",
                "yarn cdk synth:shared",
              ],
            },
            post_build: codebuildPostBuildPhase,
          },
          artifacts: {
            "base-directory": "packages/cdk/cdk.out",
            files: ["**/*"],
          },
        }),
      },
    );
  }
}
