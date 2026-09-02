import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

interface Stage {
  name: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  timestamp: string;
  detail: string;
}

interface InvestigationTimelineProps {
  stages: Stage[];
}

export const InvestigationTimeline: React.FC<InvestigationTimelineProps> = ({ stages }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-subtle">
      <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Automated Investigation Lifecycle
          </h4>
        </div>
        <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
          All 8 Stages Reconciled & Grounded
        </span>
      </div>

      {/* Responsive Horizontal Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {stages.map((stage, idx) => {
          return (
            <div
              key={idx}
              className="relative p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between group hover:border-indigo-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold font-mono text-gray-400">0{idx + 1}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                  {stage.name}
                </p>
              </div>

              <div className="mt-2 pt-1 border-t border-gray-200/60">
                <p className="text-[9px] text-gray-500 font-mono">{stage.timestamp}</p>
                <p className="text-[10px] text-gray-600 line-clamp-2 mt-0.5 leading-snug" title={stage.detail}>
                  {stage.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
