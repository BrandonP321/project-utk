#!/user/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { stackName } from "../lib/helpers/resourceHelpers";
import { APIStack } from "../lib/apiStack/api-stack";
import { APIStage, orderedApiStages } from "../config/stage";
import { APIAccounts, APIPipelineAccount } from "../config/accounts";
import { APIPipelineStack } from "../lib/pipelines/apiPipelineStack/api-pipeline-stack";

const app = new cdk.App();

const apiStacks: Record<APIStage, APIStack> = orderedApiStages.reduce(
  (acc, stage) => ({
    ...acc,
    [stage]: new APIStack(app, stackName("APIStack", stage), {
      stage,
      env: {
        account: APIAccounts[stage].account,
        region: APIAccounts[stage].region,
      },
    }),
  }),
  {} as Record<APIStage, APIStack>,
);

const pipelineStack = new APIPipelineStack(app, stackName("APIPipelineStack"), {
  stageStacks: apiStacks,
  pipelineName: stackName("API-Pipeline"),
  env: APIPipelineAccount,
});

app.synth();
