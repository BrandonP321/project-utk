type EBEnvironmentProcessConfig = {
  DeregistrationDelay: string;
  HealthCheckInterval: string;
  HealthCheckPath: string;
  HealthCheckTimeout: string;
  HealthyThresholdCount: string;
  MatcherHTTPCode: string;
  Port: string;
  Protocol: "TCP" | "HTTP" | "HTTPS";
  StickinessEnabled: "true" | "false";
  StickinessLBCookieDuration: string;
  StickinessType: "lb_cookie" | "source_ip";
  UnhealthyThresholdCount: string;
};

type ELBV2ListenerPortConfig = {
  DefaultProcess: string;
  ListenerEnabled: "true" | "false";
  Protocol: "HTTP" | "HTTPS" | "TCP" | "TLS";
  Rules?: string;
  SSLCertificateArns: string;
  SSLPolicy: string;
};

type AutoScalingGroupConfig = {
  /** The minimum number of instances in the Auto Scaling group */
  MinSize: string;
  /** The maximum number of instances in the Auto Scaling group */
  MaxSize: string;
  /** The cooldown period after a scaling activity */
  Cooldown: string;
  /** Whether to enable Capacity Rebalancing for Spot Instances */
  EnableCapacityRebalancing: "true" | "false";
};

type AutoSclaingLaunchConfig = {
  RootVolumeType: "gp2" | "gp3" | "io1" | "standard";
  RootVolumeSize: string;
  RootVolumeIOPS?: string;
  RootVolumeThroughput?: string;
  IamInstanceProfile?: string;
  EC2KeyName?: string;
  SecurityGroups?: string;
  MonitoringInterval?: "1 minute" | "5 minutes";
};

type AutoScalingScheduledActionConfig = {
  StartTime: string;
  EndTime: string;
  MaxSize: string;
  MinSize: string;
  DesiredCapacity: string;
  Recurrence: string;
  Suspend: "true" | "false";
};

type AutoScalingTriggerConfig = {
  BreachDuration: string;
  LowerBreachScaleIncrement: string;
  LowerThreshold: string;
  MeasureName: string;
  Period: string;
  EvaluationPeriods: string;
  Statistic: string;
  Unit: string;
  UpperBreachScaleIncrement: string;
  UpperThreshold: string;
};

type AutoScalingUpdatePolicyRollingUpdateConfig = {
  MaxBatchSize: string;
  MinInstancesInService: string;
  RollingUpdateEnabled: "true" | "false";
  RollingUpdateType: "Health" | "Time";
  PauseTime: string;
  Timeout: string;
};

type EC2InstancesConfig = {
  EnableSpot: "true" | "false";
  InstanceTypes: string;
  SpotFleetOnDemandBase?: string;
  SpotFleetOnDemandAboveBasePercentage?: string;
  SpotMaxPrice: string;
  SupportedArchitectures: "x86_64" | "arm64";
};

type EC2VPCConfig = {};

type EBApplicationConfig = {
  "Application Healthcheck URL": string;
};

type EBCloudWatchLogsConfig = {
  StreamLogs: "true" | "false";
  DeleteOnTerminate: "true" | "false";
  RetentionInDays: string;
};

type EBCLoudWatchLogsHealthConfig = {
  HealthStreamingEnabled: "true" | "false";
  DeleteOnTerminate: "true" | "false";
  RetentionInDays: string;
};

type EBCommandConfig = {
  DeploymentPolicy:
    | "Rolling"
    | "Immutable"
    | "AllAtOnce"
    | "RollingWithAdditionalBatch"
    | "TrafficSplitting";
  BatchSizeType: "Percentage" | "Fixed";
  BatchSize: string;
  Timeout: string;
  IgnoreHealthCheck?: "true" | "false";
};

type EBEnvironmentConfig = {
  EnvironmentType: "LoadBalanced" | "SingleInstance";
  LoadBalancerType: "application" | "classic";
  ServiceRole?: string;
  LoadBalancerIsShared?: "true" | "false";
};

