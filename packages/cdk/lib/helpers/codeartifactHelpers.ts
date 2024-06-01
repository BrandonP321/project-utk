import * as iam from "aws-cdk-lib/aws-iam";
import * as codeartifact from "aws-cdk-lib/aws-codeartifact";
import * as cdk from "aws-cdk-lib";
import { SharedCdkPipelineAccount } from "../../config/accounts";

export const CodeArtifactRepoDomain = "utk-codeartifacts";
export const CodeArtifactRepoName = "utk-codeartifact-repo";

const codeArtifactAccount = SharedCdkPipelineAccount;

function getCodeArtifactRepoArn() {
    return `arn:aws:codeartifact:${codeArtifactAccount.region}:${codeArtifactAccount.account}:repository/${CodeArtifactRepoDomain}/${CodeArtifactRepoName}`;
}

function getCodeArtifactDomainArn() {
    return `arn:aws:codeartifact:${codeArtifactAccount.region}:${codeArtifactAccount.account}:domain/${CodeArtifactRepoDomain}`;
}

export function addCodeArtifactPolicyToRole(
    role: iam.IRole,
    repo?: codeartifact.CfnRepository,
    domain?: codeartifact.CfnDomain,
  ) {
    role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "codeartifact:GetAuthorizationToken",
          "codeartifact:ReadFromRepository",
          "codeartifact:DescribePackageVersion",
          "codeartifact:DescribeRepository",
          "codeartifact:GetRepositoryEndpoint",
          "codeartifact:ReadFromAsset",
          "codeartifact:ReadPackageVersionAsset",
        ],
        resources: [
          repo?.attrArn ?? getCodeArtifactRepoArn(),
          domain?.attrArn ?? getCodeArtifactDomainArn(),
        ],
      }),
    );

    role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["sts:GetServiceBearerToken"],
        resources: ["*"],
        conditions: {
          StringEquals: {
            "sts:AWSServiceName": "codeartifact.amazonaws.com",
          },
        },
      }),
    );
  }