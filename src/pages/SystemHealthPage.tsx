import React from 'react';
import {
  ARCHITECTURE_PIPELINE_STAGES,
  LLM_VS_NON_LLM_COMPARISON,
  TELEMETRY_METRICS
} from '../data/telemetryData';
import { Card } from '../components/common/Card';
import {
  Activity,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  DollarSign,
  Layers,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Server
} from 'lucide-react';

export const SystemHealthPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              System Architecture, Runtime Telemetry & Health
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time latency metrics, cost economics ($0.018/insight), LLM vs Non-LLM separation, and architecture pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All Systems Operational (99.98% Uptime)</span>
        </div>
      </div>

      {/* 4 Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400">Average Latency</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-950 font-mono">
            {TELEMETRY_METRICS.avgLatencySec}s
          </p>
          <span className="text-[11px] text-emerald-600 font-medium font-mono">Fast (Cache 64%)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400">Tokens / Insight</span>
            <Cpu className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-indigo-700 font-mono">
            {TELEMETRY_METRICS.tokensUsed.toLocaleString()}
          </p>
          <span className="text-[11px] text-gray-500 font-mono">{TELEMETRY_METRICS.llmCallsCount} LLM Calls (Compact)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400">Cost / Insight</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 font-mono">
            ${TELEMETRY_METRICS.estimatedCostUsd}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium">95.7% Savings vs Naive</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400">Insights Generated</span>
            <Server className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 font-mono">
            {TELEMETRY_METRICS.insightsStats.generated.toLocaleString()}
          </p>
          <span className="text-[11px] text-gray-500 font-mono">3 Failed | 94 Abstained</span>
        </div>
      </div>

      {/* Latency Breakdown Bar & Cost Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Runtime Latency Breakdown (2.8s Total)"
          subtitle="Time spent across SQL execution, vector retrieval, and LLM synthesis"
        >
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-blue-600" />
                  Deterministic SQL Aggregation:
                </span>
                <span className="font-mono font-bold text-gray-900">{TELEMETRY_METRICS.latencyBreakdown.sqlMs} ms (15.0%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  Evidence Triangulation & Retrieval:
                </span>
                <span className="font-mono font-bold text-gray-900">{TELEMETRY_METRICS.latencyBreakdown.retrievalMs} ms (11.0%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '11%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                  LLM Persona Synthesis:
                </span>
                <span className="font-mono font-bold text-gray-900">{TELEMETRY_METRICS.latencyBreakdown.llmMs} ms (42.8%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '43%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-slate-600" />
                  Client DOM & Recharts Render:
                </span>
                <span className="font-mono font-bold text-gray-900">{TELEMETRY_METRICS.latencyBreakdown.renderMs} ms (31.2%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-slate-600 h-full rounded-full" style={{ width: '31%' }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Cost Optimization Principle */}
        <Card
          title="Cost & Context Optimization"
          subtitle="Analytical pre-filtering reduces LLM token costs by 95.7%"
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-gray-400">
                <span>APPROACH</span>
                <span>COST / INSIGHT</span>
              </div>
              <div className="flex items-center justify-between text-rose-400">
                <span>Naive: Dump raw 50MB logs to LLM</span>
                <span>$0.42 / call</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>MarketTrace: Pre-aggregated Context (3.4k tok)</span>
                <span>$0.018 / call</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-xs">
              <strong>Core Architecture Principle:</strong> Never feed raw enterprise databases directly to generative models. Deterministic SQL aggregations extract compact mathematical evidence before passing to the LLM.
            </p>
          </div>
        </Card>
      </div>

      {/* Visual System Architecture Pipeline Flowchart (Objective 36) */}
      <Card
        title="MarketTrace AI End-to-End System Architecture"
        subtitle="Objective 36: Full 8-stage data flow from raw enterprise sources to governed actions and human feedback"
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {ARCHITECTURE_PIPELINE_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="p-3.5 bg-slate-50 border border-gray-200 rounded-xl space-y-2 text-xs flex flex-col justify-between hover:border-indigo-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-200/80 pb-1.5">
                    <span className="font-bold text-gray-900 tracking-tight">{stage.name}</span>
                    <span className="text-[9px] font-mono font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded border border-indigo-200">
                      {stage.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">{stage.subtext}</p>
                </div>

                <ul className="space-y-1 text-[11px] text-gray-700 pt-2 border-t border-gray-200/60 font-mono">
                  {stage.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* LLM vs Non-LLM Separation Matrix (Objective 37) */}
      <Card
        title="LLM vs. Non-LLM Separation Matrix"
        subtitle="Objective 37: Clear division between deterministic mathematical truth and generative synthesis"
        badge={
          <span className="px-2 py-0.5 text-xs bg-indigo-50 text-indigo-800 rounded font-bold border border-indigo-200">
            The LLM Does Not Calculate Business Metrics
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/70 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5">System Capability</th>
                <th className="px-4 py-2.5">Deterministic Non-LLM Engine</th>
                <th className="px-4 py-2.5">Generative LLM Layer</th>
                <th className="px-4 py-2.5">Ownership Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {LLM_VS_NON_LLM_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-900">{row.capability}</td>
                  <td className="px-4 py-3 text-gray-700">{row.nonLlmLayer}</td>
                  <td className="px-4 py-3 text-gray-600">{row.llmLayer}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        row.status === 'Non-LLM Owned'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Data Drift & Model Drift Status (Objective 40) */}
      <Card
        title="Data Drift & Model Stability Monitors"
        subtitle="Objective 40: Automated monitoring for schema changes, statistical distribution drift, and feedback trends"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Data Distribution Drift</span>
            <p className="text-sm font-bold text-emerald-700 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Low (KS Test p = 0.42)
            </p>
            <span className="text-[10px] text-gray-500">Normal variance</span>
          </div>

          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Model Performance</span>
            <p className="text-sm font-bold text-emerald-700 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Stable (84% Agree)
            </p>
            <span className="text-[10px] text-gray-500">Heuristic weights verified</span>
          </div>

          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">KPI Contract Changes</span>
            <p className="text-sm font-bold text-indigo-900 mt-1 font-mono">2 Governed Updates</p>
            <span className="text-[10px] text-gray-500">Approved by Marcus Vance</span>
          </div>

          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Data Quality Alerts</span>
            <p className="text-sm font-bold text-amber-700 flex items-center gap-1 mt-1">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> 4 Monitored
            </p>
            <span className="text-[10px] text-gray-500">Non-blocking schema warnings</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
