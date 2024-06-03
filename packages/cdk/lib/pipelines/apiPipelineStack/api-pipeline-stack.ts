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
  codebuildDockerEnvironment,
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

  filterSourceProjectBuildSpecArtifacts = {
    "base-directory": ".",
    files: ["**/*"],
    "exclude-paths": ["./packages/web/**/*"],
  };

  getDockerRunJson() {
    return {
      AWSEBDockerrunVersion: "1",
      Image: {
        Name: "%s",
        Update: "true",
      },
      Ports: [
        {
          ContainerPort: "8000",
        },
      ],
    };
  }

  buildStageCodeBuildProject() {
    return new codebuild.PipelineProject(
      this,
      stackName("API-Pipeline-Build-Project"),
      {
        projectName: stackName("API-Pipeline-Build-Project"),
        environment: {
          ...codebuildDockerEnvironment,
          environmentVariables: {
            ...codebuildDefaultEnvironmentVariables,
            REPOSITORY_URI: {
              value: this.ecrRepo.repositoryUri,
            },
            AWS_ACCOUNT_ID: {
              value: this.props.env?.account,
            },
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
                "export TAG=$(echo $CODEBUILD_BUILD_ID | cut -d ':' -f 2)",
              ],
            },
            build: {
              commands: [
                "echo 'Synthesizing CDK stacks for all API stages...'",
                "yarn cdk synth:api",

                "echo Moving Docker files to root directory...",
                "chmod +x ./bin/move-api-docker-files.sh",
                "./bin/move-api-docker-files.sh",

                "echo Building the API Docker image...",
                "docker build --build-arg UTK_CODEARTIFACT_AUTH_TOKEN=$UTK_CODEARTIFACT_AUTH_TOKEN -t $REPOSITORY_URI:$TAG .",

                "echo 'Tagging the Docker image as latest...'",
                "docker tag $REPOSITORY_URI:$TAG $REPOSITORY_URI:latest",
              ],
            },
            post_build: {
              commands: [
                "echo Pushing the Docker images...",
                "docker push $REPOSITORY_URI:$TAG",
                "docker push $REPOSITORY_URI:latest",

                "echo Writing Dockerrun.aws.json file...",
                `printf '${JSON.stringify(this.getDockerRunJson())}' $REPOSITORY_URI:$TAG > Dockerrun.aws.json`,
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
                    files: ["Dockerrun.aws.json"],
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
