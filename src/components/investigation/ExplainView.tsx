import React, { useState } from 'react';
import { ArrowRight, BookOpen, Users, Link2, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ExplainView({ investigation, onNext }: { investigation: any, onNext: () => void }) {
  const [persona, setPersona] = useState('executive');
  const [activeEvidence, setActiveEvidence] = useState<any>(null);

  const personaNarratives = investigation.personaNarratives || {};
  const currentStory = personaNarratives[persona] || personaNarratives['executive'] || {
    persona: 'Executive',
    headline: `August Revenue contracted ${investigation.changePct}%, driven by APAC enterprise renewals.`,
    story: `Revenue declined ${investigation.changePct}% in August to ${investigation.currentValue} vs expected ${investigation.previousValue} baseline. The primary driver is a severe deterioration in APAC enterprise renewals (62.2% variance share). Multiple enterprise accounts stalled contract renewals due to local ERP connector timeouts following the v4.2 update. A competitor promotional campaign by CloudApex launched 11 days earlier than realized sales impact was refuted as the root cause due to lack of temporal precedence.`,
    keyImpact: '-$430,000 ARR Impact in APAC Enterprise',
    confidence: '87% (HIGH)',
    topAction: 'Deploy APAC Technical SWAT Team to Top 25 At-Risk Accounts',
    traceableEntities: []
  };

  const traceableEntities = currentStory.traceableEntities || [];

  return (
    <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
      {/* Left/Center - Story Narrative */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="text-indigo-600" /> 
              Grounded Persona-Tailored Story Synthesis
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Synthesized strictly from deterministic analytical outputs. Click any highlighted phrase to inspect source lineage.
            </p>
          </div>
          
          {/* Persona Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 rounded-xl border border-slate-200 p-1">
            <Users size={16} className="text-slate-400 ml-2 mr-1" />
            {[
              { id: 'executive', label: 'Executive' },
              { id: 'analyst', label: 'Data Analyst' },
              { id: 'sales', label: 'Sales Manager' },
              { id: 'product', label: 'Product Manager' }
            ].map(p => (
              <button 
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  persona === p.id ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Content Card */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              Tailored for: {currentStory.persona} Persona
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Confidence: {currentStory.confidence || '87% (HIGH)'}
            </span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
            {currentStory.headline}
          </h1>
          
          <div className="text-base text-slate-700 leading-relaxed font-serif space-y-4">
            {currentStory.story.split(/(APAC enterprise renewals|local ERP connector timeouts|CloudApex|August 1st|11 days earlier)/g).map((part: string, i: number) => {
              const match = traceableEntities.find((e: any) => e.phrase === part);
              if (match || part === 'August 1st' || part === '11 days earlier') {
                return (
                  <span 
                    key={i} 
                    className="inline-flex items-center cursor-pointer bg-indigo-50 text-indigo-700 font-sans font-semibold border-b-2 border-indigo-400 hover:bg-indigo-100 px-1.5 py-0.5 rounded transition-colors"
                    onClick={() => setActiveEvidence(match || { phrase: part, evidenceTitle: 'Observed Chronological Precedence', evidenceSource: 'Temporal Triangulation Engine' })}
                  >
                    {part}
                  </span>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </div>
        </div>
        
        {/* Active Clicked Lineage Popover */}
        {activeEvidence && (
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-slate-800 animate-in slide-in-from-bottom-2 flex items-start justify-between">
            <div className="space-y-1 text-xs">
              <div className="font-bold flex items-center gap-2 text-indigo-400">
                <Link2 size={16} /> Traceable Lineage Citation
              </div>
              <div className="text-slate-400">
                Source: <strong className="text-slate-200 font-mono">{activeEvidence.evidenceSource}</strong>
              </div>
              <div className="text-sm font-semibold text-slate-100">{activeEvidence.evidenceTitle}</div>
              {activeEvidence.evidenceMetric && (
                <div className="text-emerald-400 font-mono text-xs">{activeEvidence.evidenceMetric}</div>
              )}
            </div>
            <button onClick={() => setActiveEvidence(null)} className="text-slate-400 hover:text-white p-1">✕</button>
          </div>
        )}
      </div>

      {/* Right - AI Insight Panel */}
      <div className="w-full lg:w-96 bg-slate-50/70 p-6 flex flex-col justify-between space-y-6 shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-indigo-600" size={22} />
            <h2 className="text-lg font-bold text-slate-900">Uncertainty & Audit Panel</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-600">Evidence Triangulation Coverage</span>
                <span className="text-slate-900 font-mono">88%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-600">Data Completeness</span>
                <span className="text-slate-900 font-mono">94%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 text-xs text-slate-600">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider">Governed Verification</h3>
            <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
              <li>Hypothesis H1 corroborated across 3 independent systems.</li>
              <li>Precedence check verified: Pipeline dropped 15 days before KPI.</li>
              <li><strong>Model Verdict:</strong> Sufficient evidence to proceed to action without abstention.</li>
            </ul>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Review Governed Actions</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
