import * as cdk from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { getStageValueFunc } from "./helpers/stageHelpers";
import { StackNameParams, stackName } from "./helpers/resourceHelpers";

export namespace CdkStack {
  export type Props<Stage extends string> = cdk.StackProps & {
    stage: Stage;
  };
}

export class CdkStack<Stage extends string> extends cdk.Stack {
  protected props: CdkStack.Props<Stage>;
  protected resourceNamePrefix = "UTK";
  protected readonly appDomain = "project-utk.com";
  protected readonly hostedZone = route53.HostedZone.fromLookup(
    this,
    "HostedZone",
    { domainName: this.appDomain },
  );
  getStageValue: ReturnType<typeof getStageValueFunc<Stage>>;

  getResourceName(name: string, params?: StackNameParams) {
    return stackName(name, {
      ...params,
      prefixOverride: this.resourceNamePrefix,
    });
  }

  constructor(
    scope: Construct,
    id: string,
    props: CdkStack.Props<Stage>,
    resourceNamePrefix?: string,
  ) {
    super(scope, id, props);

    this.props = props;
    this.resourceNamePrefix = resourceNamePrefix || this.resourceNamePrefix;
    this.getStageValue = getStageValueFunc(props.stage);
  }
}
