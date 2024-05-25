#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SharedStack } from "../lib/sharedStack/shared-stack";
import {
  SharedCdkPipelineStack,
  sharedCdkPipelineStages,
} from "../lib/pipelines/sharedPipelineStack/shared-pipeline-stack";
import { SharedCdkPipelineAccount } from "../config/accounts";
import { SharedCdkStage } from "../config/stage";
import { stackName } from "../lib/helpers/resourceHelpers";

const app = new cdk.App();

const stacks: Record<SharedCdkStage, SharedStack> =
  sharedCdkPipelineStages.reduce(
    (acc, stage) => ({
      ...acc,
      [stage]: new SharedStack(app, stackName("SharedResourcesStack", stage), {
        stage,
      }),
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
