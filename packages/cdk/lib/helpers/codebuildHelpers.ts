import * as codebuild from "aws-cdk-lib/aws-codebuild";

export const codebuildLambdaEnvironment: codebuild.BuildEnvironment = {
  privileged: false,
  computeType: codebuild.ComputeType.LAMBDA_4GB,
  buildImage: codebuild.LinuxLambdaBuildImage.AMAZON_LINUX_2023_NODE_20,
};

export const codebuildInstallPhase = (
  repoName: string,
  repoDomainName: string,
) => ({
  commands: [
    'echo "Setting up CodeArtifact credentials"',
    ". bin/set-artifact-token.sh",
    `aws codeartifact login --tool npm --repository ${repoName} --domain ${repoDomainName}`,
    "echo 'Installing dependencies'",
    "yarn install --immutable",
  ],
});

export const codebuildPreBuildPhase = {
  commands: ["echo 'Pre build memory usage: ' && free -m"],
};

export const codebuildPostBuildPhase = {
  commands: ["echo 'Post build memory usage: ' && free -m"],
};

export const codebuildDefaultEnvironmentVariables: Record<
  string,
  codebuild.BuildEnvironmentVariable
> = {
  FONTAWESOME_NPM_AUTH_TOKEN: {
    value: "74BF9580-6A40-4C4E-ABEE-33976F854B74",
    type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
  },
};
