import React from 'react';
import { TemporalCheckItem } from '../../types';
import { CheckCircle2, ShieldAlert, ArrowDown, Sparkles } from 'lucide-react';

interface CorrelationCausationCardProps {
  timeline: TemporalCheckItem[];
  causalityAssessment: {
    temporalConsistency: boolean;
    crossSourceConfirmation: boolean;
    alternativeExplanationCheck: boolean;
    causalEvidenceLevel: 'LIMITED' | 'MODERATE' | 'STRONG';
    finalVerdict: string;
  };
}

export const CorrelationCausationCard: React.FC<CorrelationCausationCardProps> = ({
  timeline,
  causalityAssessment
}) => {
  return (
    <div className="space-y-4">
      {/* Visual Header Verdict */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-xl text-white border border-slate-800 shadow-md">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Methodological Rigor: Correlation vs. Causation Guardrail
            </span>
          </div>
          <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-bold">
            CAUSAL EVIDENCE: {causalityAssessment.causalEvidenceLevel}
          </span>
        </div>

        <p className="text-sm font-bold text-white">
          "{causalityAssessment.finalVerdict}"
        </p>
        <p className="text-xs text-gray-300 mt-1">
          MarketTrace AI strictly distinguishes statistical correlation and temporal precedence from absolute causal proof. We never claim "Integration caused the drop" without randomized A/B control tests.
        </p>
      </div>

      {/* 4 Checkpoint Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-700">Temporal Consistency</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[10px] text-gray-500 leading-tight">
            Complaints & API drops preceded deal losses chronologically.
          </p>
        </div>

        <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-700">Cross-Source Confirmation</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[10px] text-gray-500 leading-tight">
            5 distinct systems (Support, CRM, Telemetry, Feedback, Billing) corroborate.
          </p>
        </div>

        <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-700">Alternative Hypothesis Check</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[10px] text-gray-500 leading-tight">
            Evaluated & deprioritized Pricing and Macro Demand alternatives.
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-900">Deterministic Causality</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-[10px] text-amber-800 leading-tight font-medium">
            LIMITED (Observational data cannot mathematically prove 100% causality).
          </p>
        </div>
      </div>

      {/* Chronological Event Precedence Flow */}
      {timeline.length > 0 && (
        <div className="bg-slate-50 rounded-xl border border-gray-200 p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Chronological Temporal Precedence Chain (August 2026)
          </h4>

          <div className="space-y-2">
            {timeline.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-start gap-3 p-2.5 bg-white rounded-lg border border-gray-200 shadow-2xs text-xs">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-900 font-mono font-bold rounded text-[11px] flex-shrink-0">
                    {step.date}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{step.event}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{step.note}</p>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200 flex-shrink-0">
                    {step.source}
                  </span>
                </div>
                {idx < timeline.length - 1 && (
                  <div className="flex justify-center -my-1 text-gray-300">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
