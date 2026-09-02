import { Investigation } from '../types';
import { ALL_EVIDENCE_RECORDS, MISSING_EVIDENCE_ITEMS, TEMPORAL_TIMELINE_STEPS } from './evidenceData';

export const INVESTIGATIONS_MAP: Record<string, Investigation> = {
  'cloudflow-aug-2026': {
    id: 'inv-cloudflow-aug-2026',
    scenarioKey: 'cloudflow-aug-2026',
    kpiId: 'kpi-revenue',
    title: 'Revenue declined 8.4% in August 2026',
    subtitle: 'Root-Cause & Multi-Factor Driver Investigation — CloudFlow Enterprise Platform',
    period: 'August 2026 (Fiscal Month)',
    previousValue: '₹10.00 Cr',
    currentValue: '₹9.16 Cr',
    changePct: -8.4,
    affectedSegment: 'Enterprise (Annual Tier > ₹25L)',
    affectedRegion: 'Region C (APAC / South Asia)',
    affectedProduct: 'Product X (Core Workflow Engine)',
    businessImpact: '₹84 Lakh net ARR contraction',
    materialityLevel: 'HIGH',
    statisticalSignificance: 'HIGH',
    status: 'ESTABLISHED',
    statusMessage: 'Strongest explanation identified with corroborated multi-source evidence.',
    statusBadge: 'STRONGEST CURRENT EXPLANATION: Integration Friction',
    timelineStages: [
      { name: 'Detected', status: 'COMPLETED', timestamp: 'Aug 20, 08:00 AM', detail: 'Automated ARIMA anomaly detector flagged -8.4% breach' },
      { name: 'Materiality Validated', status: 'COMPLETED', timestamp: 'Aug 20, 08:02 AM', detail: 'Statistical significance: HIGH (p < 0.001) | Business Impact: ₹84 Lakh' },
      { name: 'Data Reconciled', status: 'COMPLETED', timestamp: 'Aug 20, 08:04 AM', detail: '5 heterogeneous sources reconciled across hourly, daily & event grains' },
      { name: 'Drivers Identified', status: 'COMPLETED', timestamp: 'Aug 20, 08:06 AM', detail: 'Contribution analysis decomposed -8.4% into 7 distinct factors' },
      { name: 'Hypotheses Generated', status: 'COMPLETED', timestamp: 'Aug 20, 08:08 AM', detail: '4 competing root-cause hypotheses evaluated against benchmark database' },
      { name: 'Evidence Validated', status: 'COMPLETED', timestamp: 'Aug 20, 08:11 AM', detail: 'Cross-checked supporting, contradicting & missing evidence across systems' },
      { name: 'Narrative Generated', status: 'COMPLETED', timestamp: 'Aug 20, 08:14 AM', detail: 'Synthesized 4 persona-specific narratives from validated analytical facts' },
      { name: 'Actions Generated', status: 'COMPLETED', timestamp: 'Aug 20, 08:15 AM', detail: 'Derived governed recommendations mapped to controllable business levers' }
    ],
    trendSeries: [
      { month: 'Sep 25', actual: 9.85, expected: 9.80, minExpected: 9.60, maxExpected: 10.00 },
      { month: 'Oct 25', actual: 9.92, expected: 9.85, minExpected: 9.65, maxExpected: 10.05 },
      { month: 'Nov 25', actual: 10.05, expected: 9.90, minExpected: 9.70, maxExpected: 10.10 },
      { month: 'Dec 25', actual: 10.20, expected: 10.00, minExpected: 9.80, maxExpected: 10.20 },
      { month: 'Jan 26', actual: 9.95, expected: 10.05, minExpected: 9.85, maxExpected: 10.25 },
      { month: 'Feb 26', actual: 10.12, expected: 10.10, minExpected: 9.90, maxExpected: 10.30 },
      { month: 'Mar 26', actual: 10.25, expected: 10.15, minExpected: 9.95, maxExpected: 10.35 },
      { month: 'Apr 26', actual: 10.08, expected: 10.20, minExpected: 10.00, maxExpected: 10.40 },
      { month: 'May 26', actual: 10.18, expected: 10.22, minExpected: 10.02, maxExpected: 10.42 },
      { month: 'Jun 26', actual: 10.02, expected: 10.25, minExpected: 10.05, maxExpected: 10.45 },
      { month: 'Jul 26', actual: 10.00, expected: 10.28, minExpected: 10.08, maxExpected: 10.48 },
      { month: 'Aug 26', actual: 9.16, expected: 10.05, minExpected: 9.80, maxExpected: 10.30, isAnomaly: true, label: 'August Anomaly: -8.4% (₹9.16 Cr vs ₹9.8–₹10.3 Cr baseline)' }
    ],
    decomposition: {
      id: 'root',
      name: 'Total Revenue',
      changePct: -8.4,
      sharePct: 100,
      absoluteLoss: '-₹84.0 Lakh',
      children: [
        {
          id: 'seg-enterprise',
          name: 'Enterprise Segment',
          changePct: -18.2,
          sharePct: 62.0,
          absoluteLoss: '-₹68.2 Lakh (81.2% of total drop)',
          children: [
            {
              id: 'reg-c',
              name: 'Region C (APAC)',
              changePct: -29.4,
              sharePct: 38.0,
              absoluteLoss: '-₹54.6 Lakh (65.0% of total drop)',
              children: [
                {
                  id: 'prod-x',
                  name: 'Product X (Core Engine)',
                  changePct: -34.1,
                  sharePct: 28.5,
                  absoluteLoss: '-₹46.2 Lakh (55.0% of total drop)'
                },
                {
                  id: 'prod-y',
                  name: 'Product Y (Analytics Suite)',
                  changePct: -4.2,
                  sharePct: 9.5,
                  absoluteLoss: '-₹8.4 Lakh (10.0% of total drop)'
                }
              ]
            },
            {
              id: 'reg-a',
              name: 'Region A (Americas)',
              changePct: -2.1,
              sharePct: 14.0,
              absoluteLoss: '-₹7.8 Lakh (9.3% of total drop)'
            },
            {
              id: 'reg-b',
              name: 'Region B (EMEA)',
              changePct: -1.8,
              sharePct: 10.0,
              absoluteLoss: '-₹5.8 Lakh (6.9% of total drop)'
            }
          ]
        },
        {
          id: 'seg-mid',
          name: 'Mid-Market Segment',
          changePct: -2.4,
          sharePct: 24.0,
          absoluteLoss: '-₹10.2 Lakh (12.1% of total drop)'
        },
        {
          id: 'seg-smb',
          name: 'SMB Segment',
          changePct: -1.1,
          sharePct: 14.0,
          absoluteLoss: '-₹5.6 Lakh (6.7% of total drop)'
        }
      ]
    },
    drivers: [
      {
        name: 'Volume (Lost Deals)',
        contributionPct: -4.1,
        absoluteImpact: '-₹41.0 Lakh',
        method: 'Deterministic Contribution Analysis',
        type: 'negative',
        description: 'Fewer enterprise pilot expansions and closed contracts in Region C'
      },
      {
        name: 'Churn (Cancellations)',
        contributionPct: -1.6,
        absoluteImpact: '-₹16.0 Lakh',
        method: 'Deterministic Contribution Analysis',
        type: 'negative',
        description: 'Increased non-renewals and seat reductions among affected accounts'
      },
      {
        name: 'Price (Discounting)',
        contributionPct: -1.2,
        absoluteImpact: '-₹12.0 Lakh',
        method: 'Deterministic Contribution Analysis',
        type: 'negative',
        description: 'Higher concession concessions during stalled pilot renegotiations'
      },
      {
        name: 'Mix (Product Shift)',
        contributionPct: -0.8,
        absoluteImpact: '-₹8.0 Lakh',
        method: 'Deterministic Contribution Analysis',
        type: 'negative',
        description: 'Fewer enterprise tier add-ons attached to baseline workflow packages'
      },
      {
        name: 'Competition (FlowSync)',
        contributionPct: -0.7,
        absoluteImpact: '-₹7.0 Lakh',
        method: 'Statistical Market Correlation',
        type: 'negative',
        description: 'Lost deals citing competitor alternative in late-stage pilot evaluations'
      },
      {
        name: 'Marketing (Lead Flow)',
        contributionPct: -0.4,
        absoluteImpact: '-₹4.0 Lakh',
        method: 'Attribution Modeling',
        type: 'negative',
        description: 'Slight delay in qualified enterprise outbound pipeline delivery'
      },
      {
        name: 'Other Factors',
        contributionPct: 0.4,
        absoluteImpact: '+₹4.0 Lakh',
        method: 'Residual Analysis',
        type: 'positive',
        description: 'Modest organic expansion in SMB and Self-Serve segments'
      }
    ],
    hypotheses: [
      {
        id: 'hyp-integration',
        name: 'Integration Friction',
        strengthScore: 89,
        statusBadge: 'STRONGEST CURRENT EXPLANATION',
        summary: 'Difficulties with the v2.4 connector and ERP authentication handshakes caused severe pilot abandonment, API execution declines, and customer frustration.',
        assessment: 'Strongest current explanation supported by cross-source evidence across Support, Product Analytics, CRM, and Customer Reviews.',
        contradictionSummary: 'Connector complaints had a pre-existing baseline of 40-45 tickets/month in Q2 before the revenue drop, indicating an existing vulnerability that became critical rather than an isolated new issue.',
        supportingEvidence: ALL_EVIDENCE_RECORDS.filter(e => e.hypothesisId === 'hyp-integration' && e.isSupporting),
        contradictingEvidence: ALL_EVIDENCE_RECORDS.filter(e => e.hypothesisId === 'hyp-integration' && e.isContradicting),
        missingEvidence: MISSING_EVIDENCE_ITEMS,
        temporalTimeline: TEMPORAL_TIMELINE_STEPS
      },
      {
        id: 'hyp-competitor',
        name: 'Competitor Advantage (FlowSync)',
        strengthScore: 67,
        statusBadge: 'MODERATE',
        summary: 'Primary competitor FlowSync released a pre-built 1-click connector suite on Aug 14, targeting enterprise ERP workflows.',
        assessment: 'Moderate secondary factor. FlowSync amplified deal losses in late August, but internal telemetry drop started 14 days prior to their launch.',
        contradictionSummary: 'Internal API usage degradation and support spikes began on August 1st, while FlowSync launched on August 14th.',
        supportingEvidence: ALL_EVIDENCE_RECORDS.filter(e => e.hypothesisId === 'hyp-competitor' && e.isSupporting),
        contradictingEvidence: ALL_EVIDENCE_RECORDS.filter(e => e.hypothesisId === 'hyp-competitor' && e.isContradicting),
        missingEvidence: [MISSING_EVIDENCE_ITEMS[2]],
        temporalTimeline: TEMPORAL_TIMELINE_STEPS
      },
      {
        id: 'hyp-pricing',
        name: 'Pricing Pressure',
        strengthScore: 31,
        statusBadge: 'WEAK',
        summary: 'Customer resistance to list price increases or competitor price cutting in Region C.',
        assessment: 'Weak explanation. Average realized discounting stayed within historical bounds (14.2% vs 13.9%), and lost deal notes did not cite pricing as primary blocker.',
        contradictionSummary: 'Discounting approval rates remained normal across billing systems.',
        supportingEvidence: [],
        contradictingEvidence: ALL_EVIDENCE_RECORDS.filter(e => e.hypothesisId === 'hyp-pricing'),
        missingEvidence: [],
        temporalTimeline: []
      },
      {
        id: 'hyp-demand',
        name: 'Market Demand Contraction',
        strengthScore: 18,
        statusBadge: 'WEAK',
        summary: 'Macroeconomic downturn or broad industry spending slowdown in the workflow automation sector.',
        assessment: 'Weak explanation. Macro B2B SaaS workflow sector grew +14% YoY in August and top-of-funnel inbound demo requests rose +4%.',
        contradictionSummary: 'Industry benchmarks and top-of-funnel inbound demo traffic both show positive growth.',
        supportingEvidence: [],
        contradictingEvidence: ALL_EVIDENCE_RECORDS.filter(e => e.hypothesisId === 'hyp-demand'),
        missingEvidence: [],
        temporalTimeline: []
      }
    ],
    causalityAssessment: {
      temporalConsistency: true,
      crossSourceConfirmation: true,
      alternativeExplanationCheck: true,
      causalEvidenceLevel: 'LIMITED',
      finalVerdict: 'Strongly supported hypothesis, but not definitive causal proof.'
    },
    personaNarratives: {
      'CEO': {
        persona: 'CEO',
        headline: 'Revenue Contraction Driven by Enterprise Integration Friction in Region C',
        narrativeText: 'August revenue declined 8.4% (₹9.16 Cr vs expected ₹9.8–₹10.3 Cr baseline), resulting in an ₹84 Lakh net ARR contraction. The impact is heavily concentrated in Region C Enterprise accounts using Product X (-29% in Region C, accounting for 65% of the total loss). Integration friction is the strongest supported root cause (89/100 evidence score), confirmed by +37% support tickets, -24% API usage, and 8 lost deals. Competitor FlowSync launched a competing connector mid-month, but our telemetry proves internal friction began 14 days earlier. Prioritizing immediate engineering remediation on the v2.4 integration path is the primary lever to protect Q3 enterprise pipeline.',
        strategicFocus: 'Strategic Risk & Executive Resource Allocation',
        keyMetricHighlight: '₹84 Lakh ARR Risk | 65% Concentrated in Region C Enterprise',
        recommendedFocus: 'Approve rapid engineering hotfix sprint and authorize executive sales bridge concessions for stalled accounts.'
      },
      'Regional Manager': {
        persona: 'Regional Manager',
        headline: 'Region C Enterprise Pilot Stalls Due to Connector Handshake Failures',
        narrativeText: 'Region C experienced a sharp 29.4% revenue drop, with 8 enterprise stage-3 pilot deals stalling during the evaluation window (representing ₹48 Lakh in delayed pipeline). Sales rep notes and Zendesk tickets confirm that enterprise prospects encountered recurring HTTP 401 authentication timeouts when connecting Product X to their ERP stacks. While competitor FlowSync reached out to these accounts, buyers consistently noted our workflow engine was functionally superior once configured. Immediate deployment of sales engineering specialists to assist stalled pilot customers can unblock 5 of the 8 pending deals within 14 days.',
        strategicFocus: 'Local Sales Execution & Customer Escalation Management',
        keyMetricHighlight: '8 Enterprise Pilots Stalled in Region C | ₹48 Lakh Pipeline at Risk',
        recommendedFocus: 'Deploy senior Solutions Architects to pilot accounts and request temporary extended evaluation windows.'
      },
      'Product Manager': {
        persona: 'Product Manager',
        headline: 'Product X v2.4.1 Connector Patch Triggered API Handshake Drop & Ticket Surge',
        narrativeText: 'Product X usage fell 34.1% among Region C enterprise cohorts following the deployment of Connector Patch v2.4.1. Telemetry confirms daily API executions dropped 24.2% (from 480k to 364k/day) while endpoint error rates on /v2/sync-pipeline surged to 4.88%. Support logs show a 37% surge in P1/P2 tickets with webhook timeout and OAuth token invalidation tags. The evidence indicates connector fragility during high-volume ERP syncs is directly impacting user adoption and pilot pass rates. Reverting the OAuth handshake changes and releasing a zero-friction connector hotfix will directly stabilize usage metrics.',
        strategicFocus: 'Product Reliability, API Stability & Developer Experience',
        keyMetricHighlight: 'API Calls ↓ 24.2% | Connector Error Rate 4.88% on /v2/sync',
        recommendedFocus: 'Prioritize v2.4.2 patch sprint: fix OAuth token renewal, simplify ERP schema mapping, and improve self-serve diagnostics.'
      },
      'Data Analyst': {
        persona: 'Data Analyst',
        headline: 'Empirical Decomposition: Methodological Rigor, Lineage & Confidence Bounds',
        narrativeText: 'August revenue of ₹9.16 Cr deviates significantly from the Holt-Winters ARIMA forecast range of [₹9.80 Cr, ₹10.30 Cr] (Z-score: -3.42, p < 0.001). Deterministic contribution analysis decomposes the -8.4% variance into Volume (-4.1%), Churn (-1.6%), Price (-1.2%), Mix (-0.8%), Competition (-0.7%), and Marketing (-0.4%). Cross-source triangulation across 5 heterogeneous systems (Hourly Sales, Daily CRM, Zendesk Tickets, ClickHouse Telemetry, and Weekly Market Briefs) confirms temporal consistency (Aug 01 patch → Aug 05 ticket surge → Aug 10 API drop → Aug 15 deal stalls). Contradiction check notes historical baseline complaints in Q2, indicating high pre-existing sensitivity.',
        strategicFocus: 'Data Lineage, Statistical Anomaly Bounds & Causal Limitations',
        keyMetricHighlight: 'Z-Score: -3.42 (p < 0.001) | Method: Contribution Analysis + Temporal Triangulation',
        recommendedFocus: 'Validate connector error telemetry logs and maintain governed distinction between empirical correlation and causal certainty.'
      }
    },
    actions: [
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
      }
    ],
    telemetry: {
      avgLatencySec: 2.8,
      llmCallsCount: 2,
      tokensUsed: 3420,
      estimatedCostUsd: 0.018,
      cacheHitRatePct: 64,
      latencyBreakdown: {
        sqlMs: 420,
        retrievalMs: 310,
        llmMs: 1200,
        renderMs: 870
      },
      insightsStats: {
        generated: 1284,
        failed: 3,
        abstained: 94
      },
      driftStatus: {
        dataDrift: 'Low',
        modelPerformance: 'Stable',
        contractChanges: 2,
        dataQualityAlerts: 4
      }
    }
  },

  // Scenario 2: Ambiguity / Abstention Scenario
  'ambiguous-revenue': {
    id: 'inv-ambiguous-revenue',
    scenarioKey: 'ambiguous-revenue',
    kpiId: 'kpi-revenue',
    title: 'Revenue declined 7.2% — Multi-Factor Balanced Ambiguity',
    subtitle: 'Ambiguous Investigation — Multiple Competing Explanations with Balanced Evidence',
    period: 'July 2026 (Fiscal Month)',
    previousValue: '₹10.50 Cr',
    currentValue: '₹9.74 Cr',
    changePct: -7.2,
    affectedSegment: 'Mid-Market & Enterprise',
    affectedRegion: 'Multi-Region (Region A & B)',
    affectedProduct: 'All Workflow Products',
    businessImpact: '₹76 Lakh net contraction',
    materialityLevel: 'HIGH',
    statisticalSignificance: 'HIGH',
    status: 'ABSTAIN',
    statusMessage: 'NO SINGLE ROOT CAUSE ESTABLISHED. The system prefers uncertainty over an unsupported explanation.',
    statusBadge: 'ENGINE STATUS: ABSTAIN (EVIDENCE BALANCED)',
    timelineStages: [
      { name: 'Detected', status: 'COMPLETED', timestamp: 'Jul 22, 09:00 AM', detail: 'Statistical anomaly detected (-7.2% breach)' },
      { name: 'Materiality Validated', status: 'COMPLETED', timestamp: 'Jul 22, 09:01 AM', detail: 'Materiality: HIGH | ₹76 Lakh deviation' },
      { name: 'Data Reconciled', status: 'COMPLETED', timestamp: 'Jul 22, 09:03 AM', detail: 'Reconciled 5 enterprise data sources' },
      { name: 'Drivers Identified', status: 'COMPLETED', timestamp: 'Jul 22, 09:05 AM', detail: 'Identified 3 balanced primary drivers' },
      { name: 'Hypotheses Evaluated', status: 'COMPLETED', timestamp: 'Jul 22, 09:08 AM', detail: 'Evidence scores: Competitor 71, Seasonality 68, Churn 66 (Variance < 5%)' },
      { name: 'Abstention Decision', status: 'COMPLETED', timestamp: 'Jul 22, 09:10 AM', detail: 'ABSTENTION TRIGGERED: Insufficient statistical separation between top explanations' }
    ],
    trendSeries: [
      { month: 'Feb 26', actual: 10.1, expected: 10.0, minExpected: 9.8, maxExpected: 10.2 },
      { month: 'Mar 26', actual: 10.3, expected: 10.2, minExpected: 10.0, maxExpected: 10.4 },
      { month: 'Apr 26', actual: 10.2, expected: 10.3, minExpected: 10.1, maxExpected: 10.5 },
      { month: 'May 26', actual: 10.4, expected: 10.4, minExpected: 10.2, maxExpected: 10.6 },
      { month: 'Jun 26', actual: 10.5, expected: 10.5, minExpected: 10.3, maxExpected: 10.7 },
      { month: 'Jul 26', actual: 9.74, expected: 10.50, minExpected: 10.20, maxExpected: 10.70, isAnomaly: true, label: 'July Anomaly: -7.2% (Ambiguous Multi-Factor Cause)' }
    ],
    decomposition: {
      id: 'root-amb',
      name: 'Total Revenue',
      changePct: -7.2,
      sharePct: 100,
      absoluteLoss: '-₹76.0 Lakh',
      children: [
        { id: 'amb-mid', name: 'Mid-Market Segment', changePct: -9.1, sharePct: 52.0, absoluteLoss: '-₹39.5 Lakh' },
        { id: 'amb-ent', name: 'Enterprise Segment', changePct: -6.4, sharePct: 48.0, absoluteLoss: '-₹36.5 Lakh' }
      ]
    },
    drivers: [
      { name: 'Competitor Price Cutting', contributionPct: -2.8, absoluteImpact: '-₹29.4 Lakh', method: 'Statistical Attribution', type: 'negative', description: 'Aggressive summer pricing blitz from competing mid-market vendors' },
      { name: 'Seasonal European Demand', contributionPct: -2.5, absoluteImpact: '-₹26.3 Lakh', method: 'Seasonal Decomposition', type: 'negative', description: 'Traditional summer holiday procurement slowdown in EMEA' },
      { name: 'Customer Churn & Downsell', contributionPct: -2.2, absoluteImpact: '-₹23.1 Lakh', method: 'Billing Cohort Analysis', type: 'negative', description: 'Tier contraction across annual mid-market renewals' },
      { name: 'Other Residual', contributionPct: 0.3, absoluteImpact: '+₹2.8 Lakh', method: 'Residual Analysis', type: 'positive', description: 'APAC SMB expansion' }
    ],
    hypotheses: [
      {
        id: 'hyp-comp-price',
        name: 'Competitor Price Cutting',
        strengthScore: 71,
        statusBadge: 'MODERATE',
        summary: 'Competitor discounts forced deal concessions and prolonged decision cycles.',
        assessment: 'Evidence score 71/100. Close competition from alternative low-cost tools.',
        contradictionSummary: 'Deal close rates in non-competitive opportunities showed similar deceleration.',
        supportingEvidence: [ALL_EVIDENCE_RECORDS[0]],
        contradictingEvidence: [ALL_EVIDENCE_RECORDS[4]],
        missingEvidence: MISSING_EVIDENCE_ITEMS,
        temporalTimeline: []
      },
      {
        id: 'hyp-seasonal',
        name: 'Seasonal Summer Demand Dip',
        strengthScore: 68,
        statusBadge: 'MODERATE',
        summary: 'Annual July enterprise procurement freeze during European holiday period.',
        assessment: 'Evidence score 68/100. Historical July dips occurred in 2024 and 2025, but 2026 magnitude is 1.8x larger.',
        contradictionSummary: 'Decline also occurred in non-holiday Asian regions with equal severity.',
        supportingEvidence: [],
        contradictingEvidence: [],
        missingEvidence: [MISSING_EVIDENCE_ITEMS[0]],
        temporalTimeline: []
      },
      {
        id: 'hyp-churn-accel',
        name: 'Customer Churn & Contract Downsell',
        strengthScore: 66,
        statusBadge: 'MODERATE',
        summary: 'Macro budget tightening leading to seat downsells across renewed accounts.',
        assessment: 'Evidence score 66/100. Renewal gross churn ticked up 1.1% across mid-market accounts.',
        contradictionSummary: 'New customer acquisition volume dropped simultaneously, suggesting wider top-of-funnel issue.',
        supportingEvidence: [],
        contradictingEvidence: [],
        missingEvidence: [MISSING_EVIDENCE_ITEMS[1]],
        temporalTimeline: []
      }
    ],
    abstentionDetails: {
      reason: 'The available evidence supports multiple competing explanations with statistically similar strength (Competitor Pricing: 71, Seasonal Demand: 68, Customer Churn: 66).',
      competingHypotheses: [
        { name: 'Competitor Price Cutting', score: 71 },
        { name: 'Seasonal Summer Demand Dip', score: 68 },
        { name: 'Customer Churn & Contract Downsell', score: 66 }
      ],
      message: 'The available evidence supports multiple competing explanations with similar strength. The system will not force a single causal narrative.',
      guidance: 'Recommend gathering account-level win/loss surveys and EMEA customer budget confirmation before initiating large-scale strategic interventions.'
    },
    causalityAssessment: {
      temporalConsistency: false,
      crossSourceConfirmation: false,
      alternativeExplanationCheck: true,
      causalEvidenceLevel: 'LIMITED',
      finalVerdict: 'Inconclusive: multiple co-occurring drivers without definitive statistical precedence.'
    },
    personaNarratives: {
      'CEO': {
        persona: 'CEO',
        headline: 'July Revenue -7.2%: Multi-Factor Equilibrium Requires Targeted Fact-Gathering',
        narrativeText: 'July revenue fell 7.2% (₹9.74 Cr vs ₹10.50 Cr baseline, impact ₹76 Lakh). The investigation evaluated three distinct hypotheses: Competitor Price Cutting (71), Seasonal Summer Slowdown (68), and Churn/Downsell (66). Because the evidence strength scores are separated by less than 5 points, the MarketTrace engine has formally abstained from declaring a single root cause. Forcing a singular narrative would risk misallocating corporate capital. Recommended executive action is to mandate a 7-day deep-dive audit across EMEA renewal accounts while monitoring competitive price matching.',
        strategicFocus: 'Balanced Risk Governance & Evidence-Gated Decisions',
        keyMetricHighlight: '₹76 Lakh Impact | 3 Balanced Explanations (Scores 71, 68, 66)',
        recommendedFocus: 'Maintain cross-functional monitoring without triggering premature unilateral restructuring.'
      },
      'Regional Manager': {
        persona: 'Regional Manager',
        headline: 'Multi-Region Decline Across EMEA and Americas Stalls Q3 Targets',
        narrativeText: 'Revenue contracted 9.1% in Mid-Market and 6.4% in Enterprise across both Americas and EMEA. While local sales teams report heavy price pressure from discount competitors, historical records also confirm an annual summer procurement freeze in Europe. The analytical engine flags both factors as co-occurring. Regional managers should conduct deal-by-deal pipeline reviews to differentiate accounts that stalled due to summer absences from those actively negotiating with discount vendors.',
        strategicFocus: 'Territory Level Verification & Account Triage',
        keyMetricHighlight: 'Mid-Market -9.1% | Regional Pipeline Deceleration',
        recommendedFocus: 'Instruct account executives to log explicit competitor discount quotes in CRM.'
      },
      'Product Manager': {
        persona: 'Product Manager',
        headline: 'Product Engagement Stable Across Core Features Despite Revenue Slump',
        narrativeText: 'Telemetry indicates active feature usage remained within normal bounds across Product X and Y (daily active users held steady at 74%). The revenue decline is primarily commercial and seasonal rather than driven by software outages or technical bugs. Product teams should focus on packaging lightweight mid-market tier options to assist sales during competitive price bake-offs.',
        strategicFocus: 'Product Health Monitoring & Packaging Evaluation',
        keyMetricHighlight: 'DAU Stable at 74% | Zero Elevated Error Rates',
        recommendedFocus: 'Explore flexible modular packaging options for mid-market buyers.'
      },
      'Data Analyst': {
        persona: 'Data Analyst',
        headline: 'Statistical Abstention: High Collinearity & Ambiguous Multi-Source Signals',
        narrativeText: 'The analytical engine triggered an ABSTAIN state due to high multi-collinearity between competitor promotional campaigns, seasonal calendar dips, and renewal contract variations. The delta between the top hypothesis (Competitor Pricing: 71) and third hypothesis (Churn: 66) is only 5 points, which is within the standard error threshold (SE = ±6.2). The system strictly avoids generating hallucinated certainty when empirical evidence cannot differentiate the primary driver.',
        strategicFocus: 'Hypothesis Disambiguation & Statistical Guardrails',
        keyMetricHighlight: 'Delta Score: 5.0 pts (SE ±6.2) | System Status: ABSTAIN',
        recommendedFocus: 'Run propensity-score matching on accounts that churned vs retained to isolate price sensitivity from seasonal effects.'
      }
    },
    actions: [
      {
        id: 'act-amb-1',
        driver: 'Multi-Factor Ambiguity',
        controllableLever: 'Account Win/Loss Audit & CRM Tagging',
        title: 'Execute 7-Day Targeted Win/Loss Customer Interview Audit',
        description: 'Conduct structured 15-minute phone interviews with 20 stalled mid-market accounts to verify whether price discounting or summer procurement freezes were the true driver.',
        expectedImpact: 'Resolves analytical ambiguity and establishes statistical separation between top 2 hypotheses.',
        owner: 'Sales Operations & Product Marketing (Lead: Alex Morgan)',
        allowedRoles: ['CEO', 'Regional Manager', 'Data Analyst'],
        confidence: 'High',
        controllability: 'High',
        monitoringMetrics: ['Verified Loss Reason Ratio', 'Discount Match Request Rate'],
        status: 'Proposed'
      },
      {
        id: 'act-amb-2',
        driver: 'Competitor Price Cutting',
        controllableLever: 'Commercial Approval Matrix',
        title: 'Establish Temporary Executive Discount Floor for Mid-Market Renewals',
        description: 'Authorize sales managers to offer up to 8% discretionary multi-year renewal discounts strictly for accounts with verified competing vendor proposals.',
        expectedImpact: 'Protects up to ₹18 Lakh in at-risk mid-market ARR renewals.',
        owner: 'Finance & Sales Leadership (Lead: Marcus Vance)',
        allowedRoles: ['CEO', 'Regional Manager'],
        confidence: 'Moderate',
        controllability: 'High',
        monitoringMetrics: ['Mid-Market Renewal Rate', 'Realized Gross Margin'],
        status: 'Proposed'
      }
    ],
    telemetry: {
      avgLatencySec: 3.1,
      llmCallsCount: 2,
      tokensUsed: 3890,
      estimatedCostUsd: 0.021,
      cacheHitRatePct: 58,
      latencyBreakdown: { sqlMs: 480, retrievalMs: 360, llmMs: 1420, renderMs: 840 },
      insightsStats: { generated: 1284, failed: 3, abstained: 95 },
      driftStatus: { dataDrift: 'Low', modelPerformance: 'Stable', contractChanges: 2, dataQualityAlerts: 4 }
    }
  },

  // Scenario 3: Sparse History Scenario
  'sparse-history': {
    id: 'inv-sparse-history',
    scenarioKey: 'sparse-history',
    kpiId: 'kpi-usage',
    title: 'New Product X Workflow Suite — Launch Analysis (6 Weeks History)',
    subtitle: 'Sparse History Investigation — Contextual Benchmarking Under Limited Data',
    period: 'Weeks 1–6 Post-GA Launch',
    previousValue: 'N/A (New)',
    currentValue: '1,420 WAU',
    changePct: -14.8,
    affectedSegment: 'Early Adopter Cohorts',
    affectedRegion: 'Global Rollout',
    affectedProduct: 'Product X (Workflow Suite v1.0)',
    businessImpact: '380 active users below target baseline',
    materialityLevel: 'MEDIUM',
    statisticalSignificance: 'LOW',
    status: 'LOW_CONFIDENCE',
    statusMessage: 'LOW CONFIDENCE: Insufficient historical baseline for reliable time-series anomaly detection. Results derived from contextual peer benchmarks.',
    statusBadge: 'ENGINE STATUS: LOW CONFIDENCE (SPARSE DATA: 6 WEEKS)',
    timelineStages: [
      { name: 'Data Ingestion', status: 'COMPLETED', timestamp: 'Day 42, 10:00 AM', detail: '6 weeks of daily telemetry ingested (42 total data points)' },
      { name: 'Baseline Evaluation', status: 'COMPLETED', timestamp: 'Day 42, 10:01 AM', detail: 'FLAGGED: Minimum requirement is 26 weeks for seasonal ARIMA modeling' },
      { name: 'Benchmark Fallback', status: 'COMPLETED', timestamp: 'Day 42, 10:03 AM', detail: 'Applied synthetic benchmark from comparable Product Y launch cohort (2025)' },
      { name: 'Contextual Scoring', status: 'COMPLETED', timestamp: 'Day 42, 10:06 AM', detail: 'Generated contextual hypotheses with explicit low-confidence disclaimers' }
    ],
    trendSeries: [
      { month: 'Wk 1', actual: 420, expected: 400, minExpected: 350, maxExpected: 450 },
      { month: 'Wk 2', actual: 780, expected: 750, minExpected: 680, maxExpected: 820 },
      { month: 'Wk 3', actual: 1120, expected: 1100, minExpected: 980, maxExpected: 1220 },
      { month: 'Wk 4', actual: 1310, expected: 1400, minExpected: 1250, maxExpected: 1550 },
      { month: 'Wk 5', actual: 1390, expected: 1650, minExpected: 1450, maxExpected: 1850 },
      { month: 'Wk 6', actual: 1420, expected: 1800, minExpected: 1550, maxExpected: 2050, isAnomaly: true, label: 'Wk 6 Benchmark Gap: -14.8% vs Product Y Launch Curve' }
    ],
    decomposition: {
      id: 'root-sparse',
      name: 'Product X WAU',
      changePct: -14.8,
      sharePct: 100,
      absoluteLoss: '-380 WAU vs Benchmark',
      children: [
        { id: 'sparse-ent', name: 'Enterprise Accounts', changePct: -22.0, sharePct: 60.0, absoluteLoss: '-260 WAU' },
        { id: 'sparse-smb', name: 'Self-Serve Users', changePct: -6.5, sharePct: 40.0, absoluteLoss: '-120 WAU' }
      ]
    },
    drivers: [
      { name: 'Onboarding Funnel Drop', contributionPct: -9.2, absoluteImpact: '-230 WAU', method: 'Funnel Stage Dropoff', type: 'negative', description: 'Step 3 (Data schema connection) shows 48% abandonment rate' },
      { name: 'Documentation Gap', contributionPct: -4.1, absoluteImpact: '-105 WAU', method: 'Search Query Deflection', type: 'negative', description: 'Missing developer quickstart guides for Python SDK' },
      { name: 'Other Residual', contributionPct: -1.5, absoluteImpact: '-45 WAU', method: 'Residual Estimation', type: 'negative', description: 'Early stage trial expirations' }
    ],
    hypotheses: [
      {
        id: 'hyp-onboarding-friction',
        name: 'Early Onboarding Schema Complexity',
        strengthScore: 62,
        statusBadge: 'MODERATE',
        summary: 'New users encounter setup difficulty at step 3 of the self-serve provisioning wizard.',
        assessment: 'Contextual strength 62/100. Strongest available qualitative signal, but sample size (n = 340 trials) is limited.',
        contradictionSummary: 'Users who successfully complete step 3 exhibit 88% 14-day retention.',
        supportingEvidence: [ALL_EVIDENCE_RECORDS[1]],
        contradictingEvidence: [],
        missingEvidence: MISSING_EVIDENCE_ITEMS,
        temporalTimeline: []
      }
    ],
    sparseDetails: {
      historyWeeks: 6,
      comparableProduct: 'Product Y (Launch Cohort Q3 2025)',
      warningMessage: 'Insufficient historical data for reliable anomaly detection.',
      contextualEvidenceNote: 'Historical coverage is 6 weeks (minimum 26 weeks required for Holt-Winters confidence intervals). Metric comparisons are benchmarked against historical Product Y launch curves rather than self-referential statistical baselines.'
    },
    causalityAssessment: {
      temporalConsistency: true,
      crossSourceConfirmation: false,
      alternativeExplanationCheck: false,
      causalEvidenceLevel: 'LIMITED',
      finalVerdict: 'Preliminary contextual benchmark only. Not statistically definitive.'
    },
    personaNarratives: {
      'CEO': {
        persona: 'CEO',
        headline: 'Product X Launch Trajectory: Early Onboarding Bottleneck (6 Weeks Data)',
        narrativeText: 'Product X has attained 1,420 Weekly Active Users at Week 6, which is 14.8% below the initial growth curve of Product Y at the equivalent lifecycle stage. Because this KPI has only 6 weeks of active history, statistical confidence is LOW. MarketTrace is utilizing contextual peer benchmarking rather than pretending to have high statistical certainty. Qualitative onboarding funnel signals identify step 3 (schema connection) as the primary friction point. Prioritizing self-serve wizard improvements is recommended to accelerate adoption.',
        strategicFocus: 'New Product Adoption Trajectory & Benchmark Grounding',
        keyMetricHighlight: '1,420 WAU (Week 6) | 6 Weeks Historical Coverage',
        recommendedFocus: 'Monitor onboarding completion rates without prematurely altering commercial targets.'
      },
      'Regional Manager': {
        persona: 'Regional Manager',
        headline: 'Early Customer Onboarding Assistance Required for Product X Trials',
        narrativeText: 'Early pilot accounts in all regions report that configuring custom data connections in Product X takes an average of 4 days without sales engineer support. Regional sales reps should provide pre-configured templates to early trial accounts to accelerate time-to-value during the first 30 days.',
        strategicFocus: 'Pilot Adoption Velocity & Account Onboarding Support',
        keyMetricHighlight: '4-Day Average Setup Time | 48% Funnel Step 3 Dropoff',
        recommendedFocus: 'Provide sales reps with pre-packaged template connectors for prospect demos.'
      },
      'Product Manager': {
        persona: 'Product Manager',
        headline: 'Telemetry Highlights Step 3 Schema Mapping as Primary Dropoff in Product X',
        narrativeText: 'Funnel analytics on the first 340 customer onboarding sessions indicate that 48% of users abandon at the schema mapping step. While our 6-week sample size is small, user session replays confirm that users struggle with unformatted JSON schema inputs. Shipping pre-built schema templates and automated type inference in Sprint 14 will remove this adoption blocker.',
        strategicFocus: 'Funnel Optimization & UX Friction Reduction',
        keyMetricHighlight: 'Step 3 Abandonment: 48% | Sample Size: n = 340 users',
        recommendedFocus: 'Release automated schema detection wizard and in-app interactive video tutorial.'
      },
      'Data Analyst': {
        persona: 'Data Analyst',
        headline: 'Methodology Alert: Synthetic Baseline Used Due to Insufficient History (n = 42 Days)',
        narrativeText: 'With only 42 daily data points, statistical ARIMA / Holt-Winters time-series modeling is mathematically underdetermined (degrees of freedom < 12). The baseline shown is a synthetic comparative curve derived from Product Y Q3 2025 launch data normalized for cohort scale. All inferences must be treated as exploratory contextual indicators rather than verified anomalies. Full anomaly detection gates will activate at Week 26.',
        strategicFocus: 'Sample Size Constraints & Benchmark Validity',
        keyMetricHighlight: 'Coverage: 42 Days (Min 180 Required) | Synthetic Benchmark: Product Y 2025',
        recommendedFocus: 'Maintain low-confidence classification and prevent automated alerting until 26-week baseline accumulates.'
      }
    },
    actions: [
      {
        id: 'act-sparse-1',
        driver: 'Onboarding Funnel Drop',
        controllableLever: 'Self-Serve Provisioning UX',
        title: 'Release Automated Schema Auto-Mapping Wizard in Product X',
        description: 'Replace manual JSON schema input in Step 3 with one-click automated connector auto-detection for PostgreSQL and Snowflake.',
        expectedImpact: 'Estimated +20% reduction in trial onboarding abandonment.',
        owner: 'Product Design & Core Workflow Team (Lead: Priya Sharma)',
        allowedRoles: ['CEO', 'Product Manager', 'Data Analyst'],
        confidence: 'Moderate',
        controllability: 'High',
        monitoringMetrics: ['Step 3 Onboarding Pass Rate', 'Time-to-First-Successful-Workflow', 'WAU Week 8 Cohort'],
        status: 'Proposed'
      }
    ],
    telemetry: {
      avgLatencySec: 2.4,
      llmCallsCount: 2,
      tokensUsed: 2980,
      estimatedCostUsd: 0.015,
      cacheHitRatePct: 72,
      latencyBreakdown: { sqlMs: 310, retrievalMs: 240, llmMs: 1100, renderMs: 750 },
      insightsStats: { generated: 1284, failed: 3, abstained: 94 },
      driftStatus: { dataDrift: 'Low', modelPerformance: 'Stable', contractChanges: 2, dataQualityAlerts: 4 }
    }
  }
};
