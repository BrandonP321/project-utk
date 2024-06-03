import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";
import { WebStage } from "../../config/stage";
import { CdkStack } from "../cdk-stack";
import { createReactAppStaticAssetsBucket } from "../helpers/s3Helpers";
import { getCFDistributionArn } from "../helpers/cloudfrontHelpers";

export class WebStack extends CdkStack<WebStage> {
  staticsBucket: s3.Bucket;
  siteCertificate: acm.Certificate;
  cfDistribution: cloudfront.CloudFrontWebDistribution;
  subdomain = this.getStageValue("", {
    dev: "dev",
    staging: "staging",
  });
  appUrl = this.subdomain
    ? `${this.subdomain}.${this.appDomain}`
    : this.appDomain;

  constructor(scope: Construct, id: string, props: CdkStack.Props<WebStage>) {
    super(scope, id, props);

    this.staticsBucket = createReactAppStaticAssetsBucket(
      this,
      "StaticsBucket",
      this.props.stage,
    );

    this.siteCertificate = new acm.Certificate(this, "SiteCertificate", {
      domainName: this.appUrl,
      subjectAlternativeNames: [`www.${this.appUrl}`],
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });

    this.cfDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "CFDistribution",
      {
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          this.siteCertificate,
          { aliases: [this.appUrl, `www.${this.appUrl}`] },
        ),
        originConfigs: [
          {
            customOriginSource: {
              domainName: this.staticsBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      },
    );

    new route53.ARecord(this, "AliasRecord", {
      recordName: this.appUrl,
      zone: this.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(this.cfDistribution),
      ),
    });

    new route53.CnameRecord(this, "WwwAliasRecord", {
      recordName: `www.${this.appUrl}`,
      zone: this.hostedZone,
      domainName: this.cfDistribution.distributionDomainName,
    });

    new cdk.CfnOutput(this, "StaticsBucketName", {
      value: this.staticsBucket.bucketName,
    });
    new cdk.CfnOutput(this, "CFDistributionId", {
      value: this.cfDistribution.distributionId,
    });
  }

  addPoliciesToPipelineRole(role: iam.IRole) {
    // Add permissions to invalidate the CloudFront cache
    role.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["cloudfront:CreateInvalidation"],
        resources: [
          getCFDistributionArn(
            this.cfDistribution.distributionId,
            this.props.env?.account!,
          ),
        ],
      }),
    );
  }
}
