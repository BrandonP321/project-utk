import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions";
import * as ecr from "aws-cdk-lib/aws-ecr";
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
import { addCodeArtifactPolicyToRole } from "../../helpers/codeartifactHelpers";
import { addSourcePipelineStage } from "../../helpers/codepipelineHelpers";
import { AddEcrPoliciesToRole } from "../../helpers/ecrHelpers";

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
  ecrRepo: ecr.Repository;
  /** Artifact to contain entire repo before filtering action runs */
  rawSourceOutput = new codepipeline.Artifact("RawSourceOutput");

  constructor(
    scope: Construct,
    id: string,
    props: CdkPipeline.Props<APIStack, APIStage>,
  ) {
    super(scope, id, props);

    this.ecrRepo = new ecr.Repository(this, "ECRRepo", {
      repositoryName: "utk-api-ecr-repo",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Source stage
    this.addSourceStage();
    /** Optimize by filtering out unnecessary packages from monorepo */
    this.addSourceFilterStage();

    // Build stage
    const project = this.buildStageCodeBuildProject();

    addCodeArtifactPolicyToRole(project.role!);
    AddEcrPoliciesToRole(project.role!);

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
          new codepipelineActions.ElasticBeanstalkDeployAction({
            actionName: `Deploy-API-${stage}`,
            applicationName: getApiEbAppName(stage),
            environmentName: getApiEbEnvName(stage),
            input: this.buidOutputMap[stage],
            runOrder: 2,
          }),
        ],
      });
    });
  }

  addSourceStage() {
    return addSourcePipelineStage(this.pipeline, this.rawSourceOutput, {});
  }

  addSourceFilterStage() {
    this.pipeline.addStage({
      stageName: "Filter-Source",
      actions: [
        new codepipelineActions.CodeBuildAction({
          actionName: "Filter-Source",
          project: this.filterSourceProject,
          input: this.rawSourceOutput,
          outputs: [this.sourceOutput],
        }),
      ],
    });
  }

  filterSourceProject = new codebuild.PipelineProject(
    this,
    stackName("Filter-Source-Project"),
    {
      projectName: stackName("Filter-Source-Project"),
      environment: {
        ...codebuildLambdaEnvironment,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {},
        artifacts: {
          "base-directory": ".",
          files: ["**/*"],
          "exclude-paths": ["./packages/web/**/*"],
        },
      }),
    },
  );

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
            REPOSITORY_URI: {
              value: this.ecrRepo.repositoryUri,
            },
            // AWS_ACCOUNT_ID: {
            //   value: this.props.env?.account,
            // },
            // AWS_DEFAULT_REGION: {
            //   value: this.props.env?.region,
            // },
          },
        },
        buildSpec: codebuild.BuildSpec.fromObject({
          version: "0.2",
          phases: {
            install: codebuildInstallPhase,
            pre_build: {
              commands: [
                "echo Logging in to Amazon ECR...",
                "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com",
                "export TAG=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)",
              ],
            },
            build: {
              commands: [
                "echo 'Synthesizing CDK stacks'",
                "yarn cdk synth:api",

                "echo 'Bundling API package'",
                "yarn api build",

                "echo 'Making move-api-procfile-to-root.sh executable'",
                "chmod +x bin/move-api-procfile-to-root.sh",

                "echo 'Moving API Procfile to project root'",
                "bin/move-api-procfile-to-root.sh",

                "echo Building the Docker image...",
                "docker build -t $REPOSITORY_URI:$TAG .",
                "docker tag $REPOSITORY_URI:$TAG $REPOSITORY_URI:latest",
              ],
            },
            post_build: {
              commands: [
                "echo Pushing the Docker images...",
                "docker push $REPOSITORY_URI:$TAG",
                "docker push $REPOSITORY_URI:latest",
                'printf \'[{"name":"api","imageUri":"%s"}]\' $REPOSITORY_URI:$TAG > imagedefinitions.json',
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
              ...orderedApiStages.reduce(
                (acc, stage) => ({
                  ...acc,
                  [getAPIBuildArtifactName(stage)]: {
                    "base-directory": `.`,
                    files: ["imagedefinitions.json"],
                    "exclude-paths": ["node_modules/**/*"],
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
