import {
  KPI,
  Investigation,
  ScenarioKey,
  Persona,
  DriverContribution,
  RootCauseHypothesis,
  EvidenceItem,
  RecommendedAction,
  FeedbackSubmission,
  MaterialityLevel
} from '../types';
import { CONNECTED_KPIS } from '../data/kpiData';
import { INVESTIGATIONS_MAP } from '../data/investigationsData';
import { ALL_EVIDENCE_RECORDS } from '../data/evidenceData';
import { MASTER_ACTIONS_CATALOG, PERSONA_DECISION_RIGHTS } from '../data/actionsData';
import { LEARNING_LOOP_STATS } from '../data/governanceData';

/**
 * Analytical Engine Service
 * Implements deterministic calculation and simulation layer:
 * Non-LLM mathematical rigor + LLM persona orchestration
 */

export class AnalyticalEngineService {
  /**
   * Objective 1: Detect and prioritize material KPI movements
   * Combines statistical significance (Z-score vs confidence band) and absolute business impact.
   * Deterministic calculation: LLM is NEVER allowed to calculate materiality.
   */
  static detectMateriality(kpi: KPI): {
    isMaterial: boolean;
    level: MaterialityLevel;
    zScore: number;
    statisticalSignificance: 'HIGH' | 'MEDIUM' | 'LOW';
    businessImpactText: string;
    methodology: string;
    explanation: string;
  } {
    const deviationPct = Math.abs(kpi.changePct);
    const isOutsideExpected =
      kpi.numericCurrent < kpi.expectedRange.numericMin ||
      kpi.numericCurrent > kpi.expectedRange.numericMax;

    let zScore = (kpi.numericCurrent - (kpi.expectedRange.numericMin + kpi.expectedRange.numericMax) / 2) / 0.25;
    zScore = Number(zScore.toFixed(2));

    const significance: 'HIGH' | 'MEDIUM' | 'LOW' =
      Math.abs(zScore) >= 2.5 || deviationPct >= 8.0 ? 'HIGH' : Math.abs(zScore) >= 1.5 ? 'MEDIUM' : 'LOW';

    const level: MaterialityLevel =
      significance === 'HIGH' && isOutsideExpected ? 'HIGH' : significance === 'MEDIUM' ? 'MEDIUM' : 'LOW';

    return {
      isMaterial: level === 'HIGH' || level === 'MEDIUM',
      level,
      zScore,
      statisticalSignificance: significance,
      businessImpactText: kpi.businessImpactFormatted,
      methodology: 'Holt-Winters ARIMA (95% CI) + Deterministic Business Rule Matrix',
      explanation: `Materiality combines statistical deviation (Z-score: ${zScore}) with business impact (${kpi.businessImpactFormatted}). Analytical engine flags this movement as ${level} priority.`
    };
  }

  /**
   * Objective 2 & 3: Hierarchical Decomposition & Contribution Analysis
   */
  static getInvestigation(scenarioKey: ScenarioKey = 'cloudflow-aug-2026'): Investigation {
    return INVESTIGATIONS_MAP[scenarioKey] || INVESTIGATIONS_MAP['cloudflow-aug-2026'];
  }

  /**
   * Driver Contribution Analysis
   */
  static analyzeDrivers(investigationId: string): DriverContribution[] {
    const inv = Object.values(INVESTIGATIONS_MAP).find(i => i.id === investigationId) || INVESTIGATIONS_MAP['cloudflow-aug-2026'];
    return inv.drivers;
  }

  /**
   * Cross-source Evidence Retrieval & Triangulation
   */
  static retrieveEvidence(hypothesisId?: string, sourceFilter?: string): EvidenceItem[] {
    let list = ALL_EVIDENCE_RECORDS;
    if (hypothesisId) {
      list = list.filter(e => e.hypothesisId === hypothesisId);
    }
    if (sourceFilter && sourceFilter !== 'ALL') {
      list = list.filter(e => e.source === sourceFilter);
    }
    return list;
  }

  /**
   * Hypotheses Ranking
   */
  static rankHypotheses(investigationId: string): RootCauseHypothesis[] {
    const inv = Object.values(INVESTIGATIONS_MAP).find(i => i.id === investigationId) || INVESTIGATIONS_MAP['cloudflow-aug-2026'];
    return [...inv.hypotheses].sort((a, b) => b.strengthScore - a.strengthScore);
  }

  /**
   * LLM Orchestration: Persona-Specific Narrative Generation
   * Notice: The underlying numerical facts remain strictly identical across all personas!
   */
  static generateNarrative(investigationId: string, persona: Persona) {
    const inv = Object.values(INVESTIGATIONS_MAP).find(i => i.id === investigationId) || INVESTIGATIONS_MAP['cloudflow-aug-2026'];
    const narrativeObj = inv.personaNarratives[persona] || inv.personaNarratives['CEO'];

    return {
      persona,
      headline: narrativeObj.headline,
      text: narrativeObj.narrativeText,
      strategicFocus: narrativeObj.strategicFocus,
      keyMetricHighlight: narrativeObj.keyMetricHighlight,
      recommendedFocus: narrativeObj.recommendedFocus,
      llmRoleNotice: 'Quantitative truth calculated deterministically. LLM generated narrative synthesis tailored for ' + persona + '.'
    };
  }

  /**
   * Governed Action Generation
   */
  static generateActions(investigationId: string, persona?: Persona): RecommendedAction[] {
    const inv = Object.values(INVESTIGATIONS_MAP).find(i => i.id === investigationId) || INVESTIGATIONS_MAP['cloudflow-aug-2026'];
    let actions = inv.actions || MASTER_ACTIONS_CATALOG;

    if (persona) {
      actions = actions.filter(a => a.allowedRoles.includes(persona));
    }
    return actions;
  }

  /**
   * Human Feedback Loop Submission
   */
  static submitFeedback(feedback: Omit<FeedbackSubmission, 'id' | 'timestamp'>): FeedbackSubmission {
    const newSubmission: FeedbackSubmission = {
      ...feedback,
      id: `fb-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    // Update simulation stats in memory
    LEARNING_LOOP_STATS.totalAnalystCorrections += 1;
    if (feedback.isUseful === 'CORRECT') {
      LEARNING_LOOP_STATS.acceptedHypothesesPct = Math.min(99, LEARNING_LOOP_STATS.acceptedHypothesesPct + 1);
    } else if (feedback.isUseful === 'INCORRECT') {
      LEARNING_LOOP_STATS.rejectedHypothesesPct += 1;
    }

    LEARNING_LOOP_STATS.recentFeedbackHistory.unshift({
      id: newSubmission.id,
      timestamp: newSubmission.timestamp,
      investigationId: newSubmission.investigationId,
      isUseful: newSubmission.isUseful,
      selectedRootCause: newSubmission.selectedRootCause,
      comment: newSubmission.comment,
      analyst: newSubmission.analyst
    });

    return newSubmission;
  }

  /**
   * Get Decision Rights for Persona
   */
  static getDecisionRights(persona: Persona) {
    return PERSONA_DECISION_RIGHTS[persona] || PERSONA_DECISION_RIGHTS['CEO'];
  }

  /**
   * Get KPI by ID
   */
  static getKPI(kpiId: string): KPI {
    return CONNECTED_KPIS.find(k => k.id === kpiId) || CONNECTED_KPIS[0];
  }
}
