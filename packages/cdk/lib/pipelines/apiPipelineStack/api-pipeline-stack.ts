import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions";
import { Construct } from "constructs";
import { APIStage, orderedApiStages } from "../../../config/stage";
import {
  APIStack,
  getApiEbAppName,
  getApiEbEnvName,
} from "../../apiStack/api-stack";
import { CdkPipeline } from "../../cdk-pipeline";
import {
  codebuildLambdaEnvironment,
  codebuildDefaultEnvironmentVariables,
  codebuildInstallPhase,
  codebuildPreBuildPhase,
  codebuildPostBuildPhase,
} from "../../helpers/codebuildHelpers";
import { stackName } from "../../helpers/resourceHelpers";
import { capitalize } from "lodash";

const getBuildArtifactName = (prefix: string, stage: string) =>
  `${prefix}BuildArtifact${capitalize(stage)}`;

const getAPIBuildArtifactName = (stage: string) =>
  getBuildArtifactName("API", stage);

export class APIPipelineStack extends CdkPipeline<APIStack, APIStage> {
  buidOutputMap: Record<APIStage, codepipeline.Artifact> = {
    dev: new codepipeline.Artifact(getAPIBuildArtifactName("dev")),
    prod: new codepipeline.Artifact(getAPIBuildArtifactName("prod")),
  };
  buildOutputList = orderedApiStages.map((stage) => this.buidOutputMap[stage]);

  constructor(
    scope: Construct,
    id: string,
    props: CdkPipeline.Props<APIStack, APIStage>,
  ) {
    super(scope, id, props);

    // Source stage
    this.addSourceStage();

    // Build stage
    const project = this.buildStageCodeBuildProject();

    this.addCodeArtifactPolicyToProject(project);

    this.pipeline.addStage({
      stageName: "Build",
      actions: [
        new codepipelineActions.CodeBuildAction({
          actionName: "Build",
          project,
          input: this.sourceOutput,
          outputs: [this.cdkOutput, ...this.buildOutputList],
        }),
      ],
    });

    orderedApiStages.forEach((stage) => {
      const stack = this.props.stageStacks[stage];

      stack.addPoliciesToPipelineRole(this.pipelineRole);

      this.pipeline.addStage({
        stageName: capitalize(stage),
        actions: [
          this.getStackUpdateStageActions(stack, stage, { runOrder: 1 }),
          // new codepipelineActions.ElasticBeanstalkDeployAction({
          //   actionName: `Deploy-API-${stage}`,
          //   applicationName: getApiEbAppName(stage),
          //   environmentName: getApiEbEnvName(stage),
          //   input: this.apiBuildOutput,
          //   runOrder: 2,
          // }),
        ],
      });
    });
  }

  buildStageCodeBuildProject() {
    return new codebuild.PipelineProject(
      this,
      stackName("API-Pipeline-Build-Project"),
      {
        projectName: stackName("API-Pipeline-Build-Project"),
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
                "echo 'Synthesizing CDK stacks'",
                "yarn cdk synth:api",

                "echo 'Making move-api-procfile-to-root.sh executable'",
                "chmod +x bin/move-api-procfile-to-root.sh",

                "echo 'Moving API Procfile to project root'",
                "bin/move-api-procfile-to-root.sh",

                // "echo 'Zipping api build output'",
                // "zip -rq build_output.zip .",
              ],
            },
            post_build: codebuildPostBuildPhase,
          },
          artifacts: {
            "base-directory": "packages/cdk/cdk.out",
            files: ["**/*"],
            "secondary-artifacts": {
              [this.cdkOutputArtifactName]: {
                "base-directory": "packages/cdk/cdk.out",
                files: ["**/*"],
              },
              ...orderedApiStages.reduce(
                (acc, stage) => ({
                  ...acc,
                  [getAPIBuildArtifactName(stage)]: {
                    "base-directory": `.`,
                    files: ["**/*"],
                  },
                }),
                {},
              ),
            },
          },
        }),
      },
    );
  }
}
