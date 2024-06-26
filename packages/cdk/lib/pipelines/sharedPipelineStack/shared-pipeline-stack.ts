import * as CodePipelineAction from "aws-cdk-lib/aws-codepipeline-actions";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codeartifact from "aws-cdk-lib/aws-codeartifact";
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
import {
  CodeArtifactRepoDomain,
  CodeArtifactRepoName,
  addCodeArtifactPolicyToRole,
} from "../../helpers/codeartifactHelpers";

export const sharedCdkPipelineStages: SharedCdkStage[] = [
  SharedCdkStage.DEV,
  SharedCdkStage.PROD,
];

export class SharedCdkPipelineStack extends CdkPipeline<
  SharedStack,
  SharedCdkStage
> {
  codeArtifactRepo: codeartifact.CfnRepository;
  codeArtifactDomain: codeartifact.CfnDomain;

  constructor(
    scope: Construct,
    id: string,
    props: CdkPipeline.Props<SharedStack, SharedCdkStage>,
  ) {
    super(scope, id, "UTK-Shared-Pipeline", props);

    this.createCodeArtifactRepo();

    // Source stage
    this.addSourceStage();
    this.addSourceFilterStage();

    // Build stage
    const project = this.buildStageCodeBuildProject();

    addCodeArtifactPolicyToRole(
      project.role!,
      this.codeArtifactRepo,
      this.codeArtifactDomain,
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
        stageName: capitalize(stage),
        actions: [this.getStackUpdateStageActions(stack, stage)],
      });
    });
  }

  filterSourceProjectBuildSpecArtifacts = {
    "base-directory": ".",
    files: ["**/*"],
    "exclude-paths": ["./packages/web/**/*", "./packages/api/**/*"],
  };

  createCodeArtifactRepo() {
    this.codeArtifactDomain = new codeartifact.CfnDomain(
      this,
      "UTK-CodeArtifact-Domain",
      { domainName: CodeArtifactRepoDomain },
    );

    const repo = new codeartifact.CfnRepository(this, "UTK-CodeArtifact-Repo", {
      repositoryName: CodeArtifactRepoName,
      domainName: this.codeArtifactDomain.domainName,
      externalConnections: ["public:npmjs"],
    });

    repo.addDependency(this.codeArtifactDomain);

    this.codeArtifactRepo = repo;
  }

  buildStageCodeBuildProject() {
    return new codebuild.PipelineProject(
      this,
      `UTK-Shared-Pipeline-Build-Project`,
      {
        projectName: this.getPipelineResourceName("Build-Project"),
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
