import * as cdk from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipelineActions from "aws-cdk-lib/aws-codepipeline-actions";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { addSourcePipelineStage } from "./helpers/codepipelineHelpers";
import { CdkStack } from "./cdk-stack";
import { capitalize } from "lodash";
import { codebuildLambdaEnvironment } from "./helpers/codebuildHelpers";
import { StackNameParams, stackName } from "./helpers/resourceHelpers";
import { string } from "yup";

type BuildSpecArtifact = {
  "base-directory": string;
  files: string[];
  "exclude-paths"?: string[];
};

export namespace CdkPipeline {
  export type Props<
    Stack extends cdk.Stack,
    Stage extends string,
  > = cdk.StackProps & {
    stageStacks: Record<Stage, Stack>;
  };
}

export class CdkPipeline<
  Stack extends cdk.Stack,
  Stage extends string,
> extends cdk.Stack {
  props: CdkPipeline.Props<Stack, Stage>;
  pipeline: codepipeline.Pipeline;
  rawSourceOutput = new codepipeline.Artifact();
  sourceOutput = new codepipeline.Artifact();
  cdkOutputArtifactName = "CDKOutputArtifact";
  cdkOutput = new codepipeline.Artifact(this.cdkOutputArtifactName);
  pipelineRole: iam.Role;
  /** Prefix for all resources created by this stack */
  resourceNamePrefix = "UTK";

  constructor(
    scope: Construct,
    id: string,
    resourceNamePrefix: string,
    props: CdkPipeline.Props<Stack, Stage>,
  ) {
    super(scope, id, props);

    this.props = props;
    this.resourceNamePrefix = resourceNamePrefix;

    const artifactBucket = new s3.Bucket(this, "Pipeline-Artifacts", {
      bucketName: this.getPipelineResourceName("Artifacts", {
        lowerCase: true,
      }),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      lifecycleRules: [{ expiration: cdk.Duration.days(1) }],
    });

    this.pipelineRole = new iam.Role(this, "Pipeline-Role", {
      assumedBy: new iam.ServicePrincipal("codepipeline.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
      ],
    });

    this.pipeline = new codepipeline.Pipeline(
      this,
      this.getPipelineResourceName("Pipeline"),
      {
        artifactBucket,
        restartExecutionOnUpdate: true,
        pipelineName: this.getPipelineResourceName("Pipeline"),
        role: this.pipelineRole,
      },
    );
  }

  /** Appends `this.resourceNamePrefix` to name argument */
  getPipelineResourceName(name: string, params?: StackNameParams) {
    return stackName(name, {
      ...params,
      prefixOverride: this.resourceNamePrefix,
    });
  }

  addSourceStage() {
    return addSourcePipelineStage(this.pipeline, this.rawSourceOutput, {});
  }

  addSourceFilterStage() {
    this.pipeline.addStage({
      stageName: "Filter-Source",
      actions: [
        new codepipelineActions.CodeBuildAction({
          actionName: "Filter-Source",
          project: this.getFilterSourceProject(),
          input: this.rawSourceOutput,
          outputs: [this.sourceOutput],
        }),
      ],
    });
  }

  filterSourceProjectBuildSpecArtifacts: BuildSpecArtifact = {
    "base-directory": ".",
    files: ["**/*"],
  };

  getFilterSourceProject = () =>
    new codebuild.PipelineProject(this, "Filter-Source-Project", {
      projectName: this.getPipelineResourceName("Filter-Source-Project"),
      environment: {
        ...codebuildLambdaEnvironment,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {},
        artifacts: this.filterSourceProjectBuildSpecArtifacts,
      }),
    });

  getStackUpdateStageActions(
    stack: CdkStack<string>,
    stage: string,
    options?: Partial<codepipelineActions.CloudFormationCreateUpdateStackActionProps>,
  ) {
    return new codepipelineActions.CloudFormationCreateUpdateStackAction({
      actionName: `Deploy-${capitalize(stage)}-CDK-Stacks`,
      templatePath: this.cdkOutput.atPath(`${stack.stackName}.template.json`),
      stackName: stack.stackName,
      adminPermissions: true,
      extraInputs: [this.cdkOutput],
      role: this.pipelineRole,
      ...options,
    });
  }
}
