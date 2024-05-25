import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { CdkStack } from "../cdk-stack";
import { SharedCdkStage } from "../../config/stage";

export class SharedStack extends CdkStack<SharedCdkStage> {
  constructor(
    scope: Construct,
    id: string,
    props: CdkStack.Props<SharedCdkStage>,
  ) {
    super(scope, id, props);

    this.createMediaAssetsS3Bucket();
  }

  createMediaAssetsS3Bucket() {
    const bucket = new s3.Bucket(this, `Media-Bucket`, {
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    bucket.addLifecycleRule({
      id: "DeleteTempFiles",
      prefix: "temp/",
      expiration: cdk.Duration.days(1),
    });
  }
}
