import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { stackName } from "./resourceHelpers";

export const createReactAppStaticAssetsBucket = (
  scope: Construct,
  id: string,
  stage: string,
) => {
  return new s3.Bucket(scope, id, {
    bucketName: stackName(id, stage, true),
    websiteIndexDocument: "index.html",
    websiteErrorDocument: "index.html",
    publicReadAccess: true,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
  });
};
