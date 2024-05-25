import { Construct } from "constructs";
import { SharedCdkAccounts } from "../../../config/accounts";
import { SharedCdkStage } from "../../../config/stage";
import { CdkStage } from "../../cdk-stage";
import { SharedStack } from "../../sharedStack/shared-stack";

export class SharedStackStage extends CdkStage<SharedCdkStage> {
  constructor(
    scope: Construct,
    id: string,
    props: CdkStage.Props<SharedCdkStage>,
  ) {
    super(scope, id, props);

    const account = SharedCdkAccounts[props.stage];

    new SharedStack(this, `UTK-SharedStack-${props.stage}`, {
      ...props,
      env: account,
      stage: props.stage,
    });
  }
}
