import React from 'react';
import { ArrowRight, Scale, CheckCircle2, XCircle, Clock, AlertOctagon, HelpCircle, ShieldCheck } from 'lucide-react';

export default function ValidateView({ investigation, onNext }: { investigation: any, onNext: () => void }) {
  const hypotheses = investigation.hypotheses || [];
  const uncertainty = investigation.uncertainty || {};
  const isAbstain = investigation.status === 'ABSTAIN' || uncertainty.decision === 'ABSTAIN';
  const isSparse = investigation.status === 'LOW_CONFIDENCE';

  return (
    <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
      {/* Left/Center - Visualization */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="text-indigo-600" /> 
              Competing Hypotheses & Evidence Scoring
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluating candidate explanations across multi-source evidence, temporal precedence, and contradiction checks.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
            Method: 7-Factor Weighted Evidence Formula
          </span>
        </div>

        {/* Special Scenario B: ABSTAIN Banner */}
        {isAbstain && (
          <div className="p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0">
                <AlertOctagon size={22} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-black bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                    ENGINE DECISION: ABSTAIN
                  </span>
                  <h3 className="text-base font-extrabold text-amber-950">
                    NO SINGLE DEFINITIVE ROOT CAUSE ESTABLISHED
                  </h3>
                </div>
                <p className="text-xs font-semibold text-amber-900 mt-1 leading-relaxed">
                  "Available evidence supports multiple competing explanations with similar statistical weight. MarketTrace AI abstains from forcing a speculative conclusion."
                </p>
                <p className="text-[11px] text-amber-800 mt-1">
                  <strong>Recommended Next Step:</strong> {uncertainty.recommendedNextStep || 'Provide customer-level pricing concession data and marketing conversion telemetry.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Special Scenario C: Sparse History Banner */}
        {isSparse && (
          <div className="p-5 bg-blue-50 border-2 border-blue-300 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-xl shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <span className="text-xs font-mono font-black bg-blue-200 text-blue-900 px-2 py-0.5 rounded">
                  LOW CONFIDENCE GUARDRAIL
                </span>
                <h3 className="text-base font-extrabold text-blue-950 mt-1">
                  INSUFFICIENT HISTORICAL DATA (18 Days vs 180 Days Baseline)
                </h3>
                <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                  Substituted synthetic comparative curve from Product Y Launch Cohort. Inferences are marked as contextual benchmarks with lower confidence.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hypotheses List */}
        <div className="space-y-4">
          {hypotheses.map((hyp: any, index: number) => {
            const isTop = index === 0 && !isAbstain;
            return (
              <div 
                key={hyp.id} 
                className={`bg-white p-6 rounded-2xl border shadow-xs transition-all ${
                  isTop ? 'border-2 border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {hyp.id}
                      </span>
                      {isTop && (
                        <span className="text-[10px] font-mono font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase">
                          ✓ Primary Ranked Root Cause
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{hyp.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{hyp.summary || hyp.whyRanked?.[0]}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900 font-mono">{hyp.confidence || hyp.strengthScore}%</span>
                    <span className={`text-[10px] font-bold uppercase block ${
                      (hyp.confidence || hyp.strengthScore) >= 80 ? 'text-emerald-600' : 'text-slate-500'
                    }`}>
                      {hyp.confidenceRating || 'Confidence'}
                    </span>
                  </div>
                </div>

                {/* Temporal Alignment & Evidence Lists */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Clock size={13} className="text-indigo-600" /> Chronological Precedence:
                    </span>
                    <span className="font-mono text-slate-900 font-semibold">{hyp.temporalAlignment}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Supporting */}
                    <div>
                      <div className="font-bold text-emerald-700 flex items-center gap-1 mb-1.5">
                        <CheckCircle2 size={13} /> Supporting Data Points ({hyp.supportingSignals?.length || 0})
                      </div>
                      <ul className="list-disc pl-4 text-slate-600 space-y-1 text-[11px]">
                        {hyp.supportingSignals?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>

                    {/* Contradictory */}
                    <div>
                      <div className="font-bold text-rose-700 flex items-center gap-1 mb-1.5">
                        <XCircle size={13} /> Contradictory Data Points ({hyp.contradictorySignals?.length || 0})
                      </div>
                      {hyp.contradictorySignals?.length > 0 ? (
                        <ul className="list-disc pl-4 text-slate-600 space-y-1 text-[11px]">
                          {hyp.contradictorySignals.map((s: string, i: number) => <li key={i}>{s}</li>)}
                        </ul>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">No refuting signals detected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right - AI Insight Panel */}
      <div className="w-full lg:w-96 bg-slate-50/70 p-6 flex flex-col justify-between space-y-6 shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Scale className="text-indigo-600" size={22} />
            <h2 className="text-lg font-bold text-slate-900">Validation Summary</h2>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-1">STRONGEST EXPLANATION</div>
            <div className="text-base font-bold text-emerald-950">{hypotheses[0]?.name}</div>
            <p className="text-xs text-emerald-800 mt-2 leading-relaxed">
              Pipeline drop on July 15 preceded August 1 revenue drop by 15 days, confirming strict chronological precedence.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Refuted Explanations</h3>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs space-y-1">
              <span className="font-bold text-slate-800">H2: Competitor Pricing Pressure (63%)</span>
              <p className="text-slate-500 text-[11px]">
                CloudApex discount was announced 11 days <strong>after</strong> revenue began dropping. Cannot be the root cause.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs space-y-1 mt-2">
              <span className="font-bold text-slate-800">H4: August Seasonality (28%)</span>
              <p className="text-slate-500 text-[11px]">
                Control regions (NA & EU) performed above seasonal norm. Contradicted by data.
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Generate Persona Stories</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
