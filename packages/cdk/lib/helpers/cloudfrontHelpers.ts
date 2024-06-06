import * as codebuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";
import { stackName } from "./resourceHelpers";
import { codebuildLambdaEnvironment } from "./codebuildHelpers";

export const getCFDistributionArn = (distId: string, account: string) =>
  `arn:aws:cloudfront::${account}:distribution/${distId}`;

export const getCFInvalidationCodebuildProject = (
  scope: Construct,
  id: string,
  stage: string,
  distributionId: string,
): codebuild.PipelineProject =>
  new codebuild.PipelineProject(scope, id, {
    projectName: stackName("CFInvalidation", { stage }),
    environment: {
      ...codebuildLambdaEnvironment,
      environmentVariables: {
        CF_DISTRIBUTION_ID: {
          value: distributionId,
        },
      },
    },
    buildSpec: codebuild.BuildSpec.fromObject({
      version: "0.2",
      phases: {
        build: {
          commands: [
            `aws cloudfront create-invalidation --distribution-id $CF_DISTRIBUTION_ID --paths "/*"`,
          ],
        },
      },
    }),
  });
