#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SharedStack } from "../lib/sharedStack/shared-stack";
import { SharedCdkPipelineStack } from "../lib/pipelines/sharedPipelineStack/shared-pipeline-stack";
import { SharedCdkPipelineAccount } from "../config/accounts";

const app = new cdk.App();

const pipelineStack = new SharedCdkPipelineStack(
  app,
  "UTK-SharedPipelineStack",
  {
    env: SharedCdkPipelineAccount,
  },
);

app.synth();
