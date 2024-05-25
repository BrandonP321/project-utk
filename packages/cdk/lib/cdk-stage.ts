import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export namespace CdkStage {
  export type Props<Stage extends string> = cdk.StageProps & {
    stage: Stage;
  };
}

export class CdkStage<Stage extends string> extends cdk.Stage {
  protected props: CdkStage.Props<Stage>;

  constructor(scope: Construct, id: string, props: CdkStage.Props<Stage>) {
    super(scope, id, props);

    this.props = props;
  }
}
