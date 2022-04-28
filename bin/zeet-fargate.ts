#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ZeetFargateStack } from "../lib/zeet-fargate-stack";
import { config, validate } from "../lib/config";

validate(config);

const app = new cdk.App();
new ZeetFargateStack(app, config.ZEET_CDK_STACK_ID, {
  env: {
    account: process.env.ZEET_CDK_ACCOUNT,
    region: process.env.ZEET_CDK_REGION,
  },
});
