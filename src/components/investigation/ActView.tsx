import React, { useState } from 'react';
import { CheckSquare, Settings2, Download, Check, ShieldCheck, UserCheck, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActView({ investigation, onNext }: { investigation: any, onNext: () => void }) {
  const navigate = useNavigate();
  const [assignedActions, setAssignedActions] = useState<Record<string, boolean>>({});

  const recommendations = investigation.recommendations || [];

  const handleAssign = (id: string) => {
    setAssignedActions(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
      {/* Left/Center - Action Hub */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="text-indigo-600" /> 
              Governed Action Recommendation Engine
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted business levers mapped to drivers, expected impact, owners, decision rights, and monitoring plans.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
            Method: Governed Business Levers Mapping
          </span>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec: any) => {
            const isAssigned = assignedActions[rec.id];
            return (
              <div key={rec.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden space-y-4">
                {rec.priority === 'HIGH' && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
                )}
                
                {/* Top Bar: Driver & Priority */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">DRIVER:</span>
                    <span className="font-bold text-indigo-900 font-mono">{rec.driver}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded font-mono ${
                      rec.priority === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {rec.priority || 'HIGH'} PRIORITY
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{rec.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rec.description}</p>
                </div>
                
                {/* Action Attributes Grid (Driver -> Lever -> Action -> Impact -> Owner -> Confidence -> Monitoring) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Controllable Lever</span>
                    <span className="font-semibold text-slate-800 text-[11px] block">{rec.controllableLever}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Expected Impact</span>
                    <span className="font-bold text-emerald-600 text-[11px] block">{rec.expectedImpact}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Assigned Owner</span>
                    <span className="font-semibold text-slate-900 text-[11px] block">{rec.owner}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Decision Rights</span>
                    <span className="font-semibold text-indigo-700 text-[11px] block">{rec.allowedRoles?.join(', ') || 'Executive, Sales'}</span>
                  </div>
                </div>

                {/* Monitoring Plan */}
                {rec.monitoringPlan?.length > 0 && (
                  <div className="text-[11px] text-slate-600 bg-indigo-50/40 p-2.5 rounded-lg border border-indigo-100 flex items-center justify-between">
                    <div>
                      <strong className="text-indigo-950 font-bold">Telemetry Monitoring Plan: </strong>
                      <span>{rec.monitoringPlan.join(' • ')}</span>
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400 italic">
                    {rec.decisionRightsNote || 'Requires appropriate decision entitlement to execute.'}
                  </span>
                  <button 
                    onClick={() => handleAssign(rec.id)}
                    disabled={isAssigned}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                      isAssigned 
                        ? 'bg-emerald-100 text-emerald-800 cursor-default' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    <Check size={14} /> {isAssigned ? 'Action Routed to Jira' : 'Approve & Route to Jira'}
                  </button>
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
            <Settings2 className="text-indigo-600" size={22} />
            <h2 className="text-lg font-bold text-slate-900">Governance & Export</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-3">
            <h3 className="font-bold text-slate-900">Telemetry Monitoring</h3>
            <p className="text-slate-600 leading-relaxed">MarketTrace AI is monitoring the following recovery KPIs:</p>
            <ul className="space-y-2 font-mono">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-slate-800">APAC OAuth Handshake Error Rate</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-slate-800">Weekly APAC Enterprise Closed ARR</span>
              </li>
            </ul>
          </div>
          
          <button 
            onClick={() => alert(`MarketTrace Diagnostic Summary exported for ${investigation.title}`)}
            className="w-full py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download size={16} /> Export Diagnostic Package
          </button>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors mt-auto"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
