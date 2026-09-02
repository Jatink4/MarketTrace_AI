import React, { useState } from 'react';
import { MASTER_ACTIONS_CATALOG, PERSONA_DECISION_RIGHTS } from '../data/actionsData';
import { Persona } from '../types';
import { Card } from '../components/common/Card';
import {
  ListTodo,
  CheckCircle,
  Clock,
  UserCheck,
  ShieldCheck,
  TrendingUp,
  Sliders,
  AlertCircle
} from 'lucide-react';

interface ActionsPageProps {
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export const ActionsPage: React.FC<ActionsPageProps> = ({
  currentPersona,
  onPersonaChange
}) => {
  const [filterRole, setFilterRole] = useState<boolean>(true);
  const [actionStatuses, setActionStatuses] = useState<Record<string, string>>({});

  const personas: Persona[] = ['CEO', 'Regional Manager', 'Product Manager', 'Data Analyst'];
  const rightsInfo = PERSONA_DECISION_RIGHTS[currentPersona];

  const displayedActions = filterRole
    ? MASTER_ACTIONS_CATALOG.filter((a) => a.allowedRoles.includes(currentPersona))
    : MASTER_ACTIONS_CATALOG;

  const handleToggleStatus = (id: string) => {
    setActionStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === 'Approved' ? 'Triggered' : 'Approved'
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Governed Action Recommendation Hub
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Grounded operational interventions strictly aligned with organizational decision rights.
          </p>
        </div>

        {/* Persona Switcher */}
        <div className="flex items-center gap-1.5 bg-indigo-50 p-1.5 rounded-xl border border-indigo-200">
          <span className="text-[11px] font-bold text-indigo-900 px-2 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-indigo-600" /> Active Role:
          </span>
          {personas.map((p) => (
            <button
              key={p}
              onClick={() => onPersonaChange(p)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currentPersona === p
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Decision Rights Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-md space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Decision Rights: {rightsInfo.title}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">Policy: RBAC Governed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
              AUTHORIZED DECISION POWERS
            </span>
            <ul className="space-y-1 text-gray-300">
              {rightsInfo.rights.map((r, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
              ROLE BOUNDARIES & RESTRICTIONS
            </span>
            <ul className="space-y-1 text-gray-400">
              {rightsInfo.forbiddenRights.map((f, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Catalog */}
      <Card
        title={`Recommended Actions (${displayedActions.length})`}
        subtitle="Every action is mapped directly to an identified analytical driver and monitored continuously"
        action={
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filterRole}
              onChange={(e) => setFilterRole(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span>Filter strictly by {currentPersona} permissions</span>
          </label>
        }
      >
        <div className="space-y-3.5">
          {displayedActions.map((act) => {
            const currentStatus = actionStatuses[act.id] || act.status;
            const isApproved = currentStatus === 'Approved' || currentStatus === 'Triggered';

            return (
              <div
                key={act.id}
                className="p-4 bg-slate-50/70 border border-gray-200 rounded-xl space-y-3 shadow-2xs hover:bg-white hover:shadow-card transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/80 pb-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-mono font-bold rounded">
                      Driver: {act.driver}
                    </span>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-medium rounded flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-indigo-600" />
                      Lever: {act.controllableLever}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="text-gray-500">
                      Confidence: <strong className="text-indigo-700">{act.confidence}</strong>
                    </span>
                    <span className="text-gray-500">
                      Owner: <strong className="text-gray-900">{act.owner}</strong>
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">{act.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{act.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2.5 bg-white border border-gray-200 rounded-lg text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Expected Business Impact
                    </span>
                    <p className="font-semibold text-gray-900 flex items-center gap-1.5 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      {act.expectedImpact}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Telemetry Monitoring
                    </span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {act.monitoringMetrics.map((m, idx) => (
                        <span key={idx} className="font-mono text-[10px] bg-gray-100 px-1.5 py-0.2 rounded text-gray-700">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <span>Authorized Roles:</span>
                    <span className="font-bold text-indigo-900">{act.allowedRoles.join(', ')}</span>
                  </div>

                  <button
                    onClick={() => handleToggleStatus(act.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isApproved
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    {isApproved ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Action Triggered</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Approve Action</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
