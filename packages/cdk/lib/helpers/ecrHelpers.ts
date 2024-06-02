import * as iam from "aws-cdk-lib/aws-iam";

export function AddEcrPoliciesToRole(role: iam.IRole) {
  role?.addToPrincipalPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["ecr:GetAuthorizationToken"],
      resources: ["*"],
    }),
  );
}
