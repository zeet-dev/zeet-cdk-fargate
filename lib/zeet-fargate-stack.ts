import { Stack, StackProps } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";
import {
  CpuArchitecture,
  FargateTaskDefinition,
  OperatingSystemFamily,
} from "aws-cdk-lib/aws-ecs";
import * as ecspatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as logs from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { config } from "./config";

export class ZeetFargateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, "Vpc", {
      vpcId: config.ZEET_CDK_FARGATE_VPC_ID,
    });

    const cluster = new ecs.Cluster(this, "Cluster", {
      containerInsights: true,
      vpc,
    });

    let image: ecs.ContainerImage;

    if (config.ZEET_CDK_FARGATE_CONTAINER_REPOSITORY_ARN) {
      const repository = ecr.Repository.fromRepositoryArn(
        this,
        "Repository",
        config.ZEET_CDK_FARGATE_CONTAINER_REPOSITORY_ARN
      );

      const tag = config.ZEET_CDK_FARGATE_CONTAINER_IMAGE.split(":").pop();

      image = ecs.ContainerImage.fromEcrRepository(repository, tag);
    } else {
      image = ecs.ContainerImage.fromRegistry(
        config.ZEET_CDK_FARGATE_CONTAINER_IMAGE
      );
    }

    const executionRole = new iam.Role(this, "ExecRole", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
    });
    executionRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "AmazonECSTaskExecutionRolePolicy"
      )
    );

    const taskDefinition = new FargateTaskDefinition(this, "Task", {
      runtimePlatform: {
        cpuArchitecture: CpuArchitecture.X86_64,
        operatingSystemFamily: OperatingSystemFamily.LINUX,
      },
      cpu: config.ZEET_CDK_FARGATE_CPU,
      memoryLimitMiB: config.ZEET_CDK_FARGATE_MEMORY,
      executionRole,
    });

    const container = taskDefinition.addContainer("Container", {
      image,
      environmentFiles: config.ZEET_CDK_FARGATE_ENV_FILE
        ? [ecs.EnvironmentFile.fromAsset(config.ZEET_CDK_FARGATE_ENV_FILE)]
        : undefined,
    });

    if (config.ZEET_CDK_FARGATE_HTTP_PORT) {
      container.addPortMappings({
        containerPort: config.ZEET_CDK_FARGATE_HTTP_PORT,
      });

      new ecspatterns.ApplicationLoadBalancedFargateService(this, "Service", {
        cluster,
        assignPublicIp: true,
        taskDefinition,
        desiredCount: config.ZEET_CDK_FARGATE_REPLICA,
      });
    } else {
      new ecs.FargateService(this, "Service", {
        cluster,
        assignPublicIp: true,
        taskDefinition,
        desiredCount: config.ZEET_CDK_FARGATE_REPLICA,
      });
    }
  }
}
