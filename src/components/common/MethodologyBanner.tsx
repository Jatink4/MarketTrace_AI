import React, { useState } from 'react';
import { BrainCircuit, Database, Cpu, ChevronDown, ChevronUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const MethodologyBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-xl shadow-md overflow-hidden">
      <div 
        className="px-6 py-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-indigo-600/30 border border-indigo-500/40 rounded-lg text-indigo-400">
            <BrainCircuit size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Architectural Principle</span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
                100% Deterministic Quantitative Truth
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">
              How MarketTrace AI Thinks: Strict Separation between Analytical Math & LLM Synthesis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="hidden sm:inline">Click to {isExpanded ? 'collapse' : 'view engine separation'}</span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 py-5 bg-slate-950 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs animate-in slide-in-from-top-2">
          {/* Non-LLM Core */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Database size={16} />
              <span>NON-LLM (Deterministic Analytics Engine)</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              All quantitative metrics, anomaly detections, contributions, correlations, and rankings are calculated deterministically via statistical algorithms and business rules.
            </p>
            <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-400" /> KPI Aggregation & Time-series Baselines</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-400" /> Z-Score Anomaly Detection (95% CI)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-400" /> Multi-Dimensional Additive Decomposition</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-400" /> Pearson Correlation & Lag Precedence</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-400" /> Difference-in-Differences Causal Validation</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-400" /> Transparent 7-Factor Evidence Scoring</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-400" /> Uncertainty & Abstention Guardrails</li>
            </ul>
          </div>

          {/* LLM Synthesis */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Cpu size={16} />
              <span>AI / LLM SYNTHESIS (Grounded Explanation)</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The LLM receives only a compressed summary of verified quantitative findings (never raw unrestricted datasets) to synthesize persona-tailored stories without hallucination risk.
            </p>
            <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-indigo-400" /> Unstructured Text Topic & Sentiment Extraction</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-indigo-400" /> Named Entity Recognition (Accounts & Systems)</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-indigo-400" /> Executive & Analyst Persona Story Adaptation</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-indigo-400" /> Traceable Entity Lineage Highlighting</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-indigo-400" /> Action Recommendation Framing by Role</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-indigo-400" /> Minimal Latency & Token Footprint (~$0.018/run)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
