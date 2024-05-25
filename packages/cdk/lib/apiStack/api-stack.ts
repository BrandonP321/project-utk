import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkStack } from "../cdk-stack";
import { APIStage } from "../../config/stage";

export class APIStack extends CdkStack<APIStage> {
  constructor(scope: Construct, id: string, props: CdkStack.Props<APIStage>) {
    super(scope, id, props);
  }
}
