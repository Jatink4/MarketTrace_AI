import React from 'react';
import { ArrowRight, Layers, ChevronRight, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DecomposeView({ investigation, onNext }: { investigation: any, onNext: () => void }) {
  const decomp = investigation.decompositionSummary || {
    regions: [
      { name: 'APAC', impactPct: -11.0, contributionPct: 62.2, isPrimary: true, loss: '$268K' },
      { name: 'North America', impactPct: -2.1, contributionPct: 15.4, isPrimary: false, loss: '$66K' },
      { name: 'Europe', impactPct: -1.8, contributionPct: 11.2, isPrimary: false, loss: '$48K' },
      { name: 'LATAM', impactPct: -1.5, contributionPct: 11.2, isPrimary: false, loss: '$48K' }
    ],
    primaryRegion: investigation.affectedRegion || 'APAC',
    primarySegment: investigation.affectedSegment || 'Enterprise Renewals',
    primaryContributionPct: 62.2
  };

  const regions = decomp.regions || [];

  return (
    <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
      {/* Left/Center - Visualization */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="text-indigo-600" /> 
                Multi-Dimensional Regional Decomposition
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Isolating variance contribution share across geographic regions.
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
              Method: Additive Variance Share Analysis
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regions} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#334155', fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="contributionPct" name="Loss Contribution Share %" radius={[0, 4, 4, 0]}>
                  {regions.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.isPrimary || index === 0 ? '#ef4444' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hierarchical Tree Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-600" /> 
            Hierarchical Dimension Isolation Tree
          </h2>
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
            <div className="font-bold text-slate-900">Global Revenue [{investigation.changePct}%]</div>
            <div className="pl-6 border-l-2 border-red-300 py-1 space-y-2">
              <div className="font-bold text-red-600 flex items-center gap-2">
                <ChevronRight size={14} /> {decomp.primaryRegion || 'APAC'} [-11.0% | {decomp.primaryContributionPct || 62.2}% of total loss share]
              </div>
              <div className="pl-6 border-l-2 border-red-400 py-1 space-y-2">
                <div className="font-bold text-red-700 flex items-center gap-2">
                  <ChevronRight size={14} /> Enterprise Segment [-16.4% conversion drop]
                </div>
                <div className="pl-6 border-l-2 border-red-500 py-1">
                  <div className="font-bold text-red-800 bg-red-100 inline-block px-2.5 py-1 rounded">
                    ↳ CloudSuite Core Renewals [-28.4% | Primary Isolated Driver]
                  </div>
                </div>
              </div>
            </div>
            <div className="pl-6 border-l-2 border-slate-300 py-1 text-slate-500">
              <span>↳ North America, Europe, LATAM [-1.8% to +0.8% | Normal Variance Range]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - AI Insight Panel */}
      <div className="w-full lg:w-96 bg-slate-50/70 p-6 flex flex-col justify-between space-y-6 shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="text-indigo-600" size={22} />
            <h2 className="text-lg font-bold text-slate-900">Decomposition Summary</h2>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">PRIMARY SEGMENT ISOLATED</div>
            <div className="text-lg font-bold text-indigo-950">{decomp.primaryRegion} {decomp.primarySegment}</div>
            <p className="text-xs text-indigo-800 mt-2 leading-relaxed">
              This sub-segment accounts for <strong>{decomp.primaryContributionPct || 62.2}%</strong> of the global variance shortfall.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Regional Share of Loss</h3>
            <ul className="space-y-2">
              {regions.map((r: any) => (
                <li key={r.name} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className={`font-semibold ${r.isPrimary ? 'text-red-600' : 'text-slate-600'}`}>{r.name}</span>
                  <div className="text-right font-mono">
                    <span className={`font-bold ${r.isPrimary ? 'text-red-600' : 'text-slate-900'}`}>{r.contributionPct}% share</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Investigate Cross-Source Evidence</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
