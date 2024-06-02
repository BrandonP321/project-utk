import * as cdk from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions";

export const addSourcePipelineStage = (
  pipeline: codepipeline.Pipeline,
  output: codepipeline.Artifact,
  props: {
    secondaryActions?: codepipelineActions.CodeBuildAction[];
  },
) =>
  pipeline.addStage({
    stageName: "Source",
    actions: [
      new codepipelineActions.GitHubSourceAction({
        actionName: "Source",
        output,
        oauthToken: cdk.SecretValue.secretsManager("github-token"),
        repo: "project-utk",
        owner: "BrandonP321",
        branch: "main",
      }),
      ...(props.secondaryActions || []),
    ],
  });
