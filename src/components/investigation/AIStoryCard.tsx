import React from 'react';
import { Persona, PersonaNarrative } from '../../types';
import { Bot, Sparkles, UserCheck, ShieldCheck, FileText } from 'lucide-react';

interface AIStoryCardProps {
  personaNarratives: Record<Persona, PersonaNarrative>;
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export const AIStoryCard: React.FC<AIStoryCardProps> = ({
  personaNarratives,
  currentPersona,
  onPersonaChange
}) => {
  const personas: Persona[] = ['CEO', 'Regional Manager', 'Product Manager', 'Data Analyst'];
  const activeNarrative = personaNarratives[currentPersona] || personaNarratives['CEO'];

  return (
    <div className="bg-white rounded-xl border-2 border-indigo-200 shadow-card p-5 space-y-4">
      {/* Header with LLM role disclosure */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900 tracking-tight">AI Investigation Story</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-800 rounded uppercase">
                Grounded Narrative Synthesis
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Adapts executive storytelling to active decision rights while quantitative metrics remain strictly identical.
            </p>
          </div>
        </div>

        {/* Persona Tabs directly on story card */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
          {personas.map((p) => (
            <button
              key={p}
              onClick={() => onPersonaChange(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentPersona === p
                  ? 'bg-white text-indigo-700 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              <span>{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Headline & Focus Banner */}
      <div className="p-3.5 bg-gradient-to-r from-slate-50 to-indigo-50/50 rounded-xl border border-indigo-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-indigo-600">
            {activeNarrative.strategicFocus}
          </span>
          <h4 className="text-sm font-bold text-gray-900 mt-0.5 tracking-tight">
            {activeNarrative.headline}
          </h4>
        </div>
        <span className="text-xs font-mono font-bold text-indigo-900 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs">
          {activeNarrative.keyMetricHighlight}
        </span>
      </div>

      {/* Main Synthesized Text */}
      <div className="p-4 bg-white rounded-xl border border-gray-200 text-gray-800 text-xs sm:text-sm leading-relaxed space-y-3 shadow-2xs font-normal">
        <p>{activeNarrative.narrativeText}</p>

        {/* Action Callout within Narrative */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-start gap-2 bg-indigo-50/30 p-2.5 rounded-lg text-xs">
          <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-indigo-950 font-semibold">Recommended Persona Focus: </strong>
            <span className="text-indigo-900">{activeNarrative.recommendedFocus}</span>
          </div>
        </div>
      </div>

      {/* Bottom Grounding Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500 pt-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" /> Evidence Grounding: Verified
          </span>
          <span>Method: <strong>Contribution Analysis + Cross-Source Triangulation</strong></span>
        </div>
        <span className="font-mono text-gray-400">LLM Role: Persona-Tailored Synthesis</span>
      </div>
    </div>
  );
};
