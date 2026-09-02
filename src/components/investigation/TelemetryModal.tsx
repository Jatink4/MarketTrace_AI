import React from 'react';
import { Activity, Clock, Cpu, Database, DollarSign, Zap, CheckCircle2, X } from 'lucide-react';

interface TelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: any;
}

export const TelemetryModal: React.FC<TelemetryModalProps> = ({ isOpen, onClose, telemetry }) => {
  if (!isOpen) return null;

  const data = telemetry || {
    analysisId: 'INV-1042',
    totalLatencySec: 4.8,
    rowsProcessed: 84392,
    sourcesUsed: 5,
    llmCalls: 1,
    llmModel: 'gemini-2.0-flash / grounded-synthesis',
    inputTokens: 2840,
    outputTokens: 612,
    estimatedCost: '$0.018',
    cacheHit: true
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-500/30 border border-indigo-400/40 rounded-lg text-indigo-400">
              <Activity size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Runtime Telemetry & Observability</h2>
              <p className="text-xs text-slate-400 font-mono">Analysis Run #{data.analysisId || 'INV-1042'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>

        {/* Telemetry Metrics */}
        <div className="p-6 space-y-6">
          {/* Top 3 Stat Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Latency</span>
              <p className="text-xl font-black text-slate-900 font-mono">{data.totalLatencySec || 4.8}s</p>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 size={11} /> 17 Stages Executed
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Rows Processed</span>
              <p className="text-xl font-black text-slate-900 font-mono">{(data.rowsProcessed || 84392).toLocaleString()}</p>
              <span className="text-[10px] text-indigo-600 font-semibold">{data.sourcesUsed || 5} Enterprise Sources</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Cost</span>
              <p className="text-xl font-black text-emerald-600 font-mono">{data.estimatedCost || '$0.018'}</p>
              <span className="text-[10px] text-slate-500">1 Grounded LLM Call</span>
            </div>
          </div>

          {/* Token & LLM Optimization Callout */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-indigo-900">
              <div className="flex items-center gap-1.5">
                <Cpu size={16} className="text-indigo-600" />
                <span>Context Compression & Cost Control</span>
              </div>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-300 text-indigo-700">
                Cache Hit: YES
              </span>
            </div>
            <p className="text-indigo-800 leading-relaxed text-[11px]">
              Raw transactions (84,392 rows) are pre-aggregated through deterministic statistical services. Only compressed analytical findings (2,840 input tokens) are sent to the LLM narrative synthesizer.
            </p>
            <div className="flex items-center justify-between pt-1 font-mono text-[11px] text-slate-600 border-t border-indigo-200/60">
              <span>Input Tokens: <strong>{data.inputTokens || 2840}</strong></span>
              <span>Output Tokens: <strong>{data.outputTokens || 612}</strong></span>
              <span>Model: <strong>{data.llmModel || 'gemini-2.0-flash'}</strong></span>
            </div>
          </div>

          {/* Latency Breakdown Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Latency Distribution by Component</span>
              <span className="font-mono text-indigo-600">{data.totalLatencySec || 4.8}s Total</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
              <div className="bg-indigo-600 h-full" style={{ width: '15%' }} title="SQL & Data Ingestion (15%)" />
              <div className="bg-purple-600 h-full" style={{ width: '25%' }} title="Decomposition & Statistics (25%)" />
              <div className="bg-cyan-500 h-full" style={{ width: '20%' }} title="Unstructured RAG (20%)" />
              <div className="bg-amber-500 h-full" style={{ width: '15%' }} title="Causal & Scoring (15%)" />
              <div className="bg-emerald-500 h-full" style={{ width: '25%' }} title="LLM Synthesis (25%)" />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 pt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-600" /> Ingestion (15%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-600" /> Math & Decomp (25%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500" /> RAG (20%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Scoring (15%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> LLM (25%)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