type EBHealthReportingSystemConfig = {
  SystemType: "enhanced" | "basic";
  ConfigDocument?: string;
  EnhancedHealthAuthEnabled: "true" | "false";
  HealthCheckSuccessThreshold: "Ok" | "Warning" | "Degraded" | "Severe";
};

type EBHostManagerConfig = {
  LogPublicationControl: "true" | "false";
};

type EBManagedActionsConfig = {
  ManagedActionsEnabled: "true" | "false";
  PreferredStartTime: string;
  ServiceRoleForManagedUpdates: string;
};

type EBManagedActionsPlatformUpdateConfig = {
  UpdateLevel: "minor" | "patch" | "platform";
  InstanceRefreshEnabled: "true" | "false";
};

type EBMonitoringConfig = {
  "Automatically Terminate Unhealthy Instances": "true" | "false";
};

type EBSNSTopicsConfig = {
  "Notification Endpoint": string;
  "Notification Protocol": "http" | "https" | "email" | "email-json" | "sqs";
  "Notification Topic ARN": string;
  "Notification Topic Name": string;
};

type EBSQSDConfig = {
  WorkerQueueURL: string;
  HttpPath: string;
  MimeType: string;
  HttpConnections: string;
  ConnectTimeout: string;
  InactivityTimeout: string;
  VisibilityTimeout: string;
  ErrorVisibilityTimeout: string;
  RetentionPeriod: string;
  MaxRetries: string;
};

type EBTrafficSplittingConfig = {
  NewVersionPercent: string;
  EvaluationTime: string;
};

type EBXRayConfig = {
  XRayEnabled: "true" | "false";
};

type EBContainerNodeJSConfig = {
  NodeCommand: string;
  ProxyServer?: "nginx" | "apache";
};

type ELBHealthCheckConfig = {
  HealthyThreshold: string;
  Interval: string;
  Timeout: string;
  UnhealthyThreshold: string;
};

type ELBLoadBalancerConfig = {
  CrossZone: "true" | "false";
  SecurityGroups: string;
  ManagedSecurityGroup: "true" | "false";
};

type ELBListenerConfig = {
  ListenerProtocol: "HTTP" | "TCP";
  InstancePort: string;
  InstanceProtocol: "HTTP" | "HTTPS" | "TCP" | "SSL";
  PolicyNames: string;
  ListenerEnabled: "true" | "false";
};

type ELBListenerPortConfig = {
  ListenerProtocol: "HTTP" | "HTTPS" | "TCP" | "SSL";
  InstancePort: string;
  InstanceProtocol: "HTTP" | "HTTPS" | "TCP" | "SSL";
  PolicyNames: string;
  SSLCertificateId: string;
  ListenerEnabled: "true" | "false";
};

type ELBPoliciesConfig = {
  ConnectionDrainingEnabled: "true" | "false";
  ConnectionDrainingTimeout: string;
  ConnectionSettingsIdleTimeout: string;
  LoadBalancerPorts: string;
  "Stickiness Cookie Expiration": string;
  "Stickiness Policy": "true" | "false";
};

type ELBPolicyNameConfig = {
  CookieName: string;
  InstancePorts: string;
  LoadBalancerPorts: string;
  ProxyProtocol: "true" | "false";
  PublicKey: string;
  PublicKeyPolicyNames: string;
  SSLProtocols: string;
  SSLReferencePolicy: string;
  "Stickiness Cookie Expiration": string;
  "Stickiness Policy": "true" | "false";
};

type ELBV2ListenerRuleNameConfig = {
  HostHeaders: string;
  PathPatterns: string;
  Priority: string;
  Process: string;
};

type ELBV2LoadBalancerConfig = {
  AccessLogsS3Bucket: string;
  AccessLogsS3Enabled: "true" | "false";
  AccessLogsS3Prefix: string;
  IdleTimeout: string;
  ManagedSecurityGroup: string;
  SecurityGroups: string;
  SharedLoadBalancer: string;
};

