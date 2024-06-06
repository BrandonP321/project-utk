#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SharedStack } from "../lib/sharedStack/shared-stack";
import {
  SharedCdkPipelineStack,
  sharedCdkPipelineStages,
} from "../lib/pipelines/sharedPipelineStack/shared-pipeline-stack";
import {
  SharedCdkPipelineAccount,
  SharedCdkAccounts,
} from "../config/accounts";
import { SharedCdkStage } from "../config/stage";
import { stackName } from "../lib/helpers/resourceHelpers";

const app = new cdk.App();

const stacks: Record<SharedCdkStage, SharedStack> =
  sharedCdkPipelineStages.reduce(
    (acc, stage) => ({
      ...acc,
      [stage]: new SharedStack(
        app,
        stackName("SharedResourcesStack", { stage }),
        {
          stage,
          env: {
            account: SharedCdkAccounts[stage].account,
            region: SharedCdkAccounts[stage].region,
          },
        },
      ),
    }),
    {} as Record<SharedCdkStage, SharedStack>,
  );

const pipelineStack = new SharedCdkPipelineStack(
  app,
  stackName("SharedResourcesPipelineStack"),
  {
    env: SharedCdkPipelineAccount,
    stageStacks: stacks,
  },
);

app.synth();
