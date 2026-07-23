<template>
  <section id="experience" class="section experience">
    <div class="wrap">
      <header class="section-head center" data-reveal>
        <p class="eyebrow">Career so far</p>
        <h2 class="section-title">Work <span class="text-gradient">Experience</span></h2>
        <p class="section-sub">
          Building, securing, and optimizing cloud platforms across AWS, Azure, and GCP, now
          extending into production GenAI engineering.
        </p>
      </header>

      <div class="timeline">
        <article
          v-for="(job, i) in jobs"
          :key="job.role + job.company"
          class="timeline__item"
          data-reveal
          :style="{ transitionDelay: i * 90 + 'ms' }"
        >
          <span class="timeline__dot"></span>

          <div class="card card-hover job">
            <div class="job__head">
              <div>
                <h3 class="job__role">{{ job.role }}</h3>
                <p class="job__company">{{ job.company }}</p>
              </div>
              <span class="chip job__period">{{ job.period }}</span>
            </div>

            <div class="job__metrics">
              <div v-for="m in job.metrics" :key="m.label" class="metric">
                <div class="metric__value text-gradient">{{ m.value }}</div>
                <div class="metric__label">{{ m.label }}</div>
              </div>
            </div>

            <div class="job__groups">
              <div v-for="group in job.groups" :key="group.title" class="job__group">
                <h4 class="job__group-title">{{ group.title }}</h4>
                <ul class="job__list">
                  <li v-for="(point, p) in group.points" :key="p">{{ point }}</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<
<script setup>
  const jobs = [
    {
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
</script>

<style scoped>
  .timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent), var(--accent-2), transparent);
    opacity: 0.4;
  }

  .timeline__item {
    position: relative;
    padding-left: 2.5rem;
  }
  .timeline__dot {
    position: absolute;
    left: 0;
    top: 0.4rem;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background: var(--accent-grad);
    box-shadow: 0 0 0 5px rgba(129, 140, 248, 0.15);
  }

  .job {
    padding: 1.75rem;
  }
  .job__head {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  .job__role {
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0;
  }
  .job__company {
    margin: 0.2rem 0 0;
    color: var(--accent);
    font-weight: 500;
  }
  .job__period {
    white-space: nowrap;
  }

  .job__metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.75rem;
  }
  .metric {
    text-align: center;
    padding: 1rem 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
  }
  .metric__value {
    font-size: 1.6rem;
    font-weight: 800;
    line-height: 1;
  }
  .metric__label {
    margin-top: 0.4rem;
    font-size: 0.78rem;
    color: var(--text-dim);
  }

  .job__groups {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .job__group-title {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    color: var(--text);
  }
  .job__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .job__list li {
    position: relative;
    padding-left: 1.4rem;
    font-size: 0.88rem;
    color: var(--text-soft);
    line-height: 1.5;
  }
  .job__list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.7;
  }

  @media (min-width: 720px) {
    .job__groups {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
