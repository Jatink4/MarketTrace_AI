import React, { useState } from 'react';
import { RootCauseHypothesis, EvidenceItem } from '../../types';
import { EvidenceStrengthScore } from '../common/Badge';
import { Modal } from '../common/Modal';
import {
  HelpCircle,
  AlertTriangle,
  FileQuestion,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface HypothesesSectionProps {
  hypotheses: RootCauseHypothesis[];
}

export const HypothesesSection: React.FC<HypothesesSectionProps> = ({ hypotheses }) => {
  const [selectedHypothesis, setSelectedHypothesis] = useState<RootCauseHypothesis | null>(
    hypotheses[0] || null
  );
  const [inspectingEvidence, setInspectingEvidence] = useState<EvidenceItem | null>(null);

  return (
    <div className="space-y-4">
      {/* Overview Ranking List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {hypotheses.map((hyp) => {
          const isSelected = selectedHypothesis?.id === hyp.id;
          const isStrongest = hyp.strengthScore >= 80;

          return (
            <div
              key={hyp.id}
              onClick={() => setSelectedHypothesis(hyp)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-indigo-50/70 border-indigo-600 shadow-md'
                  : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-subtle'
              }`}
            >
              {isStrongest && (
                <div className="absolute -top-2.5 right-4 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>STRONGEST CURRENT EXPLANATION</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                    {hyp.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{hyp.summary}</p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${
                    isSelected ? 'text-indigo-600 rotate-90' : 'text-gray-400'
                  }`}
                />
              </div>

              {/* Evidence Strength Bar */}
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-gray-500">Evidence Strength:</span>
                <EvidenceStrengthScore score={hyp.strengthScore} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Competing Hypotheses Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Competing Hypotheses Comparison Matrix
          </h4>
          <span className="text-[11px] text-gray-500">Click any row to inspect deep-dive evidence</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/60 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5">Hypothesis</th>
                <th className="px-4 py-2.5">Evidence Level</th>
                <th className="px-4 py-2.5">Contradictory Signals</th>
                <th className="px-4 py-2.5">Missing Data</th>
                <th className="px-4 py-2.5">Evidence Score</th>
                <th className="px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hypotheses.map((h) => {
                const isSelected = selectedHypothesis?.id === h.id;
                return (
                  <tr
                    key={h.id}
                    onClick={() => setSelectedHypothesis(h)}
                    className={`hover:bg-indigo-50/50 cursor-pointer transition-colors ${
                      isSelected ? 'bg-indigo-50/80 font-medium' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-gray-900 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${h.strengthScore >= 80 ? 'bg-indigo-600' : h.strengthScore >= 50 ? 'bg-blue-500' : 'bg-slate-300'}`} />
                      {h.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {h.supportingEvidence.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {h.supportingEvidence.length} Confirmed Sources
                        </span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {h.contradictingEvidence.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3" />
                          {h.contradictingEvidence.length} Contradictions
                        </span>
                      ) : (
                        <span className="text-gray-400">Low</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono">
                      {h.missingEvidence.length} items
                    </td>
                    <td className="px-4 py-3">
                      <EvidenceStrengthScore score={h.strengthScore} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHypothesis(h);
                        }}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline"
                      >
                        Inspect Deep Dive
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Detail View for Selected Hypothesis */}
      {selectedHypothesis && (
        <div className="bg-white rounded-xl border-2 border-indigo-200 p-5 shadow-card space-y-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 tracking-tight">
                  Root Cause Detail: {selectedHypothesis.name}
                </h3>
                <span className="px-2 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-800 rounded">
                  {selectedHypothesis.statusBadge}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Assessment: <strong className="text-gray-900">{selectedHypothesis.assessment}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Evidence Strength:</span>
              <EvidenceStrengthScore score={selectedHypothesis.strengthScore} />
            </div>
          </div>

          {/* Section 1: SUPPORTING EVIDENCE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Supporting Empirical Evidence ({selectedHypothesis.supportingEvidence.length})
              </h4>
              <span className="text-[10px] text-gray-500">Click card to view raw enterprise record</span>
            </div>

            {selectedHypothesis.supportingEvidence.length === 0 ? (
              <p className="text-xs text-gray-400 italic p-3 bg-gray-50 rounded-lg">
                No supporting empirical evidence logged for this hypothesis.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedHypothesis.supportingEvidence.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setInspectingEvidence(ev)}
                    className="p-3 bg-emerald-50/40 border border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900 group-hover:text-emerald-950">
                        {ev.source}
                      </span>
                      {ev.metricChange && (
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded text-[11px]">
                          {ev.metricChange}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-gray-900">{ev.title}</p>
                    <p className="text-[11px] text-gray-600 line-clamp-2">{ev.excerpt}</p>
                    <div className="pt-1 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                      <span>ID: {ev.rawRecordId}</span>
                      <span className="text-emerald-700 font-medium group-hover:underline flex items-center gap-0.5">
                        View Trace <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: CONTRADICTING EVIDENCE */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Contradicting Evidence & Limitations ({selectedHypothesis.contradictingEvidence.length})
            </h4>

            {selectedHypothesis.contradictingEvidence.length === 0 ? (
              <p className="text-xs text-gray-500 italic p-2.5 bg-gray-50 rounded-lg">
                No significant contradicting evidence recorded.
              </p>
            ) : (
              <div className="space-y-2">
                {selectedHypothesis.contradictingEvidence.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setInspectingEvidence(ev)}
                    className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl hover:bg-amber-100/60 transition-all cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-900">{ev.title}</span>
                      <span className="text-[10px] font-mono bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-semibold">
                        Source: {ev.source}
                      </span>
                    </div>
                    <p className="text-xs text-amber-950/80">{ev.rawDetail}</p>
                    <div className="text-[10px] text-amber-700 font-mono mt-1">
                      Analytical Note: Never hide contradictory evidence from decision-makers.
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: MISSING EVIDENCE */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileQuestion className="w-4 h-4 text-slate-500" />
              Missing Evidence & Information Gaps ({selectedHypothesis.missingEvidence.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {selectedHypothesis.missingEvidence.map((miss) => (
                <div key={miss.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{miss.name}</span>
                    <span className="text-[9px] font-mono bg-slate-200 text-slate-700 px-1 rounded">
                      {miss.importance} Priority
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{miss.description}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 italic">
              * Note: These missing telemetry sources could further strengthen or weaken this hypothesis once ingested.
            </p>
          </div>
        </div>
      )}

      {/* Raw Evidence Traceability Inspection Modal */}
      <Modal
        isOpen={!!inspectingEvidence}
        onClose={() => setInspectingEvidence(null)}
        title={inspectingEvidence ? `Source Traceability: ${inspectingEvidence.rawRecordId}` : 'Evidence Details'}
        subtitle={`System of Record: ${inspectingEvidence?.source}`}
      >
        {inspectingEvidence && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] space-y-1">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
                <span>RECORD_ID: {inspectingEvidence.rawRecordId}</span>
                <span>EVENT_TIMESTAMP: {inspectingEvidence.date}</span>
              </div>
              <p className="pt-1 text-emerald-400 font-semibold">{inspectingEvidence.title}</p>
              <p className="text-slate-300">{inspectingEvidence.entity}</p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-gray-900 uppercase text-[11px]">Original Enterprise Payload / Excerpt</h5>
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 italic leading-relaxed">
                "{inspectingEvidence.rawDetail}"
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200 text-gray-600">
              <div>
                <span className="text-gray-400 block text-[10px]">EVIDENCE STRENGTH WEIGHT</span>
                <span className="font-bold text-gray-900">{inspectingEvidence.strengthImpact} IMPACT</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">HYPOTHESIS MAPPING</span>
                <span className="font-bold text-indigo-700">{inspectingEvidence.hypothesisId}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
