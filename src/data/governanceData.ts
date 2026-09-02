import { GovernanceUserRole, AuditLogItem, FeedbackSubmission } from '../types';

export const GOVERNANCE_ROLES_CONFIG: Record<string, GovernanceUserRole> = {
  'CEO': {
    persona: 'CEO',
    title: 'Chief Executive Officer',
    department: 'Executive Leadership',
    revenueAccess: true,
    customerLevelData: 'Full',
    financeSensitiveFields: 'Visible',
    hrAccess: 'Allowed',
    regionAccess: {
      'Region C (APAC)': 'Visible',
      'Region A (Americas)': 'Visible',
      'Region B (EMEA)': 'Visible'
    },
    decisionRights: [
      'Approve cross-departmental capital allocation',
      'Authorize company-wide strategic pricing concessions',
      'Direct executive resource deployment across Engineering and Sales'
    ]
  },
  'Regional Manager': {
    persona: 'Regional Manager',
    title: 'Regional General Manager (Region C)',
    department: 'Sales & Customer Operations',
    revenueAccess: true,
    customerLevelData: 'Limited',
    financeSensitiveFields: 'Restricted',
    hrAccess: 'Denied',
    regionAccess: {
      'Region C (APAC)': 'Visible',
      'Region A (Americas)': 'Restricted',
      'Region B (EMEA)': 'Restricted'
    },
    decisionRights: [
      'Adjust regional sales focus & rep quotas',
      'Deploy regional solutions engineers to stalled accounts',
      'Authorize up to 30-day pilot extension windows'
    ]
  },
  'Product Manager': {
    persona: 'Product Manager',
    title: 'Lead Product Manager',
    department: 'Product & Engineering',
    revenueAccess: true,
    customerLevelData: 'Masked',
    financeSensitiveFields: 'Restricted',
    hrAccess: 'Denied',
    regionAccess: {
      'Region C (APAC)': 'Visible',
      'Region A (Americas)': 'Visible',
      'Region B (EMEA)': 'Visible'
    },
    decisionRights: [
      'Prioritize product investigation & patch sprint backlogs',
      'Approve OAuth handshake & schema mapping technical specs',
      'Review integration error telemetry & user session replays'
    ]
  },
  'Data Analyst': {
    persona: 'Data Analyst',
    title: 'Senior Analytics Architect (Alex Morgan)',
    department: 'Strategy & Analytics',
    revenueAccess: true,
    customerLevelData: 'Full',
    financeSensitiveFields: 'Visible',
    hrAccess: 'Denied',
    regionAccess: {
      'Region C (APAC)': 'Visible',
      'Region A (Americas)': 'Visible',
      'Region B (EMEA)': 'Visible'
    },
    decisionRights: [
      'Validate analytical evidence & statistical confidence bounds',
      'Submit analyst corrections & hypothesis recalibrations',
      'Audit semantic KPI formulas, grains, and lineage transformations'
    ]
  }
};

export const MASKED_DATA_EXAMPLES = [
  {
    field: 'Customer Contact Email',
    rawUnmasked: 'alexandra.davis@acmecorp.com',
    maskedDisplay: 'a***@company.com',
    policy: 'PII Data Protection Policy §4.2 (AES-GCM deterministic hash masking)'
  },
  {
    field: 'Billing Transaction ID',
    rawUnmasked: 'TXN-902184-7821-USD',
    maskedDisplay: '••••••7821',
    policy: 'PCI-DSS Financial Audit Governance (Last 4 digits only for non-finance)'
  },
  {
    field: 'Customer Bank / Routing',
    rawUnmasked: 'ACH-021000021-99841',
    maskedDisplay: '•••••••••••••',
    policy: 'Restricted Tier-1 Financial Isolation'
  },
  {
    field: 'Sales Commission Split',
    rawUnmasked: '$14,200.00 (Rep: J. Doe)',
    maskedDisplay: '[RESTRICTED_FIELD]',
    policy: 'HR & Compensation Row Security Policy'
  }
];

