import * as codebuild from "aws-cdk-lib/aws-codebuild";
import {
  CodeArtifactRepoDomain,
  CodeArtifactRepoName,
} from "./codeartifactHelpers";

export const codebuildLambdaEnvironment: codebuild.BuildEnvironment = {
  privileged: false,
  computeType: codebuild.ComputeType.LAMBDA_4GB,
  buildImage: codebuild.LinuxLambdaBuildImage.AMAZON_LINUX_2023_NODE_20,
};

export const codebuildInstallPhase = {
  commands: [
    'echo "Setting up CodeArtifact credentials"',
    ". bin/set-artifact-token.sh",
    `aws codeartifact login --tool npm --repository ${CodeArtifactRepoName} --domain ${CodeArtifactRepoDomain}`,
    "echo 'Installing dependencies'",
    "yarn install --immutable",
  ],
};

export const codebuildPreBuildPhase = {
  commands: ["echo 'Pre build memory usage: ' && free -m"],
};

export const codebuildPostBuildPhase = {
  commands: ["echo 'Post build memory usage: ' && free -m"],
};

export const codebuildDefaultEnvironmentVariables: Record<
  string,
  codebuild.BuildEnvironmentVariable
> = {};
