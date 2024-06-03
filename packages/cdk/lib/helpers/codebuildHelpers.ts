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

export const codebuildDockerEnvironment: codebuild.BuildEnvironment = {
  privileged: true,
  computeType: codebuild.ComputeType.MEDIUM,
  // `aws/codebuild/standard:7.0` build image comes with Node.js 20.x pre-installed
  buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
};

export const codebuildInstallPhase = {
  commands: [
    'echo "Setting up CodeArtifact credentials"',
    ". bin/set-artifact-token.sh",

    "echo 'Installing dependencies'",
    "YARN_ENABLE_IMMUTABLE_INSTALLS=false && yarn install",
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