type EBEnvironmentVariablesConfig = {
  [key: string]: string;
};

/**
 * The configuration options for the Elastic Beanstalk environment.
 *
 * @see https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html
 */
export type EBSettingOptionsConfig = {
  "aws:autoscaling:asg": AutoScalingGroupConfig;
  "aws:autoscaling:launchconfiguration": AutoSclaingLaunchConfig;
  //   "aws:autoscaling:scheduledaction": AutoScalingScheduledActionConfig;
  //   "aws:autoscaling:trigger": AutoScalingTriggerConfig;
  //   "aws:autoscaling:updatepolicy:rollingupdate": AutoScalingUpdatePolicyRollingUpdateConfig;
  "aws:ec2:instances": EC2InstancesConfig;
  //   "aws:ec2:vpc": EC2VPCConfig;
  //   "aws:elasticbeanstalk:application": EBApplicationConfig;
  "aws:elasticbeanstalk:cloudwatch:logs": EBCloudWatchLogsConfig;
  //   "aws:elasticbeanstalk:cloudwatch:logs:health": EBCLoudWatchLogsHealthConfig;
  "aws:elasticbeanstalk:command": EBCommandConfig;
  "aws:elasticbeanstalk:environment": EBEnvironmentConfig;
  //   "aws:elasticbeanstalk:environment:process:default": EBEnvironmentProcessConfig;
  //   "aws:elasticbeanstalk:environment:process:process_name": EBEnvironmentProcessConfig;
  //   "aws:elasticbeanstalk:environment:proxy:staticfiles": {};
  "aws:elasticbeanstalk:healthreporting:system": EBHealthReportingSystemConfig;
  //   "aws:elasticbeanstalk:hostmanager": EBHostManagerConfig;
  //   "aws:elasticbeanstalk:managedactions": EBManagedActionsConfig;
  //   "aws:elasticbeanstalk:managedactions:platformupdate": EBManagedActionsPlatformUpdateConfig;
  //   "aws:elasticbeanstalk:monitoring": EBMonitoringConfig;
  //   "aws:elasticbeanstalk:sns:topics": EBSNSTopicsConfig;
  //   "aws:elaticbeanstalk:sqsd": EBSQSDConfig;
  //   "aws:elasticbeanstalk:trafficsplitting": EBTrafficSplittingConfig;
  //   "aws:elasticbeanstalk:xray": EBXRayConfig;
  //   // TODO: Is this valid?
  "aws:elasticbeanstalk:container:nodejs"?: EBContainerNodeJSConfig;
  //   "aws:elb:healthcheck": ELBHealthCheckConfig;
  //   /** Configurations for classic load balancers (CLB) */
  //   "aws:elb:loadbalancer": ELBLoadBalancerConfig;
  //   /** Configurations for classic load balancer listener */
  //   "aws:elb:listener": ELBListenerConfig;
  //   /** Configurations for classic load balancer listener port */
  //   "aws:elb:listener:listern_port": ELBListenerPortConfig;
  //   /** Configurations for classic load balancer policy */
  //   "aws:elb:policies": ELBPoliciesConfig;
  //   /** Configurations for classic load balancer policy name */
  //   "aws:elb:policies:policy_name": ELBPolicyNameConfig;
  //   /** Configurations for application load balancer listener default */
  "aws:elbv2:listener:default"?: ELBV2ListenerPortConfig;
  //   /** Configurations for application load balancer listener port */
  //   "aws:elbv2:listener:listener_port": ELBV2ListenerPortConfig;
  //   /** Configurations for application load balancer listener rule */
  //   "aws:elbv2:listenerrule:rule_name": ELBV2ListenerRuleNameConfig;
  //   /** Configurations for application load balancer (ALB) */
  //   "aws:elbv2:loadbalancer": ELBV2LoadBalancerConfig;
  //   /** Environment variables for the application */
  "aws:elasticbeanstalk:application:environment": EBEnvironmentVariablesConfig;
};
