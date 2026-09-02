import { EvidenceItem, MissingEvidenceItem, TemporalCheckItem } from '../types';

export const ALL_EVIDENCE_RECORDS: EvidenceItem[] = [
  // Supporting Evidence for Integration Friction (Primary Hypothesis)
  {
    id: 'ev-sup-101',
    source: 'Customer Support',
    title: 'Integration-related support tickets spiked +37%',
    metricChange: '+37.4% MoM',
    date: '2026-08-05',
    entity: 'Zendesk Enterprise (Helpdesk)',
    excerpt: 'Drastic increase in incoming tickets tagged with [API_AUTH_FAILURE], [WEBHOOK_TIMEOUT], and [ERP_CONNECTOR_ERROR] starting early August.',
    rawRecordId: 'TICKET-SUP-184',
    rawDetail: 'Customer (Acme Corp / C1024, Enterprise Region C) reported: "Integration setup was difficult. Webhook authentication continuously fails with HTTP 401 handshake errors on version 2.4 connector."',
    strengthImpact: 'HIGH',
    isSupporting: true,
    hypothesisId: 'hyp-integration'
  },
  {
    id: 'ev-prod-102',
    source: 'Product Analytics',
    title: 'API endpoint usage dropped 24% in affected accounts',
    metricChange: '-24.2% MoM',
    date: '2026-08-10',
    entity: 'ClickHouse Telemetry (Product X SDK)',
    excerpt: 'Enterprise accounts in Region C executing workflows via Product X experienced a severe 24.2% drop in sustained API executions.',
    rawRecordId: 'TELEMETRY-EVENT-9042',
    rawDetail: 'Daily average calls dropped from 480,000/day to 364,000/day. Error rate spiked from 0.12% to 4.88% on /v2/sync-pipeline endpoints after patch 2.4.1.',
    strengthImpact: 'HIGH',
    isSupporting: true,
    hypothesisId: 'hyp-integration'
  },
  {
    id: 'ev-crm-103',
    source: 'CRM',
    title: '8 Lost Enterprise deals specifically cited integration barriers',
    metricChange: '8 Enterprise Deals (₹48 Lakh pipeline)',
    date: '2026-08-18',
    entity: 'Salesforce CRM (Win/Loss Log)',
    excerpt: 'Opportunity post-mortems in Region C indicate enterprise buyers stalled during pilot evaluation due to connector setup bottlenecks.',
    rawRecordId: 'OPP-DEAL-145',
    rawDetail: 'Deal: MegaLogistics Asia (Enterprise, ₹14 Lakh ARR). Sales Rep Note: "Buyer selected alternative solution because CloudFlow integration with their SAP/Oracle ERP system took over 3 weeks in pilot sandbox without completing."',
    strengthImpact: 'HIGH',
    isSupporting: true,
    hypothesisId: 'hyp-integration'
  },
  {
    id: 'ev-feed-104',
    source: 'Customer Feedback',
    title: 'External & internal user reviews highlighted connector complexity',
    metricChange: 'Negative sentiment +28%',
    date: '2026-08-22',
    entity: 'G2 / In-App CSAT Feedback',
    excerpt: 'Customer satisfaction ratings for onboarding dropped from 4.6/5.0 to 3.2/5.0 with frequent mentions of "steep integration learning curve".',
    rawRecordId: 'FEEDBACK-REV-772',
    rawDetail: 'G2 Verified Enterprise Reviewer: "CloudFlow workflow automation engine is robust once running, but connecting it to our internal data lake required custom Python middleware because the native connector is brittle."',
    strengthImpact: 'HIGH',
    isSupporting: true,
    hypothesisId: 'hyp-integration'
  },

  // Contradicting Evidence for Integration Friction
  {
    id: 'ev-contra-105',
    source: 'Customer Support',
    title: 'Historical integration complaints existed prior to August revenue drop',
    metricChange: 'Pre-existing baseline of 42 tickets/mo',
    date: '2026-08-25',
    entity: 'Zendesk Historical Archive (Q2 2026)',
    excerpt: 'Support tickets regarding connector setup have had a steady baseline of 40-45 tickets/month in Q1 and Q2 without triggering a revenue collapse.',
    rawRecordId: 'HIST-REPORT-Q2',
    rawDetail: 'Analytical note: While volume increased +37% in August, integration complaints were already documented in May and June. This weakens the simplistic claim that integration friction is a brand-new phenomenon rather than an exacerbated bottleneck.',
    strengthImpact: 'MEDIUM',
    isSupporting: false,
    isContradicting: true,
    hypothesisId: 'hyp-integration'
  },

  // Evidence for Competitor Advantage (Secondary Hypothesis)
  {
    id: 'ev-comp-201',
    source: 'Market Intelligence',
    title: 'Competitor (FlowSync) launched 1-click zero-code integration',
    metricChange: 'Announced Aug 14',
    date: '2026-08-14',
    entity: 'Gartner Market Brief / Press Release',
    excerpt: 'Primary competitor FlowSync released a pre-built connector suite targeting SAP and Salesforce, directly advertising "zero-developer setup".',
    rawRecordId: 'MARKET-BRIEF-AUG',
    rawDetail: 'FlowSync PR: "Launch of FlowSync InstantConnect removes data engineering requirements for enterprise workflow automation." Multiple marketing campaigns targeted CloudFlow keywords.',
    strengthImpact: 'MEDIUM',
    isSupporting: true,
    hypothesisId: 'hyp-competitor'
  },
  {
    id: 'ev-comp-202',
    source: 'CRM',
    title: 'Competitor mentioned in 5 lost deal notes',
    metricChange: '5 deal mentions',
    date: '2026-08-20',
    entity: 'Salesforce CRM (Competitive Intelligence)',
    excerpt: 'Enterprise prospects mentioned evaluating FlowSync alongside CloudFlow during August POC evaluations.',
    rawRecordId: 'OPP-DEAL-182',
    rawDetail: 'Sales Rep Note: "Customer evaluated FlowSync simultaneously. FlowSync demo showed instant setup. However, buyer noted our workflow depth was superior."',
    strengthImpact: 'MEDIUM',
    isSupporting: true,
    hypothesisId: 'hyp-competitor'
  },
  {
    id: 'ev-comp-contra-203',
    source: 'Product Analytics',
    title: 'Internal telemetry drop started before competitor launch date',
    metricChange: 'Drop began Aug 01 vs Launch Aug 14',
    date: '2026-08-24',
    entity: 'ClickHouse Event Stream',
    excerpt: 'Internal API degradation and support spikes commenced on August 1st, a full two weeks before FlowSync publicly launched their connector.',
    rawRecordId: 'TELEMETRY-TIMELINE-AUDIT',
    rawDetail: 'Temporal analysis reveals that internal enterprise churn risk began 14 days before external competitor market activity. Competitor launch aggravated the situation but was not the primary initiating trigger.',
    strengthImpact: 'HIGH',
    isSupporting: false,
    isContradicting: true,
    hypothesisId: 'hyp-competitor'
  },

  // Pricing Pressure Hypothesis Evidence
  {
    id: 'ev-price-301',
    source: 'Sales Database',
    title: 'Discounting request rates remained within historical baseline',
    metricChange: 'Discount requests: +1.2% (Normal)',
    date: '2026-08-26',
    entity: 'ERP Sales Billing Engine',
    excerpt: 'Average realized contract discount across all tiers was 14.2% in August vs 13.9% in July, well within standard statistical variance.',
    rawRecordId: 'BILLING-DISCOUNT-AGG',
    rawDetail: 'No broad customer resistance to list pricing was detected in billing approvals. Lost deals did not cite price as the primary blocker in exit surveys.',
    strengthImpact: 'LOW',
    isSupporting: false,
    isContradicting: true,
    hypothesisId: 'hyp-pricing'
  },

  // Market Demand Hypothesis Evidence
  {
    id: 'ev-mkt-401',
    source: 'Market Intelligence',
    title: 'Overall B2B SaaS workflow sector grew +14% YoY in August',
    metricChange: 'Sector Expansion +14.2%',
    date: '2026-08-28',
    entity: 'IDC / Gartner SaaS Tracker',
    excerpt: 'Macro demand for enterprise automation remains strong; peer SaaS vendors reported steady quarter-over-quarter pipeline growth.',
    rawRecordId: 'MACRO-REPORT-Q3',
    rawDetail: 'Macroeconomic conditions do not explain the 8.4% drop. Inbound demo requests for CloudFlow actually rose +4% in August, confirming healthy top-of-funnel demand.',
    strengthImpact: 'LOW',
    isSupporting: false,
    isContradicting: true,
    hypothesisId: 'hyp-demand'
  }
];

