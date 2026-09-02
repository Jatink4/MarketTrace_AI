import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDashboardSummary, fetchAnomalies } from '../api/client';
import { AlertCircle, ArrowUpRight, ArrowDownRight, Activity, Search, Filter, Database, Sparkles, Play, PlusCircle } from 'lucide-react';
import { MethodologyBanner } from '../components/common/MethodologyBanner';

export default function IntelligenceDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<any>(null);
  const [anomalies, setAnomalies] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardSummary().then(setSummary).catch(err => console.error(err));
    fetchAnomalies().then(setAnomalies).catch(err => console.error(err));
  }, []);

  if (!summary) return (
    <div className="h-screen bg-slate-50 flex items-center justify-center font-mono text-sm">
      <div className="flex items-center gap-2 text-indigo-600 font-bold">
        <Activity className="animate-spin" /> Loading Intelligence Engine...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white cursor-pointer" onClick={() => navigate('/')}>
            <Activity size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Intelligence Dashboard</h1>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                MARKETTRACE AI v2.4
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">{summary.company || 'NovaCommerce'} • {summary.period || 'August 2026'}</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/data-studio')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Database size={14} />
            <span>Data Studio (Upload New Data)</span>
          </button>
          <div className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Health: Real-time Sync
          </div>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Architectural Principle Banner */}
        <MethodologyBanner />

        {/* Upload Dataset Callout */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded border border-indigo-400/30">
                DYNAMIC ROOT-CAUSE ENGINE
              </span>
              <h3 className="text-base font-bold">Upload Any Business CSV Dataset to Analyze</h3>
            </div>
            <p className="text-xs text-slate-300">
              Drag and drop your transaction, sales, or operational data to instantly detect anomalies, isolate drivers, and generate an AI root cause explanation.
            </p>
          </div>

          <button
            onClick={() => navigate('/data-studio')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Database size={15} />
            <span>Open Data Studio (Upload CSV)</span>
          </button>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(summary.kpiSummary || {}).map(([key, data]: [string, any]) => (
            <div key={key} className={`bg-white rounded-xl border p-5 shadow-xs relative overflow-hidden ${data.status === 'CRITICAL_ANOMALY' ? 'border-red-300 ring-1 ring-red-200' : 'border-slate-200'}`}>
              {data.status === 'CRITICAL_ANOMALY' && (
                <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
              )}
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">{data.current}</span>
                <span className={`text-xs font-bold flex items-center mb-1 ${data.changePct < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {data.changePct < 0 ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                  {Math.abs(data.changePct)}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">vs Expected {data.previous}</p>
            </div>
          ))}
        </div>

        {/* Anomalies List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Active KPI Anomalies ({anomalies.length})</h2>
            <button 
              onClick={() => navigate('/data-studio')}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <PlusCircle size={14} />
              <span>Ingest New Dataset</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">KPI & Context</th>
                  <th className="px-6 py-4">Deviation</th>
                  <th className="px-6 py-4">Anomaly Score</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {anomalies.map(anomaly => (
                  <tr key={anomaly.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        anomaly.severity === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-200' :
                        anomaly.severity === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        <AlertCircle size={12} />
                        {anomaly.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm">{anomaly.kpi}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{anomaly.summary}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-red-600 font-mono">
                        <ArrowDownRight size={14} />
                        {anomaly.changePct}%
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{anomaly.currentValue} vs {anomaly.expectedValue}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${anomaly.anomalyScore > 80 ? 'bg-red-500' : 'bg-amber-500'}`} 
                            style={{ width: `${anomaly.anomalyScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold font-mono text-slate-700">{anomaly.anomalyScore}/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/investigation/${anomaly.investigationId || 'inv-novacommerce-01'}`)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
                      >
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