export const AUDIT_LOG_ENTRIES: AuditLogItem[] = [
  {
    id: 'aud-901',
    timestamp: '2026-08-20 08:15:22',
    user: 'Alex Morgan',
    role: 'Strategy & Analytics (Data Analyst)',
    kpi: 'Revenue (August 2026)',
    dataAccessed: 'Transaction-level billing ledger, Zendesk Ticket SUP-184, ClickHouse Telemetry',
    analysisType: 'Multi-Factor Contribution & Hypothesis Evaluation',
    actionTaken: 'Triggered Automated Root-Cause Investigation',
    policyEnforced: 'RBAC Rule: Analytics Superuser Full Read Access (Audit Logged)'
  },
  {
    id: 'aud-902',
    timestamp: '2026-08-20 08:42:10',
    user: 'Elena Rostova',
    role: 'Regional Manager (Region C)',
    kpi: 'Enterprise Conversion Rate',
    dataAccessed: 'Region C Salesforce Opportunities (Deals #145, #182)',
    analysisType: 'Regional Pipeline & Win/Loss Decomposition',
    actionTaken: 'Proposed Action: Deploy Solutions Engineers to 8 Stalled Accounts',
    policyEnforced: 'Row-Level Security: Region C Allowed | Region A/B Filtered Out'
  },
  {
    id: 'aud-903',
    timestamp: '2026-08-20 09:10:05',
    user: 'Priya Sharma',
    role: 'Lead Product Manager',
    kpi: 'Product Usage (WAU/MAU)',
    dataAccessed: 'Product X API route error logs (/v2/sync-pipeline), Masked User IDs',
    analysisType: 'Telemetry Error Rate Anomaly Detection',
    actionTaken: 'Approved Action: Prioritize Emergency v2.4.2 Connector Hotfix Sprint',
    policyEnforced: 'Column-Level Masking: Customer PII auto-hashed to a***@company.com'
  },
  {
    id: 'aud-904',
    timestamp: '2026-08-20 10:05:40',
    user: 'Marcus Vance',
    role: 'Chief Executive Officer (CEO)',
    kpi: 'Total Revenue',
    dataAccessed: 'Aggregated Executive Summary & Risk Narrative',
    analysisType: 'Persona Narrative Synthesis & Cross-Functional Allocation',
    actionTaken: 'Viewed Executive Strategic Brief',
    policyEnforced: 'Executive Access Tier: Unrestricted High-Level Aggregation'
  }
];

export const LEARNING_LOOP_STATS: {
  totalAnalystCorrections: number;
  acceptedHypothesesPct: number;
  rejectedHypothesesPct: number;
  abstainedPct: number;
  topLearningInsight: string;
  evaluationTrend: Array<{ period: string; precisionScore: number; humanAgreedPct: number }>;
  recentFeedbackHistory: FeedbackSubmission[];
} = {
  totalAnalystCorrections: 24,
  acceptedHypothesesPct: 81,
  rejectedHypothesesPct: 12,
  abstainedPct: 7,
  topLearningInsight: 'Competitor effects are frequently overestimated; internal integration latency accounts for 74% of initial churn initiation.',
  evaluationTrend: [
    { period: 'May 26', precisionScore: 76, humanAgreedPct: 74 },
    { period: 'Jun 26', precisionScore: 79, humanAgreedPct: 78 },
    { period: 'Jul 26', precisionScore: 82, humanAgreedPct: 80 },
    { period: 'Aug 26', precisionScore: 84, humanAgreedPct: 84 }
  ],
  recentFeedbackHistory: [
    {
      id: 'fb-01',
      timestamp: 'Aug 18, 2026',
      investigationId: 'inv-cloudflow-aug-2026',
      isUseful: 'CORRECT',
      selectedRootCause: 'Integration Friction',
      comment: 'Empirical cross-confirmation between Zendesk and ClickHouse is exact. Competitor launch was secondary.',
      analyst: 'Alex Morgan (Senior Analytics Architect)'
    },
    {
      id: 'fb-02',
      timestamp: 'Jul 24, 2026',
      investigationId: 'inv-ambiguous-revenue',
      isUseful: 'CORRECT',
      selectedRootCause: 'Abstain Approved',
      comment: 'Abstention was the correct statistical decision. Avoided premature price slashing in EMEA.',
      analyst: 'Marcus Vance (CEO / Strategy Review)'
    },
    {
      id: 'fb-03',
      timestamp: 'Jun 12, 2026',
      investigationId: 'inv-q2-conversion',
      isUseful: 'PARTIALLY_CORRECT',
      selectedRootCause: 'Marketing Lead Quality',
      comment: 'System scored sales rep quota higher than lead source drift. Corrected weights for SDR pipeline attribution.',
      analyst: 'Elena Rostova (Sales Operations Lead)'
    }
  ]
};
