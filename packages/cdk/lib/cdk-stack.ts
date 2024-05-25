import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export namespace CdkStack {
  export type Props<Stage extends string> = cdk.StackProps & {
    stage: Stage;
  };
}

export class CdkStack<Stage extends string> extends cdk.Stack {
  protected props: CdkStack.Props<Stage>;

  constructor(scope: Construct, id: string, props: CdkStack.Props<Stage>) {
    super(scope, id, props);

    this.props = props;
  }
}
