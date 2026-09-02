import React, { useState } from 'react';
import { Persona, ScenarioKey } from '../types';
import { AnalyticalEngineService } from '../services/analyticalEngine';
import { Card } from '../components/common/Card';
import { MaterialityBadge, AnalyticalMethodBadge } from '../components/common/Badge';
import { InvestigationTimeline } from '../components/investigation/InvestigationTimeline';
import { AnomalyChart } from '../components/investigation/AnomalyChart';
import { DecompositionFlow } from '../components/investigation/DecompositionFlow';
import { DriverWaterfall } from '../components/investigation/DriverWaterfall';
import { HypothesesSection } from '../components/investigation/HypothesesSection';
import { CorrelationCausationCard } from '../components/investigation/CorrelationCausationCard';
import { AIStoryCard } from '../components/investigation/AIStoryCard';
import { ActionEngineCard } from '../components/investigation/ActionEngineCard';
import { FeedbackCard } from '../components/investigation/FeedbackCard';
import {
  AlertOctagon,
  ShieldCheck,
  Cpu,
  Database,
  HelpCircle,
  Clock,
  CheckCircle2,
  FileSearch,
  Sparkles,
  RefreshCw,
  Activity,
  Layers
} from 'lucide-react';

interface InvestigationPageProps {
  currentScenario: ScenarioKey;
  onScenarioChange: (scenario: ScenarioKey) => void;
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export const InvestigationPage: React.FC<InvestigationPageProps> = ({
  currentScenario,
  onScenarioChange,
  currentPersona,
  onPersonaChange
}) => {
  const investigation = AnalyticalEngineService.getInvestigation(currentScenario);
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'evidence' | 'drivers' | 'actions'>('all');

  const isAbstain = investigation.status === 'ABSTAIN';
  const isSparse = investigation.status === 'LOW_CONFIDENCE';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-subtle space-y-4">
        {/* Scenario Switcher Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span>MarketTrace AI</span>
            <span>/</span>
            <span>Investigations Hub</span>
            <span>/</span>
            <span className="font-bold text-gray-900 font-mono">{investigation.id}</span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => onScenarioChange('cloudflow-aug-2026')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currentScenario === 'cloudflow-aug-2026'
                  ? 'bg-white text-indigo-700 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🔥 Main Demo (Revenue -8.4%)
            </button>
            <button
              onClick={() => onScenarioChange('ambiguous-revenue')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currentScenario === 'ambiguous-revenue'
                  ? 'bg-white text-amber-700 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚖️ Ambiguous (-7.2% Abstain)
            </button>
            <button
              onClick={() => onScenarioChange('sparse-history')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currentScenario === 'sparse-history'
                  ? 'bg-white text-blue-700 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ⏳ Sparse History (6-Wks Low Conf)
            </button>
          </div>
        </div>

        {/* Title & Key Anomaly Summary */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">
                {investigation.title}
              </h2>
              <MaterialityBadge level={investigation.materialityLevel} />
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1">{investigation.subtitle}</p>
          </div>

          {/* Key Metric Transition Pill */}
          <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center gap-4 shadow-sm">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Baseline → Actual</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-xs text-gray-300">{investigation.previousValue}</span>
                <span className="text-gray-500">→</span>
                <span className="font-mono text-base font-extrabold text-white">{investigation.currentValue}</span>
              </div>
            </div>
            <div className="pl-3 border-l border-slate-700 text-left">
              <span className="text-[10px] uppercase font-bold text-rose-400 block">Net Contraction</span>
              <span className="text-base font-extrabold text-rose-400 font-mono">
                {investigation.changePct}%
              </span>
            </div>
          </div>
        </div>

        {/* Investigation Summary Attributes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">AFFECTED SEGMENT</span>
            <p className="font-bold text-gray-900 mt-0.5">{investigation.affectedSegment}</p>
          </div>

          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">AFFECTED REGION</span>
            <p className="font-bold text-gray-900 mt-0.5">{investigation.affectedRegion}</p>
          </div>

          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">AFFECTED PRODUCT</span>
            <p className="font-bold text-gray-900 mt-0.5">{investigation.affectedProduct}</p>
          </div>

          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">BUSINESS IMPACT</span>
            <p className="font-extrabold text-rose-700 mt-0.5 font-mono">{investigation.businessImpact}</p>
          </div>
        </div>
      </div>

      {/* SPECIAL SCENARIO 2: AMBIGUITY / ABSTENTION CALLOUT (Objective 25 & 48) */}
      {isAbstain && (
        <div className="p-6 bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50 rounded-2xl border-2 border-amber-400 shadow-md space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs mt-0.5">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-xs font-mono font-extrabold rounded">
                    ENGINE STATUS: ABSTAIN
                  </span>
                  <h3 className="text-lg font-black text-amber-950 tracking-tight">
                    NO SINGLE ROOT CAUSE ESTABLISHED
                  </h3>
                </div>
                <p className="text-sm font-semibold text-amber-900 mt-1">
                  "The available evidence supports multiple competing explanations with similar strength. The system will not force a single causal narrative."
                </p>
                <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                  MarketTrace AI adheres to responsible AI guardrails: when statistical variance between top hypotheses is below threshold (SE &plusmn; 6.2), the engine prefers transparent uncertainty over an unsupported causal explanation.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-amber-200 text-right font-mono text-xs shadow-2xs">
              <span className="text-gray-400 block text-[10px] uppercase">Competitor vs Seasonality Delta</span>
              <span className="font-bold text-amber-800 text-sm">3.0 pts (&lt; 5.0 Threshold)</span>
            </div>
          </div>

          {/* Competing Scores Comparison */}
          {investigation.abstentionDetails && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {investigation.abstentionDetails.competingHypotheses.map((comp, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                  <span className="text-xs font-bold text-gray-900">{comp.name}</span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-gray-500">Evidence Strength:</span>
                    <span className="text-xs font-bold font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {comp.score} / 100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SPECIAL SCENARIO 3: SPARSE HISTORY CALLOUT (Objective 26 & 53) */}
      {isSparse && (
        <div className="p-6 bg-gradient-to-br from-blue-500/10 via-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-400 shadow-md space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs mt-0.5">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-200 text-blue-900 text-xs font-mono font-extrabold rounded">
                  LOW CONFIDENCE GUARDRAIL
                </span>
                <h3 className="text-lg font-black text-blue-950 tracking-tight">
                  INSUFFICIENT HISTORICAL DATA FOR STATISTICAL ANOMALY DETECTION
                </h3>
              </div>
              <p className="text-sm font-semibold text-blue-900 mt-1">
                "Historical coverage is only 6 weeks (minimum 26 weeks required for Holt-Winters time-series modeling)."
              </p>
              <p className="text-xs text-blue-800/80 mt-1 leading-relaxed">
                The engine has substituted a synthetic comparative curve derived from <strong>Product Y (Launch Cohort Q3 2025)</strong>. All inferences are clearly labeled as <em>Contextual Benchmarks — Lower Confidence</em> rather than statistically definitive anomalies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Investigation Timeline Stepper */}
      <InvestigationTimeline stages={investigation.timelineStages} />

      {/* Section 1: WHAT CHANGED? (12-Month Anomaly Baseline Chart) */}
      <Card
        title="1. What Changed? — Time Series Anomaly Detection"
        subtitle="Evaluating observed movement against historical baseline and 95% statistical confidence bounds"
        badge={<AnalyticalMethodBadge method="Holt-Winters ARIMA (95% CI)" />}
      >
        <AnomalyChart data={investigation.trendSeries} unit={investigation.kpiId === 'kpi-usage' ? 'WAU' : '₹ Cr'} />
      </Card>

      {/* Section 2: WHERE DID IT CHANGE? (Hierarchical Variance Decomposition) */}
      <Card
        title="2. Where Did It Change? — Hierarchical KPI Decomposition"
        subtitle="Isolating variance across Segment, Region, and Product dimensions"
        badge={<AnalyticalMethodBadge method="Multi-Dimensional Decomposition" />}
      >
        <DecompositionFlow rootNode={investigation.decomposition} />
      </Card>

      {/* Section 3: MULTI-FACTOR DRIVER ANALYSIS */}
      <Card
        title="3. Multi-Factor Driver Analysis — Variance Attribution"
        subtitle="Decomposing the KPI movement into interacting volume, churn, price, mix, and external market drivers"
        badge={<AnalyticalMethodBadge method="Deterministic Contribution Analysis" />}
      >
        <DriverWaterfall drivers={investigation.drivers} totalChangePct={investigation.changePct} />
      </Card>

      {/* Section 4: ROOT-CAUSE HYPOTHESES & EVIDENCE */}
      <Card
        title="4. Root-Cause Hypotheses & Cross-Source Evidence"
        subtitle="Evaluating competing explanations against multi-source enterprise evidence (0–100 Evidence Strength Scores)"
        badge={<AnalyticalMethodBadge method="Cross-Source Evidence Engine" />}
      >
        <HypothesesSection hypotheses={investigation.hypotheses} />
      </Card>

      {/* Section 5: CORRELATION VS CAUSATION */}
      <Card
        title="5. Methodological Rigor: Correlation vs. Causation Guardrail"
        subtitle="Chronological precedence validation, cross-source confirmation, and causal limits"
        badge={<AnalyticalMethodBadge method="Temporal Triangulation & Causal Checks" />}
      >
        <CorrelationCausationCard
          timeline={investigation.hypotheses[0]?.temporalTimeline || []}
          causalityAssessment={investigation.causalityAssessment}
        />
      </Card>

      {/* Section 6: AI INVESTIGATION STORY WITH PERSONA SWITCHER */}
      <AIStoryCard
        personaNarratives={investigation.personaNarratives}
        currentPersona={currentPersona}
        onPersonaChange={onPersonaChange}
      />

      {/* Section 7: ACTION RECOMMENDATION ENGINE */}
      <Card
        title="6. Governed Action Recommendations"
        subtitle="Actionable business levers mapped to drivers, owners, decision rights, and telemetry monitoring"
        badge={<AnalyticalMethodBadge method="Governed Business Levers" />}
      >
        <ActionEngineCard actions={investigation.actions} currentPersona={currentPersona} />
      </Card>

      {/* Section 8: HUMAN FEEDBACK & LEARNING */}
      <FeedbackCard investigationId={investigation.id} />

      {/* Runtime Telemetry Footer Bar */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono border border-slate-800 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Activity className="w-4 h-4" />
            <span>Telemetry: {investigation.telemetry.avgLatencySec}s Latency</span>
          </div>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">LLM Calls: <strong>{investigation.telemetry.llmCallsCount}</strong></span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">Tokens: <strong>{investigation.telemetry.tokensUsed.toLocaleString()}</strong></span>
          <span className="text-gray-500">|</span>
          <span className="text-emerald-300">Cost: <strong>${investigation.telemetry.estimatedCostUsd} / insight</strong></span>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-[11px]">
          <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-indigo-300">
            SQL: {investigation.telemetry.latencyBreakdown.sqlMs}ms
          </span>
          <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-indigo-300">
            Retrieval: {investigation.telemetry.latencyBreakdown.retrievalMs}ms
          </span>
          <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-indigo-300">
            LLM: {investigation.telemetry.latencyBreakdown.llmMs}ms
          </span>
        </div>
      </div>
    </div>
  );
};
