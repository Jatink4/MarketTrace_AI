import React, { useState } from 'react';
import { RecommendedAction, Persona } from '../../types';
import {
  ListTodo,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Sliders,
  UserCheck
} from 'lucide-react';

interface ActionEngineCardProps {
  actions: RecommendedAction[];
  currentPersona: Persona;
}

export const ActionEngineCard: React.FC<ActionEngineCardProps> = ({
  actions,
  currentPersona
}) => {
  const [filterRole, setFilterRole] = useState<boolean>(true);
  const [actionStatuses, setActionStatuses] = useState<Record<string, string>>({});

  const filteredActions = filterRole
    ? actions.filter(a => a.allowedRoles.includes(currentPersona))
    : actions;

  const handleTriggerAction = (id: string) => {
    setActionStatuses(prev => ({
      ...prev,
      [id]: prev[id] === 'Approved' ? 'Triggered' : 'Approved'
    }));
  };

  return (
    <div className="space-y-4">
      {/* Header with Decision Rights filter toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 border border-gray-200 rounded-xl">
        <div>
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-indigo-600" />
            Governed Action Recommendation Pipeline
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Every action follows: <strong className="text-gray-700">Driver → Controllable Lever → Action → Expected Impact → Owner → Confidence → Monitoring</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filterRole}
              onChange={(e) => setFilterRole(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              Filter by {currentPersona} Decision Rights
            </span>
          </label>
        </div>
      </div>

      {/* Action Cards Grid */}
      {filteredActions.length === 0 ? (
        <div className="p-6 bg-white rounded-xl border border-gray-200 text-center space-y-2">
          <p className="text-sm font-bold text-gray-700">No actions assigned directly to {currentPersona}</p>
          <p className="text-xs text-gray-500">
            Uncheck the role filter to view cross-functional actions owned by other departments.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredActions.map((act) => {
            const currentStatus = actionStatuses[act.id] || act.status;
            const isApproved = currentStatus === 'Approved' || currentStatus === 'Triggered';

            return (
              <div
                key={act.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs hover:shadow-card transition-all space-y-3"
              >
                {/* Top Row: Driver & Lever Mapping */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded font-bold font-mono">
                      Driver: {act.driver}
                    </span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded font-semibold flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-indigo-600" />
                      Lever: {act.controllableLever}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 font-mono">
                      Confidence: <strong className="text-indigo-700">{act.confidence}</strong>
                    </span>
                    <span className="text-[11px] text-gray-500 font-mono">
                      Controllability: <strong className="text-emerald-700">{act.controllability}</strong>
                    </span>
                  </div>
                </div>

                {/* Main Action Content */}
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-gray-900 tracking-tight">{act.title}</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">{act.description}</p>
                </div>

                {/* Expected Impact & Owner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-2.5 bg-slate-50 rounded-lg text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                      Expected Business Impact
                    </span>
                    <p className="font-semibold text-gray-900 flex items-center gap-1.5 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      {act.expectedImpact}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                      Accountable Owner
                    </span>
                    <p className="font-semibold text-indigo-950 mt-0.5">{act.owner}</p>
                  </div>
                </div>

                {/* Bottom Monitoring Tracker & Execution Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <span className="font-bold text-[11px]">Monitoring Telemetry:</span>
                    <div className="flex flex-wrap gap-1">
                      {act.monitoringMetrics.map((m, idx) => (
                        <span key={idx} className="font-mono text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded border border-gray-200">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTriggerAction(act.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isApproved
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                      }`}
                    >
                      {isApproved ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Action Triggered & Monitored</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5" />
                          <span>Approve Governed Action</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-indigo-700 flex-shrink-0" />
        <span>
          <strong>Action Confidence Principle:</strong> Derived deterministically from empirical evidence strength (89/100), operational controllability, and expected business impact.
        </span>
      </div>
    </div>
  );
};
