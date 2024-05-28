#!/user/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { stackName } from "../lib/helpers/resourceHelpers";
import { APIStack } from "../lib/apiStack/api-stack";
import { APIStage } from "../config/stage";
import { APIAccounts } from "../config/accounts";

const app = new cdk.App();

const apiStack = new APIStack(app, stackName("APIStack"), {
  stage: APIStage.DEV,
  env: {
    account: APIAccounts[APIStage.DEV].account,
    region: APIAccounts[APIStage.DEV].region,
  },
});

app.synth();
