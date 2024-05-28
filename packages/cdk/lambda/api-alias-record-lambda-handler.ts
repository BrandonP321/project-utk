import {
  Route53Client,
  ChangeResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";
import {
  ElasticBeanstalkClient,
  DescribeEnvironmentsCommand,
} from "@aws-sdk/client-elastic-beanstalk";
import { CloudFormationCustomResourceHandler } from "aws-lambda";
import { EBRegionHostedZoneIdMap } from "../lib/helpers/elasticbeanstalkHelpers";

const route53 = new Route53Client({});
const elasticbeanstalk = new ElasticBeanstalkClient({});

export const handler: CloudFormationCustomResourceHandler = async (event) => {
  const { RequestType, ResourceProperties } = event;
  const { RecordName, EnvironmentName } = ResourceProperties;

  const hostedZoneId = process.env.HOSTED_ZONE_ID!;
  const ebEnvRegion = process.env.EB_ENV_REGION!;

  if (RequestType === "Delete") {
    // Handle delete request if necessary
    return;
  }

  // Get the Elastic Beanstalk environment information
  const describeEnvironmentsCommand = new DescribeEnvironmentsCommand({
    EnvironmentNames: [EnvironmentName],
  });
  const environment = await elasticbeanstalk.send(describeEnvironmentsCommand);

  const environmentUrl = environment.Environments?.[0]?.CNAME;
  if (!environmentUrl) {
    throw new Error(`Failed to get the environment URL for ${EnvironmentName}`);
  }

  // Create or update the Route 53 alias record
  const changeResourceRecordSetsCommand = new ChangeResourceRecordSetsCommand({
    HostedZoneId: hostedZoneId,
    ChangeBatch: {
      Changes: [
        {
          Action: RequestType === "Create" ? "CREATE" : "UPSERT",
          ResourceRecordSet: {
            Name: RecordName,
            Type: "A",
            AliasTarget: {
              DNSName: environmentUrl,
              HostedZoneId: EBRegionHostedZoneIdMap[ebEnvRegion], // Elastic Beanstalk hosted zone ID for your region
              EvaluateTargetHealth: false,
            },
          },
        },
      ],
    },
  });
  await route53.send(changeResourceRecordSetsCommand);

  // return {
  //   PhysicalResourceId: `EBAliasRecord-${RecordName}`,
  // };
};
