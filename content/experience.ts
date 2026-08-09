// Work history. Consumed by ExperienceSection (portfolio) and the
// console/terminal modes, which project each role as a Deployment.
export const jobs = [
  {
    id: 'infoplus',
    clouds: ['AWS', 'GCP'],
    role: 'Cloud Engineer',
    company: 'Infoplus Technologies Limited',
    period: 'Mar 2026 – Present',
    metrics: [
      { value: '<2 hrs', label: 'Platform Provisioning' },
      { value: '70%', label: 'Drift Reduction' },
      { value: '30%', label: 'Toil Reduction (GenAI)' },
    ],
    groups: [
      {
        title: 'Multi-Cloud Data Platforms & Kubernetes (AWS + GCP)',
        points: [
          'Designed and delivered cloud-native infrastructure across AWS and GCP for a Databricks data platform, cutting environment provisioning time from 3 days to under 2 hours across a multi-region global rollout.',
          'Built a modular Terraform framework of 25+ reusable modules with remote state management across AWS and GCP, validated with tfsec and Checkov, cutting configuration drift by 70%.',
          'Engineered Python-based automation frameworks and tooling to automate cloud operations, infrastructure validation, deployment workflows, and platform maintenance across AWS and GCP.',
          'Provisioned and operated managed Kubernetes clusters on GCP hosting Snowflake and Databricks services, sustaining 99.9% availability while autoscaling cut idle compute by 25%.',
          'Built and governed Databricks on AWS and GCP workspaces, cluster policies, Unity Catalog, and job orchestration, bringing all data engineering workloads under centralised governance.',
          'Partnered with data engineers and platform teams to integrate Snowflake and Databricks pipelines, aligning networking and identity to remove cross-team blockers.',
        ],
      },
      {
        title: 'CI/CD, DevSecOps, Observability & FinOps',
        points: [
          'Standardised pipeline delivery with reusable YAML configuration frameworks across GitHub Actions, AWS CodePipeline, and Google Cloud Build, cutting release lead time by 50% and eliminating 40% of duplicated configurations.',
          'Enforced least-privilege IAM and Zero Trust network segmentation (VPC, PrivateLink, Private Service Connect) with policy-as-code guardrails; ran Wiz continuously across AWS and GCP for CSPM.',
          'Managed AWS Secrets Manager, Google Secret Manager, and KMS for encryption and credential governance, supporting GDPR and SOC 2 compliance.',
          'Embedded observability using CloudWatch, Google Cloud Monitoring, Prometheus, and Grafana, reducing mean time to detect (MTTD) by 40%.',
          'Drove FinOps governance across EKS, GKE, and Databricks compute through autoscaling and rightsizing, lowering monthly cloud spend by 25%.',
        ],
      },
      {
        title: 'AI Engineering & LLMOps',
        points: [
          'Architected and delivered agentic AI and RAG-based platform tooling using Claude API, OpenAI APIs, and Model Context Protocol (MCP), deploying governed AI workloads on Amazon Bedrock and Google Cloud Vertex AI to reduce manual operational effort by 30%.',
          'Applied LLMOps practices by extending existing IaC, CI/CD, IAM, and FinOps controls to AI deployments, introducing production AI capabilities with zero new security findings.',
          'Used ServiceNow for change management and infrastructure approvals, ensuring platform changes remained auditable and compliant with ITSM processes.',
        ],
      },
    ],
  },
  {
    id: 'exeter',
    clouds: ['AWS'],
    role: 'Senior Cloud & DevOps Engineer',
    company: 'University of Exeter',
    period: 'Oct 2022 – Dec 2025',
    metrics: [
      { value: '50,000+', label: 'Users Supported' },
      { value: '99.99%', label: 'Platform Uptime' },
      { value: '45%', label: 'Spend Reduction' },
    ],
    groups: [
      {
        title: 'AWS Architecture & Internal Tooling',
        points: [
          'Acted as senior cloud engineer and architectural advisor across enterprise-scale hybrid and AWS environments supporting 50,000+ users, achieving 99.99% uptime.',
          'Architected containerised and serverless compute across ECS, EKS, Lambda, and Step Functions, with S3, RDS, DynamoDB, Glue, and Redshift as the core data layer.',
          'Designed event-driven serverless architectures using API Gateway, SNS/SQS, SES, and EventBridge for secure, scalable integrations; delivered secured app delivery via CloudFront, WAF, ACM, and Cognito.',
          'Built and shipped full-stack internal tooling React and Flutter front ends backed by TypeScript services and Firebase (auth, hosting, real-time data) deployed through unified CI/CD pipelines.',
          'Designed multi-account architecture using AWS Organizations and Control Tower, enforcing governance through Service Control Policies (SCPs).',
        ],
      },
      {
        title: 'DevSecOps, Automation & SRE',
        points: [
          'Automated cloud provisioning end-to-end with Terraform, AWS CDK, and AWS SDK, validated with tfsec and Checkov before every deployment.',
          'Designed Zero Trust, least-privilege IAM architecture across serverless and containerised workloads, with federated identity (SSO/OIDC/RBAC/ABAC) via Cognito and Microsoft Entra ID.',
          'Automated credential lifecycle management with Secrets Manager and KMS; deployed GuardDuty, Security Hub, AWS Config, and CloudTrail, cutting incident response time by 50%.',
          'Optimised release cycles by 40% through GitHub Actions and CodePipeline (including automated App Store/Play Store releases); built testing with JMeter, Cypress/Playwright, and API health checks.',
          'Reduced infrastructure spend by 45% through Reserved/Spot Instances, rightsizing, and Infracost CI/CD pre-merge checks; authored technical documentation with JSDoc and mentored 5+ engineers.',
        ],
      },
    ],
  },
  {
    id: 'procadence',
    clouds: ['GCP'],
    role: 'DevOps / Platform Engineer',
    company: 'Procadence Technologies Limited',
    period: 'Apr 2021 – Sep 2022',
    metrics: [
      { value: '200+', label: 'Microservices' },
      { value: '99.9%', label: 'GKE Uptime' },
      { value: '100%', label: 'Keyless WIF CI/CD' },
    ],
    groups: [
      {
        title: 'GCP Platform Engineering & Automation',
        points: [
          'Advised 15+ development teams on secure, multi-tenant cloud-native and hybrid architecture on Google Cloud Platform.',
          'Designed and operated GKE clusters supporting 200+ microservices, improving resource utilisation by 30% while maintaining 99.9% uptime.',
          'Built reusable Terraform modules for IAM and policy-as-code governance, validated with tfsec and Checkov, cutting configuration drift and provisioning effort by 60%.',
          'Built Python automation tooling to integrate with cloud APIs, Kubernetes workflows, and infrastructure processes, automating operational tasks and boosting productivity.',
        ],
      },
      {
        title: 'Zero Trust Security & Operations',
        points: [
          'Built CI/CD pipelines with Jenkins and Cloud Build and implemented keyless CI/CD via Workload Identity Federation, eliminating 100% of long-lived service-account keys.',
          'Re-architected IAM to least-privilege RBAC/ABAC with workload identity, removing all long-lived credentials across serverless and containerised workloads.',
          'Enforced multi-tenant isolation using Kubernetes namespaces, RBAC, and IAM Conditions, and deployed Zero Trust access via Identity-Aware Proxy (IAP) with zero cross-tenant incidents.',
          'Implemented monitoring, autoscaling, and capacity planning (cutting waste by 20%), performed root cause analysis on incidents, authored runbooks (cutting onboarding by 50%), and used ServiceNow for ITSM controls.',
        ],
      },
    ],
  },
  {
    id: 'procadence-intern',
    clouds: ['Azure'],
    role: 'Software Engineer Intern',
    company: 'Procadence Technologies Limited',
    period: 'Jun 2020 – Mar 2021',
    metrics: [
      { value: '150+', label: 'Azure Subscriptions' },
      { value: '45%', label: 'Effort Reduction' },
      { value: '35%', label: 'Release Automation' },
    ],
    groups: [
      {
        title: 'Azure Automation & CI/CD',
        points: [
          'Automated Azure infrastructure provisioning using ARM templates across 150+ subscriptions, reducing manual configuration effort by 45%.',
          'Created PowerShell automation scripts to assist Azure resource management, deployment validation, and operational workflows.',
          'Built and enhanced CI/CD pipelines using Azure DevOps with automated testing and secure deployment workflows, cutting manual release effort by 35%.',
        ],
      },
      {
        title: 'Identity & Compliance',
        points: [
          'Integrated Azure Key Vault into deployment pipelines and Kubernetes workloads, removing hard-coded secrets and centralising certificate/encryption-key management.',
          'Administered Microsoft Entra ID RBAC hierarchies and service principals across 150+ subscriptions, enforcing Zero Trust standards via Azure Policy and Conditional Access (MFA, device compliance).',
          'Integrated Azure Monitor and Application Insights for SLA validation, and authored 20+ runbooks and technical standards that cut onboarding time.',
        ],
      },
    ],
  },
]
