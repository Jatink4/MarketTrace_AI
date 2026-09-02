export type Persona = 'CEO' | 'Regional Manager' | 'Product Manager' | 'Data Analyst';

export type MaterialityLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type ConfidenceLevel = 'High' | 'Moderate' | 'Low' | 'Insufficient';
export type InvestigationStatus = 'ESTABLISHED' | 'ABSTAIN' | 'LOW_CONFIDENCE';
export type ScenarioKey = 'cloudflow-aug-2026' | 'ambiguous-revenue' | 'sparse-history';

export interface SemanticContract {
  kpi: string;
  definition: string;
  formula: string;
  grain: string;
  dimensions: string[];
  calendar: string;
  threshold: string;
  owner: string;
  access: string;
  lineage: Array<{
    step: number;
    title: string;
    system: string;
    description: string;
  }>;
}

export interface KPI {
  id: string;
  name: string;
  category: 'Financial' | 'Growth' | 'Customer' | 'Product' | 'Operations';
  currentValue: string;
  previousValue: string;
  numericCurrent: number;
  numericPrevious: number;
  unit: string;
  changePct: number;
  isNegativeGood?: boolean;
  materiality: MaterialityLevel;
  statisticalSignificance: 'HIGH' | 'MEDIUM' | 'LOW';
  businessImpactFormatted: string;
  freshness: string;
  sparklineData: number[];
  expectedRange: {
    min: string;
    max: string;
    numericMin: number;
    numericMax: number;
    label: string;
  };
  semanticContract: SemanticContract;
}

export interface DataSourceContext {
  id: string;
  name: string;
  grain: string;
  refreshCadence: string;
  freshness: string;
  coverage: number; // percentage
  quality: number; // percentage
  status: 'Healthy' | 'Degraded' | 'Syncing';
  recordsCount: string;
  description: string;
}

export interface DriverContribution {
  name: string;
  contributionPct: number;
  absoluteImpact: string;
  method: string;
  type: 'negative' | 'positive';
  description: string;
}

export interface EvidenceItem {
  id: string;
  source: 'Customer Support' | 'Product Analytics' | 'CRM' | 'Customer Feedback' | 'Market Intelligence' | 'Sales Database';
  title: string;
  metricChange?: string;
  date: string;
  entity: string;
  excerpt: string;
  rawRecordId: string;
  rawDetail: string;
  strengthImpact: 'HIGH' | 'MEDIUM' | 'LOW';
  isSupporting: boolean;
  isContradicting?: boolean;
  hypothesisId: string;
}

export interface MissingEvidenceItem {
  id: string;
  source: string;
  name: string;
  description: string;
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface TemporalCheckItem {
  date: string;
  event: string;
  source: string;
  isConsistent: boolean;
  note: string;
}

export interface RootCauseHypothesis {
  id: string;
  name: string;
  strengthScore: number; // 0 - 100
  statusBadge: 'STRONGEST CURRENT EXPLANATION' | 'MODERATE' | 'WEAK';
  summary: string;
  assessment: string;
  contradictionSummary: string;
  supportingEvidence: EvidenceItem[];
  contradictingEvidence: EvidenceItem[];
  missingEvidence: MissingEvidenceItem[];
  temporalTimeline: TemporalCheckItem[];
}

export interface DecompositionNode {
  id: string;
  name: string;
  changePct: number;
  sharePct?: number;
  absoluteLoss?: string;
  children?: DecompositionNode[];
}

export interface PersonaNarrative {
  persona: Persona;
  headline: string;
  narrativeText: string;
  strategicFocus: string;
  keyMetricHighlight: string;
  recommendedFocus: string;
}

export interface RecommendedAction {
  id: string;
  driver: string;
  controllableLever: string;
  title: string;
  description: string;
  expectedImpact: string;
  owner: string;
  allowedRoles: Persona[];
  confidence: 'High' | 'Moderate' | 'Low';
  controllability: 'High' | 'Moderate' | 'Low';
  monitoringMetrics: string[];
  status: 'Proposed' | 'In Review' | 'Approved' | 'Triggered';
}

export interface FeedbackSubmission {
  id: string;
  timestamp: string;
  investigationId: string;
  isUseful: 'CORRECT' | 'INCORRECT' | 'PARTIALLY_CORRECT';
  selectedRootCause: string;
  comment: string;
  analyst: string;
}

export interface TelemetryStats {
  avgLatencySec: number;
  llmCallsCount: number;
  tokensUsed: number;
  estimatedCostUsd: number;
  cacheHitRatePct: number;
  latencyBreakdown: {
    sqlMs: number;
    retrievalMs: number;
    llmMs: number;
    renderMs: number;
  };
  insightsStats: {
    generated: number;
    failed: number;
    abstained: number;
  };
  driftStatus: {
    dataDrift: 'Low' | 'Moderate' | 'High';
    modelPerformance: 'Stable' | 'Drifting';
    contractChanges: number;
    dataQualityAlerts: number;
  };
}

export interface Investigation {
  id: string;
  scenarioKey: ScenarioKey;
  kpiId: string;
  title: string;
  subtitle: string;
  period: string;
  previousValue: string;
  currentValue: string;
  changePct: number;
  affectedSegment: string;
  affectedRegion: string;
  affectedProduct: string;
  businessImpact: string;
  materialityLevel: MaterialityLevel;
  statisticalSignificance: 'HIGH' | 'MEDIUM' | 'LOW';
  status: InvestigationStatus;
  statusMessage: string;
  statusBadge: string;
  timelineStages: Array<{
    name: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
    timestamp: string;
    detail: string;
  }>;
  trendSeries: Array<{
    month: string;
    actual: number;
    expected: number;
    minExpected: number;
    maxExpected: number;
    isAnomaly?: boolean;
    label?: string;
  }>;
  decomposition: DecompositionNode;
  drivers: DriverContribution[];
  hypotheses: RootCauseHypothesis[];
  abstentionDetails?: {
    reason: string;
    competingHypotheses: Array<{ name: string; score: number }>;
    message: string;
    guidance: string;
  };
  sparseDetails?: {
    historyWeeks: number;
    comparableProduct: string;
    warningMessage: string;
    contextualEvidenceNote: string;
  };
  causalityAssessment: {
    temporalConsistency: boolean;
    crossSourceConfirmation: boolean;
    alternativeExplanationCheck: boolean;
    causalEvidenceLevel: 'LIMITED' | 'MODERATE' | 'STRONG';
    finalVerdict: string;
  };
  personaNarratives: Record<Persona, PersonaNarrative>;
  actions: RecommendedAction[];
  telemetry: TelemetryStats;
}

export interface GovernanceUserRole {
  persona: Persona;
  title: string;
  department: string;
  revenueAccess: boolean;
  customerLevelData: 'Full' | 'Limited' | 'Masked';
  financeSensitiveFields: 'Visible' | 'Restricted';
  hrAccess: 'Allowed' | 'Denied';
  regionAccess: Record<string, 'Visible' | 'Restricted'>;
  decisionRights: string[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  kpi: string;
  dataAccessed: string;
  analysisType: string;
  actionTaken: string;
  policyEnforced: string;
}
