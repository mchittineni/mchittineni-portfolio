// Skill pools, self-assessed proficiency, and verified credentials.
export const skillCategories = [
  {
    title: 'Languages',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    items: [
      {
        name: 'Python',
        href: 'https://www.python.org/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'JavaScript',
        href: 'https://www.javascript.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'Node.js',
        href: 'https://nodejs.org/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
    ],
  },
  {
    title: 'UI Frameworks',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    items: [
      {
        name: 'React',
        href: 'https://react.dev/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Flutter',
        href: 'https://flutter.dev/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      },
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    items: [
      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
      {
        name: 'Microsoft Azure',
        href: 'https://azure.microsoft.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      },
      {
        name: 'GCP',
        href: 'https://cloud.google.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
      },
      {
        name: 'OCI',
        href: 'https://www.oracle.com/cloud/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
      },
    ],
  },
  {
    title: 'Identity',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    items: [
      {
        name: 'Entra ID / Azure AD',
        href: 'https://www.microsoft.com/entra',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      },
      {
        name: 'AWS IAM & Cognito',
        href: 'https://aws.amazon.com/iam/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
    ],
  },
  {
    title: 'Containers',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    items: [
      {
        name: 'Docker',
        href: 'https://www.docker.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      },
      {
        name: 'Kubernetes (EKS/AKS/GKE)',
        href: 'https://kubernetes.io/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',
      },
      {
        name: 'Helm',
        href: 'https://helm.sh/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg',
      },
      {
        name: 'NGINX',
        href: 'https://nginx.org/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
      },
    ],
  },
  {
    title: 'Infrastructure as Code',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    items: [
      {
        name: 'Terraform',
        href: 'https://www.terraform.io/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
      },
      {
        name: 'Terragrunt',
        href: 'https://terragrunt.gruntwork.io/',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0b12%22 stroke-width=%221.7%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M3%206.5A1.5%201.5%200%20014.5%205h15A1.5%201.5%200%200121%206.5v11a1.5%201.5%200%2001-1.5%201.5h-15A1.5%201.5%200%20013%2017.5z%22/%3E%3Cpath d=%22M7%209.5A1%201%200%20018%208.5h8a1%201%200%20011%201v5a1%201%200%2001-1%201H8a1%201%200%2001-1-1z%22/%3E%3C/svg%3E',
      },
      {
        name: 'Pulumi',
        href: 'https://www.pulumi.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pulumi/pulumi-original.svg',
      },
      {
        name: 'AWS CDK',
        href: 'https://aws.amazon.com/cdk/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
      {
        name: 'ARM Templates',
        href: 'https://learn.microsoft.com/azure/azure-resource-manager/templates/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      },
      {
        name: 'CloudFormation',
        href: 'https://aws.amazon.com/cloudformation/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
    ],
  },
  {
    title: 'CI/CD',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    items: [
      {
        name: 'GitHub Actions',
        href: 'https://github.com/features/actions',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      },
      {
        name: 'Jenkins',
        href: 'https://www.jenkins.io/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
      },
      {
        name: 'GitLab CI/CD',
        href: 'https://about.gitlab.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
      },
      {
        name: 'Azure DevOps',
        href: 'https://azure.microsoft.com/services/devops/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      },
      {
        name: 'AWS CodePipeline',
        href: 'https://aws.amazon.com/codepipeline/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
    ],
  },
  {
    title: 'Automation',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    items: [
      {
        name: 'Ansible',
        href: 'https://www.ansible.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg',
      },
      {
        name: 'Bash',
        href: 'https://www.gnu.org/software/bash/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      },
    ],
  },
  {
    title: 'Observability',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    items: [
      {
        name: 'Datadog',
        href: 'https://www.datadoghq.com/',
        img: 'https://cdn.simpleicons.org/datadog/632CA6',
      },
      {
        name: 'Dynatrace',
        href: 'https://www.dynatrace.com/',
        img: 'https://cdn.simpleicons.org/dynatrace/1496FF',
      },
      {
        name: 'Grafana',
        href: 'https://grafana.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg',
      },
      {
        name: 'Prometheus',
        href: 'https://prometheus.io/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg',
      },
      {
        name: 'ELK Stack',
        href: 'https://www.elastic.co/what-is/elk-stack',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
      },
    ],
  },
  {
    title: 'DevSecOps',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    items: [
      {
        name: 'Wiz',
        href: 'https://www.wiz.io/',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0b12%22 stroke-width=%221.7%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M6.5%2017a4%204%200%2001-.6-7.96%205.5%205.5%200%200110.7-1.3A3.75%203.75%200%200119%2017H6.5z%22/%3E%3Ccircle cx=%2211%22 cy=%2212.5%22 r=%222.6%22/%3E%3Cpath d=%22M13,14.4%20L15.5,17%22/%3E%3C/svg%3E',
      },
      {
        name: 'AWS Security Hub',
        href: 'https://aws.amazon.com/security-hub/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
      {
        name: 'Checkov',
        href: 'https://www.checkov.io/',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0b12%22 stroke-width=%221.7%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M4%206h10%22/%3E%3Cpath d=%22M4%2012h10%22/%3E%3Cpath d=%22M4%2018h7%22/%3E%3Cpath d=%22M16.5%2016.5l1.8%201.8%203.2-3.6%22/%3E%3C/svg%3E',
      },
      {
        name: 'tfsec',
        href: 'https://aquasecurity.github.io/tfsec/',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0b12%22 stroke-width=%221.7%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M12%203l7%203v5.5c0%204.2-2.9%207.6-7%208.5-4.1-.9-7-4.3-7-8.5V6z%22/%3E%3Cpath d=%22M9.6%2011.5h4.8v4H9.6z%22/%3E%3Cpath d=%22M10.6%2011.5v-1.4a1.4%201.4%200%20012.8%200v1.4%22/%3E%3C/svg%3E',
      },
      {
        name: 'Zero Trust Architecture',
        href: 'https://www.nist.gov/publications/zero-trust-architecture',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0b12%22 stroke-width=%221.7%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M12%202l8%204v6c0%205-3.4%208.9-8%2010-4.6-1.1-8-5-8-10V6l8-4z%22/%3E%3Cpath d=%22M9%2012l2%202%204-4%22/%3E%3C/svg%3E',
      },
      {
        name: 'KMS & Secrets Encryption',
        href: 'https://aws.amazon.com/kms/',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0b12%22 stroke-width=%221.7%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Ccircle cx=%2216%22 cy=%228%22 r=%223.4%22/%3E%3Cpath d=%22M13.6%2010.4L4%2020v0h3.4v-2.6H10v-2.6h2.2%22/%3E%3C/svg%3E',
      },
      {
        name: 'GDPR & SOC 2',
        href: 'https://gdpr.eu/',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0b12%22 stroke-width=%221.7%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M9%203h6v3H9z%22/%3E%3Cpath d=%22M15%204.5h2.5A1.5%201.5%200%200119%206v13.5A1.5%201.5%200%200117.5%2021h-11A1.5%201.5%200%20015%2019.5V6a1.5%201.5%200%20011.5-1.5H9%22/%3E%3Cpath d=%22M8.5%2013.5l2.2%202.2%204.3-4.3%22/%3E%3C/svg%3E',
      },
    ],
  },
  {
    title: 'Service Management',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    items: [
      {
        name: 'ServiceNow',
        href: 'https://www.servicenow.com/',
        img: 'https://www.vectorlogo.zone/logos/servicenow/servicenow-icon.svg',
      },
      {
        name: 'Jira',
        href: 'https://www.atlassian.com/software/jira',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
      },
    ],
  },
  {
    title: 'Data Platforms',
    icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    items: [
      {
        name: 'Databricks (Unity Catalog)',
        href: 'https://www.databricks.com/',
        img: 'https://www.vectorlogo.zone/logos/databricks/databricks-icon.svg',
      },
      {
        name: 'Snowflake',
        href: 'https://www.snowflake.com/',
        img: 'https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg',
      },
      {
        name: 'Amazon Redshift',
        href: 'https://aws.amazon.com/redshift/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
    ],
  },
  {
    title: 'GenAI Engineering',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    items: [
      {
        name: 'Claude API & Claude Code',
        href: 'https://www.anthropic.com/',
        img: 'https://cdn.simpleicons.org/anthropic/D97757',
      },
      {
        name: 'OpenAI APIs & Agents',
        href: 'https://openai.com/',
        img: 'https://cdn.jsdelivr.net/npm/simple-icons@15/icons/openai.svg',
      },
      {
        name: 'MCP (Model Context Protocol)',
        href: 'https://modelcontextprotocol.io/',
        img: 'https://cdn.simpleicons.org/modelcontextprotocol/0284c7',
      },
      {
        name: 'Amazon Bedrock',
        href: 'https://aws.amazon.com/bedrock/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
      {
        name: 'Vertex AI',
        href: 'https://cloud.google.com/vertex-ai',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
      },
      {
        name: 'RAG Pipelines',
        href: 'https://www.anthropic.com/engineering',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0b12%22 stroke-width=%221.7%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M12%203l9%204.5-9%204.5-9-4.5L12%203z%22/%3E%3Cpath d=%22M3%2012l9%204.5%209-4.5%22/%3E%3Cpath d=%22M3%2016.5L12%2021l9-4.5%22/%3E%3C/svg%3E',
      },
    ],
  },
  {
    title: 'Databases',
    icon: 'M4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7M4 7c0 1.66 3.58 3 8 3s8-1.34 8-3M4 7c0-1.66 3.58-3 8-3s8 1.34 8 3',
    items: [
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      },
      {
        name: 'MySQL',
        href: 'https://www.mysql.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      },
      {
        name: 'MongoDB',
        href: 'https://www.mongodb.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'Firebase',
        href: 'https://firebase.google.com/',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      },
    ],
  },
]

export const proficiency = [
  { name: 'Terraform & Infrastructure as Code', level: 95 },
  { name: 'Multi-Cloud Architecture (AWS/Azure/GCP/OCI)', level: 94 },
  { name: 'Kubernetes & Platform Engineering', level: 92 },
  { name: 'CI/CD, DevSecOps & FinOps', level: 90 },
  { name: 'GenAI, Agentic AI & MCP Engineering', level: 88 },
]

export const certifications = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    alt: 'AWS',
    href: 'https://www.credly.com/badges/5f18e335-13fb-4ccc-994d-ed8e422a0f3b/linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
  },
  {
    title: 'Google Cloud Platform Associate Cloud Engineer',
    alt: 'GCP',
    href: 'https://www.credential.net/b488aa0d-d156-499c-91a0-4132f12a97a2?key=b37942efb1541e72a4a40381246efedb424c60c551fa2b7b7baff5573d77948a#acc.5B3UOSQI',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  },
  {
    title: 'Microsoft Azure Fundamentals – AZ-900',
    alt: 'Azure',
    href: 'https://www.credly.com/badges/5b2e93b4-470a-4d8c-b4b7-3c0cbd10cd6a?source=linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
  },
  {
    title: 'OCI Developer – Certified Associate',
    alt: 'Oracle Cloud',
    href: 'https://education.oracle.com/oracle-cloud-infrastructure-developer-2025-associate/pexam_1Z0-1084-25',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
  },
  {
    title: 'OCI Cloud Operations – Certified Associate',
    alt: 'Oracle Cloud',
    href: 'https://education.oracle.com/oracle-cloud-infrastructure-2025-architect-associate/pexam_1Z0-1072-25',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
  },
  {
    title: 'HashiCorp Certified: Terraform Associate',
    alt: 'Terraform',
    href: 'https://www.hashicorp.com/certification/terraform-associate',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg',
  },
  {
    title: 'Databricks Fundamentals',
    alt: 'Databricks',
    href: 'https://credentials.databricks.com/cd05f977-4ea2-420c-9b16-c35ee7014ba7',
    img: 'https://www.vectorlogo.zone/logos/databricks/databricks-icon.svg',
  },
  {
    title: 'AWS Certified AI Practitioner',
    alt: 'AWS AI',
    href: 'https://aws.amazon.com/certification/certified-ai-practitioner/',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    title: 'Microsoft Azure AI Fundamentals – AI-900',
    alt: 'Azure AI',
    href: 'https://www.credly.com/badges/fda35ffe-a6ba-473a-b5ae-48aebba457d8?source=linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png',
  },
  {
    title: 'Databricks Generative AI Fundamentals',
    alt: 'Databricks AI',
    href: 'https://credentials.databricks.com/ca9b7009-20d4-4978-80da-40171a158536',
    img: 'https://www.vectorlogo.zone/logos/databricks/databricks-icon.svg',
  },
  {
    title: 'AWS Agentic AI Demonstrated',
    alt: 'AWS Microcredential',
    href: 'https://www.credly.com/badges/1b16c055-a5f2-41f6-8f03-569b4e3e4cf9/linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/6f40bf38-1725-40d8-99a2-f6bb1bafec0e/blob',
  },
  {
    title: 'AWS Application Networking Demonstrated',
    alt: 'AWS Microcredential',
    href: 'https://www.credly.com/badges/7dc752e5-43ae-4ee7-bbfd-33631e412f16/linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/ed8cf03b-6269-4265-a65b-68e67e49ce6b/blob',
  },
  {
    title: 'AWS Incident Response Demonstrated',
    alt: 'AWS Microcredential',
    href: 'https://www.credly.com/badges/77b46116-d903-49b5-8e2c-e13a9f47472c/linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/8dd6f516-0dd3-4b5e-aacf-8e86e737a95d/blob',
  },
  {
    title: 'AWS Serverless Demonstrated',
    alt: 'AWS Microcredential',
    href: 'https://www.credly.com/badges/20201dc6-9611-4c9f-8e38-43f448cca8c9/linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/b3885091-25bc-42d0-8989-34cca82f3056/blob',
  },
  {
    title: 'AWS Data Visualization Demonstrated',
    alt: 'AWS Microcredential',
    href: 'https://www.credly.com/badges/e7176f89-1b4e-4b2f-95bb-de80550b2fc6/linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/3e0dcc2b-b0d3-4f20-959a-5c16373d8ac3/blob',
  },
  {
    title: 'AWS Data Streaming Demonstrated',
    alt: 'AWS Microcredential',
    href: 'https://www.credly.com/badges/d86ed057-838e-4a38-b943-a4b4702f01d6/linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/6c76e6fe-d95c-46b1-a824-1effb29d2ae9/blob',
  },
  {
    title: 'AWS Data Lakehouse Demonstrated',
    alt: 'AWS Microcredential',
    href: 'https://www.credly.com/badges/d6c3ed61-52ae-4fa5-8e9e-af27d9dded91/linked_in_profile',
    img: 'https://images.credly.com/size/340x340/images/505b2a51-5e9c-4587-a632-cfa238fc0db3/blob',
  },
]
