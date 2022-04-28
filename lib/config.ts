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

export const config: Config = {
  ZEET_CDK_ACCOUNT: process.env.ZEET_CDK_ACCOUNT || "",
  ZEET_CDK_REGION: process.env.ZEET_CDK_REGION || "",
  ZEET_CDK_STACK_ID: process.env.ZEET_CDK_STACK_ID || "ZeetFargateStack",
  ZEET_CDK_FARGATE_VPC_ID: process.env.ZEET_CDK_FARGATE_VPC_ID || "",
  ZEET_CDK_FARGATE_CONTAINER_REPOSITORY_ARN:
    process.env.ZEET_CDK_FARGATE_CONTAINER_REPOSITORY_ARN || "",
  ZEET_CDK_FARGATE_CONTAINER_IMAGE:
    process.env.ZEET_CDK_FARGATE_CONTAINER_IMAGE || "",
  ZEET_CDK_FARGATE_HTTP_PORT: parseInt(
    process.env.ZEET_CDK_FARGATE_HTTP_PORT || "0"
  ),
  ZEET_CDK_FARGATE_CPU: parseInt(process.env.ZEET_CDK_FARGATE_CPU || "256"),
  ZEET_CDK_FARGATE_MEMORY: parseInt(
    process.env.ZEET_CDK_FARGATE_MEMORY || "512"
  ),
  ZEET_CDK_FARGATE_REPLICA: parseInt(
    process.env.ZEET_CDK_FARGATE_REPLICA || "1"
  ),
};

export const validate = (config: Config) => {
  if (!config.ZEET_CDK_FARGATE_CONTAINER_IMAGE) {
    throw new Error("ZEET_CDK_FARGATE_CONTAINER_IMAGE must be set");
  }
};
