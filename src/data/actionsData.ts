import { RecommendedAction, Persona } from '../types';

export const MASTER_ACTIONS_CATALOG: RecommendedAction[] = [
  {
    id: 'act-1',
    driver: 'Integration Friction',
    controllableLever: 'Product Integration Reliability & Developer Sandbox',
    title: 'Prioritize Emergency v2.4.2 Connector Hotfix Sprint',
    description: 'Deploy dedicated backend team to resolve OAuth token handshake timeouts and ERP schema auto-mapping errors in Product X.',
    expectedImpact: 'Potential restoration of 24% API execution capacity and stabilization of pilot conversion rate.',
    owner: 'Product Engineering (Lead: Priya Sharma)',
    allowedRoles: ['CEO', 'Product Manager', 'Data Analyst'],
    confidence: 'High',
    controllability: 'High',
    monitoringMetrics: ['/v2/sync Endpoint Error Rate', 'Zendesk Integration Ticket Volume', 'API Daily Active Calls'],
    status: 'Proposed'
  },
  {
    id: 'act-2',
    driver: 'Integration Friction',
    controllableLever: 'Sales Engineering & High-Touch Pilot Support',
    title: 'Deploy Dedicated Solutions Engineers to 8 Stalled Region C Enterprise Accounts',
    description: 'Assign tier-3 integration architects directly to the 8 stalled pilot accounts in Region C to manually complete connector setups within 72 hours.',
    expectedImpact: 'Unblock estimated ₹28–₹35 Lakh in pending Q3 enterprise ARR pipeline.',
    owner: 'Regional Sales & Solutions Engineering (Lead: Alex Morgan / Region C GM)',
    allowedRoles: ['CEO', 'Regional Manager'],
    confidence: 'Moderate',
    controllability: 'High',
    monitoringMetrics: ['Stage-3 Pilot Pass Rate', 'Time-to-First-Successful-Sync', 'Regional Closed-Won Revenue'],
    status: 'Proposed'
  },
  {
    id: 'act-3',
    driver: 'Competitor Advantage',
    controllableLever: 'Marketing Positioning & Competitive Battlecards',
    title: 'Publish InstantConnect Comparative Benchmark & Sales Battlecard',
    description: 'Arm sales representatives with technical benchmark reports highlighting CloudFlow superior enterprise security and high-throughput workflow capabilities vs FlowSync.',
    expectedImpact: 'Mitigate win-rate leakage against FlowSync in enterprise bake-offs.',
    owner: 'Product Marketing (Lead: Maya Lin)',
    allowedRoles: ['CEO', 'Regional Manager', 'Product Manager'],
    confidence: 'Moderate',
    controllability: 'Moderate',
    monitoringMetrics: ['Competitive Win Rate vs FlowSync', 'Competitor Loss Reason Frequency'],
    status: 'Proposed'
  },
  {
    id: 'act-4',
    driver: 'Data Governance & Validation',
    controllableLever: 'Telemetry & Observability Pipeline',
    title: 'Integrate Gateway Error Telemetry into Real-Time Semantic Registry',
    description: 'Connect Datadog gateway logs directly to MarketTrace Semantic Registry to close the missing evidence gap for future anomaly investigations.',
    expectedImpact: 'Reduces investigation latency from 12 mins to near real-time automated root-cause isolation.',
    owner: 'Data Engineering & Analytics Ops (Lead: Data Analytics Team)',
    allowedRoles: ['Data Analyst', 'CEO'],
    confidence: 'High',
    controllability: 'High',
    monitoringMetrics: ['Evidence Freshness Index', 'Data Quality SLA Score', 'Telemetry Coverage %'],
    status: 'Proposed'
  },
  {
    id: 'act-5',
    driver: 'Churn Prevention',
    controllableLever: 'Customer Success Escalation Protocol',
    title: 'Initiate Executive Sponsor Check-ins with Top 15 Region C Accounts',
    description: 'Schedule senior leadership touchpoints with enterprise accounts exhibiting API usage drops exceeding 15% over the past 30 days.',
    expectedImpact: 'Prevent further contraction and secure renewal commitments for ₹1.2 Cr in annual contract value.',
    owner: 'Customer Success & Executive Team',
    allowedRoles: ['CEO', 'Regional Manager'],
    confidence: 'High',
    controllability: 'High',
    monitoringMetrics: ['Account Health Score', 'Net Retention Rate (NRR)', 'CSAT Index'],
    status: 'Proposed'
  }
];

export const PERSONA_DECISION_RIGHTS: Record<Persona, { title: string; rights: string[]; forbiddenRights: string[] }> = {
  'CEO': {
    title: 'Chief Executive Officer',
    rights: [
      'Approve cross-departmental strategic interventions',
      'Allocate capital & engineering emergency headcounts',
      'Authorize enterprise pricing adjustments & bridge concessions',
      'Approve company-wide SLA policy changes'
    ],
    forbiddenRights: [
      'Direct code deployment to production repos',
      'Raw telemetry database schema alterations'
    ]
  },
  'Regional Manager': {
    title: 'Regional General Manager (Region C)',
    rights: [
      'Adjust regional sales focus and quota allocations',
      'Deploy regional solutions engineers to stalled prospect accounts',
      'Authorize discretionary regional pilot extension windows (up to 30 days)',
      'Escalate customer tickets directly to Tier-3 support leadership'
    ],
    forbiddenRights: [
      'Global product roadmap priority modifications',
      'Company-wide pricing tier restructuring',
      'Accessing employee compensation or non-regional P&L details'
    ]
  },
  'Product Manager': {
    title: 'Principal Product Manager (Workflows)',
    rights: [
      'Prioritize product investigation & patch sprint backlogs',
      'Approve OAuth handshake & schema mapping technical specifications',
      'Trigger sandbox environment deprecation & feature flags',
      'Review integration error telemetry & user session replays'
    ],
    forbiddenRights: [
      'Unilateral customer contract pricing discounts',
      'Overriding regional sales commission terms'
    ]
  },
  'Data Analyst': {
    title: 'Senior Analytics & BI Architect',
    rights: [
      'Validate analytical evidence & statistical confidence bounds',
      'Submit analyst corrections & hypothesis recalibrations',
      'Request additional telemetry ingestion pipelines (e.g. Datadog logs)',
      'Audit semantic KPI formulas, grains, and lineage transformations'
    ],
    forbiddenRights: [
      'Executing commercial contracts or pricing waivers',
      'Approving product feature shipping to external customers'
    ]
  }
};