export const MISSING_EVIDENCE_ITEMS: MissingEvidenceItem[] = [
  {
    id: 'miss-1',
    source: 'Engineering Infrastructure (Datadog/Elastic)',
    name: 'Granular Integration Gateway Error Logs',
    description: 'Detailed HTTP status codes, socket timeouts, and connector stack traces at the individual customer gateway level.',
    importance: 'HIGH'
  },
  {
    id: 'miss-2',
    source: 'Customer Success / User Research',
    name: 'Direct Customer Exit Interviews (Region C)',
    description: '1-on-1 recorded interviews with the 8 churned/lost enterprise accounts to confirm exact internal executive decision criteria.',
    importance: 'HIGH'
  },
  {
    id: 'miss-3',
    source: 'Sales Operations',
    name: 'Account-Level Migration Data',
    description: 'Verification of whether lost accounts actually migrated to FlowSync or simply paused their automation deployment.',
    importance: 'MEDIUM'
  }
];

export const TEMPORAL_TIMELINE_STEPS: TemporalCheckItem[] = [
  {
    date: 'Aug 01, 2026',
    event: 'Release of Connector Patch v2.4.1 & Integration complaints begin in Region C',
    source: 'Zendesk / GitHub Releases',
    isConsistent: true,
    note: 'First spike in authentication handshake failures recorded in developer forum'
  },
  {
    date: 'Aug 05, 2026',
    event: 'Customer support tickets surge +37% across enterprise accounts',
    source: 'Customer Support',
    isConsistent: true,
    note: 'P1 and P2 priority escalations logged with support engineering team'
  },
  {
    date: 'Aug 10, 2026',
    event: 'API endpoint usage declines -24% on /v2/sync endpoints',
    source: 'Product Analytics (ClickHouse)',
    isConsistent: true,
    note: 'Enterprise clients throttle automated cron schedules due to repeated sync errors'
  },
  {
    date: 'Aug 14, 2026',
    event: 'Competitor (FlowSync) launches zero-code connector marketing campaign',
    source: 'Market Intelligence',
    isConsistent: true,
    note: 'Secondary factor: competitors capitalize on market chatter, but starts 2 weeks after initial errors'
  },
  {
    date: 'Aug 15, 2026',
    event: 'Enterprise stage-3 pilot conversion rate drops to 21.4% (-11.2%)',
    source: 'CRM Salesforce',
    isConsistent: true,
    note: '8 key enterprise opportunities fail sandbox validation and stall deal closures'
  },
  {
    date: 'Aug 20, 2026',
    event: 'Monthly revenue deviation breaches 95% statistical confidence interval (-8.4%)',
    source: 'Sales Database / Metric Registry',
    isConsistent: true,
    note: 'Materiality Engine triggers HIGH priority investigation alert to Alex Morgan'
  }
];
