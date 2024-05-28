import * as cdk from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { getAPIStageValue, getStageValueFunc } from "./helpers/stageHelpers";

export namespace CdkStack {
  export type Props<Stage extends string> = cdk.StackProps & {
    stage: Stage;
  };
}

export class CdkStack<Stage extends string> extends cdk.Stack {
  protected props: CdkStack.Props<Stage>;
  protected readonly appDomain = "project-utk.com";
  protected readonly hostedZone = route53.HostedZone.fromLookup(
    this,
    "HostedZone",
    { domainName: this.appDomain },
  );
  getStageValue: ReturnType<typeof getStageValueFunc<Stage>>;

  constructor(scope: Construct, id: string, props: CdkStack.Props<Stage>) {
    super(scope, id, props);

    this.props = props;
    this.getStageValue = getStageValueFunc(props.stage);
  }
}
