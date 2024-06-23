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
    super(scope, id, props, "UTK-Shared");

    this.createMediaAssetsS3Bucket();
  }

  createMediaAssetsS3Bucket() {
    const bucket = new s3.Bucket(this, `Media-Bucket`, {
      bucketName: this.getResourceName("Media-Bucket", {
        lowerCase: true,
        stage: this.props.stage,
      }),
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      cors: [
        {
          allowedHeaders: ["*"],
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
          allowedOrigins: ["*"],
          exposedHeaders: ["ETag"],
          maxAge: 0,
        },
      ],
    });

    bucket.addLifecycleRule({
      id: "DeleteTempFiles",
      prefix: "temp/",
      expiration: cdk.Duration.days(1),
    });
  }
}
