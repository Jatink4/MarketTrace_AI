import React, { useState } from 'react';
import { CONNECTED_KPIS, CONNECTED_DATA_SOURCES, CONNECTED_KPI_GRAPH_NODES } from '../data/kpiData';
import { KPI, Persona, ScenarioKey } from '../types';
import { Card } from '../components/common/Card';
import { MaterialityBadge } from '../components/common/Badge';
import { SemanticContractModal } from '../components/governance/SemanticContractModal';
import {
  TrendingDown,
  TrendingUp,
  SearchCode,
  ShieldCheck,
  Database,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  CheckCircle2,
  FileCode2,
  HelpCircle,
  Activity
} from 'lucide-react';

interface OverviewPageProps {
  onLaunchInvestigation: (scenarioKey?: ScenarioKey) => void;
  currentPersona: Persona;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onLaunchInvestigation,
  currentPersona
}) => {
  const [selectedContractKPI, setSelectedContractKPI] = useState<KPI | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Morning Brief Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
              August 2026 — Fiscal Overview
            </span>
            <span className="text-xs text-gray-400 font-mono">Last refreshed: 18 mins ago</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">
            Good morning, Alex
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">
            Here are the material changes across your business. The analytical engine flagged <strong className="text-rose-600">1 Critical Anomaly</strong> requiring investigation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onLaunchInvestigation('cloudflow-aug-2026')}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-500/20 flex items-center gap-2"
          >
            <SearchCode className="w-4 h-4" />
            <span>Investigate August Revenue Drop (-8.4%)</span>
          </button>
        </div>
      </div>

      {/* 5 Connected KPI Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            Governed Executive KPIs (August 2026)
          </h3>
          <span className="text-xs text-gray-500 font-medium">Click "WHY?" to launch root-cause investigation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {CONNECTED_KPIS.map((kpi) => {
            const isRevenue = kpi.id === 'kpi-revenue';
            const isNegativeChange = kpi.changePct < 0;

            return (
              <div
                key={kpi.id}
                className={`bg-white rounded-xl border p-4 flex flex-col justify-between transition-all relative ${
                  isRevenue
                    ? 'border-2 border-rose-300 shadow-md ring-2 ring-rose-100'
                    : 'border-gray-200 shadow-2xs hover:shadow-card'
                }`}
              >
                {/* Card Top */}
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-xs font-bold text-gray-700 truncate" title={kpi.name}>
                      {kpi.name}
                    </span>
                    <MaterialityBadge level={kpi.materiality} />
                  </div>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-gray-950 font-mono tracking-tight">
                      {kpi.currentValue}
                    </span>
                    <span
                      className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                        (isNegativeChange && !kpi.isNegativeGood) || (!isNegativeChange && kpi.isNegativeGood)
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {isNegativeChange ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                      {kpi.changePct > 0 ? `+${kpi.changePct}%` : `${kpi.changePct}%`}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 mt-1">
                    Prev: <span className="font-mono text-gray-600">{kpi.previousValue}</span>
                  </p>

                  <div className="mt-2 text-[10px] text-gray-500 font-mono bg-gray-50 p-1.5 rounded border border-gray-100">
                    {kpi.expectedRange.label}
                  </div>
                </div>

                {/* Mini Sparkline SVG */}
                <div className="my-3 h-8 w-full flex items-end gap-1">
                  {kpi.sparklineData.map((val, idx) => {
                    const min = Math.min(...kpi.sparklineData);
                    const max = Math.max(...kpi.sparklineData);
                    const heightPct = Math.max(15, ((val - min) / (max - min || 1)) * 100);
                    const isLast = idx === kpi.sparklineData.length - 1;

                    return (
                      <div
                        key={idx}
                        className={`flex-1 rounded-xs transition-all ${
                          isLast
                            ? isRevenue ? 'bg-rose-600' : 'bg-indigo-600'
                            : 'bg-slate-200'
                        }`}
                        style={{ height: `${heightPct}%` }}
                        title={`Month ${idx + 1}: ${val}`}
                      />
                    );
                  })}
                </div>

                {/* Card Bottom / Actions */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedContractKPI(kpi)}
                    className="text-[10px] text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-1"
                    title="View Governed Semantic Contract & Lineage"
                  >
                    <FileCode2 className="w-3 h-3" />
                    <span>Contract</span>
                  </button>

                  {isRevenue ? (
                    <button
                      onClick={() => onLaunchInvestigation('cloudflow-aug-2026')}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-extrabold flex items-center gap-1 shadow-xs transition-transform active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>WHY?</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onLaunchInvestigation('cloudflow-aug-2026')}
                      className="px-2 py-0.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded"
                    >
                      Investigate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Materiality Engine Dedicated Section (Objective 1 & 11) */}
      <Card
        title="Materiality Engine — Is this movement meaningful?"
        subtitle="Objective 1: Distinguishing statistically significant deviations & business impact from statistical noise"
        badge={
          <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-800 rounded font-semibold border border-emerald-200">
            Deterministic Engine (Non-LLM)
          </span>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Observed Variance</span>
              <p className="text-base font-extrabold text-rose-600 font-mono">-8.4%</p>
              <span className="text-[10px] text-gray-500">Actual: ₹9.16 Cr</span>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Expected Normal Range</span>
              <p className="text-xs font-bold text-indigo-900 font-mono mt-1">-2.0% to +2.5%</p>
              <span className="text-[10px] text-gray-500">₹9.80–₹10.30 Cr (95% CI)</span>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Statistical Deviation</span>
              <p className="text-sm font-bold text-rose-700 mt-1">HIGH (Z = -3.42)</p>
              <span className="text-[10px] text-gray-500">p &lt; 0.001 (Significant)</span>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Business ARR Impact</span>
              <p className="text-sm font-extrabold text-gray-900 mt-1 font-mono">₹84 Lakh</p>
              <span className="text-[10px] text-gray-500">Exceeds ₹25L Material Gate</span>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Strategic Importance</span>
              <p className="text-sm font-bold text-indigo-950 mt-1">HIGH (Tier-1 Segment)</p>
              <span className="text-[10px] text-gray-500">Enterprise Pilot Cohort</span>
            </div>

            <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl space-y-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-800">Final Materiality</span>
                <p className="text-base font-extrabold text-rose-700">HIGH</p>
              </div>
              <span className="text-[10px] text-rose-900 font-semibold">Priority: Immediate Triage</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-900">
              <Info className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>
                <strong>Product Principle:</strong> Materiality combines statistical deviation with business impact. The LLM does NOT calculate materiality.
              </span>
            </div>
            <span className="font-mono text-[11px] text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 font-semibold">
              Method: Statistical Anomaly Detection + Governed Business Rules
            </span>
          </div>
        </div>
      </Card>

      {/* Connected KPI Relationship Flow Diagram (Objective 41) */}
      <Card
        title="Connected KPI Dependency Chain"
        subtitle="Empirical system relationships across product telemetry, support volume, funnel conversion, and top-line revenue"
      >
        <div className="space-y-3">
          <div className="p-3 bg-slate-900 text-white rounded-xl text-xs space-y-1">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block font-bold">
              MULTI-SYSTEM EMPIRICAL PROGRESSION
            </span>
            <p className="text-gray-300">
              System signals show co-occurring degradation across upstream product telemetry and operational support, ultimately propagating to enterprise deal closures and realized revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
            {CONNECTED_KPI_GRAPH_NODES.map((node, idx) => (
              <div
                key={node.id}
                className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-1.5 relative group hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">{node.name}</span>
                  <span className="font-mono font-bold text-rose-600 text-xs">{node.change}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug">{node.detail}</p>
                {idx < CONNECTED_KPI_GRAPH_NODES.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-gray-400 bg-white rounded-full p-0.5 border border-gray-200 shadow-2xs">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-[11px] text-gray-500 italic text-right pt-1">
            * Note: These links represent documented empirical correlations across systems, not unverified assumptions.
          </div>
        </div>
      </Card>

      {/* Data Reconciliation & Context (Objective 2 & 13) */}
      <Card
        title="Heterogeneous Data Context & Source Reconciliation"
        subtitle="Reconciling disparate data grains, refresh schedules, and data quality across enterprise systems"
        badge={
          <span className="px-2 py-0.5 text-xs bg-emerald-50 text-emerald-800 rounded font-semibold border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 5 Connected Enterprise Sources
          </span>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {CONNECTED_DATA_SOURCES.map((source) => (
            <div
              key={source.id}
              className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-2 hover:shadow-card transition-shadow"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                <span className="font-bold text-gray-900 truncate" title={source.name}>
                  {source.name.split(' ')[0]}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Grain:</span>
                  <strong className="font-mono text-gray-900">{source.grain}</strong>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Refresh:</span>
                  <strong className="font-mono text-indigo-700">{source.refreshCadence}</strong>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Coverage:</span>
                  <strong className="font-mono text-emerald-700">{source.coverage}%</strong>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Data Quality:</span>
                  <strong className="font-mono text-emerald-700">{source.quality}%</strong>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 line-clamp-2 pt-1 border-t border-gray-50">
                {source.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Semantic Contract Modal */}
      {selectedContractKPI && (
        <SemanticContractModal
          isOpen={!!selectedContractKPI}
          onClose={() => setSelectedContractKPI(null)}
          contract={selectedContractKPI.semanticContract}
        />
      )}
    </div>
  );
};
