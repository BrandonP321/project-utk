import { Construct } from "constructs";
import { APIStage } from "../../../config/stage";
import { APIStack } from "../../apiStack/api-stack";
import { CdkPipeline } from "../../cdk-pipeline";

export class APIPipelineStack extends CdkPipeline<APIStack, APIStage> {
  constructor(
    scope: Construct,
    id: string,
    props: CdkPipeline.Props<APIStack, APIStage>,
  ) {
    super(scope, id, props);

    // Source stage
    this.addSourceStage();
  }
}
