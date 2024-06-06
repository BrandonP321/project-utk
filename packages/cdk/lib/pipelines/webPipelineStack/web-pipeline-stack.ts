import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions";
import { Construct } from "constructs";
import { WebStage, orderedWebStages } from "../../../config/stage";
import { CdkPipeline } from "../../cdk-pipeline";
import { WebStack } from "../../webStack/web-stack";
import { stackName } from "../../helpers/resourceHelpers";
import {
  codebuildDefaultEnvironmentVariables,
  codebuildInstallPhase,
  codebuildLambdaEnvironment,
} from "../../helpers/codebuildHelpers";
import { addCodeArtifactPolicyToRole } from "../../helpers/codeartifactHelpers";
import { capitalize } from "lodash";
import { getCFInvalidationCodebuildProject } from "../../helpers/cloudfrontHelpers";

export class WebPipelineStack extends CdkPipeline<WebStack, WebStage> {
  WebBuildOutputArtifactName = "WebBuildOutput";
  webBuildOutput = new codepipeline.Artifact(this.WebBuildOutputArtifactName);

  constructor(
    scope: Construct,
    id: string,
    props: CdkPipeline.Props<WebStack, WebStage>,
  ) {
    super(scope, id, "UTK-Web-Pipeline", props);

    this.addSourceStage();
    this.addSourceFilterStage();

    // Build stage
    const project = this.buildStageCodeBuildProject();

    addCodeArtifactPolicyToRole(project.role!);

    this.pipeline.addStage({
      stageName: "Build",
      actions: [
        new codepipelineActions.CodeBuildAction({
          actionName: "Build",
          project,
          input: this.sourceOutput,
          outputs: [this.cdkOutput, this.webBuildOutput],
        }),
      ],
    });

    orderedWebStages.forEach((stage) => {
      const stack = this.props.stageStacks[stage];
      const invalidationProject = getCFInvalidationCodebuildProject(
        this,
        "Invalidate-Cache",
        stage,
        stack.cfDistribution.distributionId,
      );

      stack.addPoliciesToPipelineRole(invalidationProject.role!);

      this.pipeline.addStage({
        stageName: capitalize(stage),
        actions: [
          this.getStackUpdateStageActions(stack, stage, { runOrder: 1 }),
          new codepipelineActions.S3DeployAction({
            actionName: "Upload-Web-Assets",
            input: this.webBuildOutput,
            bucket: stack.staticsBucket,
            runOrder: 2,
          }),
          new codepipelineActions.CodeBuildAction({
            actionName: "Invalidate-Cache",
            project: invalidationProject,
            input: this.webBuildOutput,
            runOrder: 3,
          }),
          new codepipelineActions.ManualApprovalAction({
            actionName: "Approve-Deploy",
            runOrder: 4,
          }),
        ],
      });
    });
  }

  filterSourceProjectBuildSpecArtifacts = {
    "base-directory": ".",
    files: ["**/*"],
    "exclude-paths": ["./packages/api/**/*"],
  };

  buildStageCodeBuildProject() {
    return new codebuild.PipelineProject(this, "WebBuildProject", {
      projectName: stackName("Web-Build-Project"),
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
          build: {
            commands: [
              "echo Synthesizing CDK stacks for all Web stages...",
              "yarn cdk synth:web",

              "echo Building web application...",
              "yarn web build",
            ],
          },
        },
        artifacts: {
          "base-directory": "packages/cdk/cdk.out",
          files: ["**/*"],
          "secondary-artifacts": {
            [this.cdkOutputArtifactName]: {
              "base-directory": "packages/cdk/cdk.out",
              files: ["**/*"],
            },
            [this.WebBuildOutputArtifactName]: {
              "base-directory": "./packages/web/build",
              files: ["**/*"],
            },
          },
        },
      }),
    });
  }
}
