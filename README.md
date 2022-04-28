# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

# Zeet CDK Stack

Configuration:

```
type Config = {
  ZEET_CDK_ACCOUNT: string;
  ZEET_CDK_REGION: string;
  ZEET_CDK_STACK_ID: string;
  ZEET_CDK_FARGATE_VPC_ID: string;
  ZEET_CDK_FARGATE_CONTAINER_REPOSITORY_ARN: string;
  ZEET_CDK_FARGATE_CONTAINER_IMAGE: string;
  ZEET_CDK_FARGATE_HTTP_PORT: number;
  ZEET_CDK_FARGATE_CPU: number;
  ZEET_CDK_FARGATE_MEMORY: number;
  ZEET_CDK_FARGATE_REPLICA: number;
};
```
