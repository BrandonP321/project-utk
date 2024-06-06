import * as cdk from "aws-cdk-lib";
import { WebStage, orderedWebStages } from "../config/stage";
import { WebStack } from "../lib/webStack/web-stack";
import { WebAccounts, WebPipelineAccount } from "../config/accounts";
import { stackName } from "../lib/helpers/resourceHelpers";
import { WebPipelineStack } from "../lib/pipelines/webPipelineStack/web-pipeline-stack";

const app = new cdk.App();

const webStacks: Record<WebStage, WebStack> = orderedWebStages.reduce(
  (acc, stage) => ({
    ...acc,
    [stage]: new WebStack(app, stackName("WebStack", { stage }), {
      stage,
      env: {
        account: WebAccounts[stage].account,
        region: WebAccounts[stage].region,
      },
    }),
  }),
  {} as Record<WebStage, WebStack>,
);

const pipelineStack = new WebPipelineStack(app, stackName("WebPipelineStack"), {
  stageStacks: webStacks,
  env: WebPipelineAccount,
});

app.synth();
