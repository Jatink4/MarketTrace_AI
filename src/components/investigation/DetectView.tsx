import React from 'react';
import { ArrowRight, AlertTriangle, TrendingDown, CheckCircle2, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function DetectView({ investigation, onNext }: { investigation: any, onNext: () => void }) {
  const data = investigation.trendSeries || [
    { month: "Jun", actual: 5.26, expected: 5.24, range: [5.10, 5.38] },
    { month: "Jul", actual: 5.25, expected: 5.25, range: [5.12, 5.40] },
    { month: "Aug", actual: 4.82, expected: 5.25, range: [5.15, 5.35], isAnomaly: true }
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
      {/* Left / Center - Visualization */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingDown className="text-red-500" /> 
                Statistical Time-Series Anomaly Detection: {investigation.kpi}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluating observed {investigation.currentValue} against historical {investigation.previousValue} baseline with 95% statistical confidence bounds.
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
              Method: Holt-Winters ARIMA (Z = {investigation.zScore || -3.42})
            </span>
          </div>
          
          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val}M`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="range" stroke="none" fill="#f1f5f9" name="95% Normal Range" />
                <Area type="monotone" dataKey="expected" stroke="#94a3b8" strokeDasharray="5 5" fill="none" strokeWidth={2} name="Expected Baseline" />
                <Area type="monotone" dataKey="actual" stroke="#4f46e5" fill="url(#colorActual)" strokeWidth={3} name="Observed Actual" />
                <ReferenceLine x={data[data.length - 1]?.month} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Observed Anomaly', fill: '#ef4444', fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right - AI Insight Panel */}
      <div className="w-full lg:w-96 bg-slate-50/70 p-6 flex flex-col justify-between space-y-6 shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={22} />
            <h2 className="text-lg font-bold text-slate-900">Detection Summary</h2>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-1">ANOMALY SCORE: {investigation.anomalyScore || 94}/100</div>
            <div className="text-2xl font-black text-red-700">{investigation.changePct}% Deviation</div>
            <p className="text-xs text-red-800 mt-2 leading-relaxed">
              August revenue arrived at <strong>{investigation.currentValue}</strong>, deviating materially from the expected baseline of <strong>{investigation.previousValue}</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Deterministic Statistical Signals</h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Z-Score</span>
                <span className="font-semibold text-slate-900 font-mono">{investigation.zScore || -3.42} (p &lt; 0.001)</span>
              </li>
              <li className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Materiality</span>
                <span className="font-bold text-rose-600">{investigation.materialityLevel || 'HIGH'}</span>
              </li>
              <li className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Business ARR Impact</span>
                <span className="font-semibold text-rose-600 font-mono">{investigation.businessImpact || '-$430,000'}</span>
              </li>
              <li className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Model Decision</span>
                <span className="font-semibold text-emerald-700">{investigation.status === 'ABSTAIN' ? 'ABSTAIN (Uncertain)' : 'TRIGGER_TRIANGULATION'}</span>
              </li>
            </ul>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Decompose Variance</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
