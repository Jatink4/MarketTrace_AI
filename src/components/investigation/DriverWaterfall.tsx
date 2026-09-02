import React from 'react';
import { DriverContribution } from '../../types';
import { ShieldCheck, BarChart3, HelpCircle } from 'lucide-react';

interface DriverWaterfallProps {
  drivers: DriverContribution[];
  totalChangePct: number;
}

export const DriverWaterfall: React.FC<DriverWaterfallProps> = ({ drivers, totalChangePct }) => {
  return (
    <div className="space-y-4">
      {/* Header Method Notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-700" />
          <span className="font-bold text-gray-900">Method: Deterministic Multi-Factor Contribution Analysis</span>
        </div>
        <span className="text-[11px] font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
          Non-LLM Mathematical Decomposition
        </span>
      </div>

      {/* Visual Waterfall Bars */}
      <div className="space-y-2.5 bg-white p-4 rounded-xl border border-gray-200">
        {drivers.map((driver, idx) => {
          const isNegative = driver.type === 'negative';
          const widthPct = Math.min(100, (Math.abs(driver.contributionPct) / 5.0) * 100);

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-5 font-mono text-[10px] text-gray-400">0{idx + 1}</span>
                  <span className="text-gray-800">{driver.name}</span>
                  <span className="text-[10px] text-gray-400 font-normal">({driver.method})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-gray-500 text-[11px]">{driver.absoluteImpact}</span>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                      isNegative
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {driver.contributionPct > 0 ? `+${driver.contributionPct}%` : `${driver.contributionPct}%`}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isNegative ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>

              <p className="text-[10px] text-gray-500 pl-7">{driver.description}</p>
            </div>
          );
        })}

        {/* Total Summary Row */}
        <div className="mt-4 pt-3 border-t-2 border-gray-200 flex items-center justify-between bg-slate-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-xs">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Net Calculated Movement:</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-600 font-semibold">All Drivers Summed</span>
            <span className="text-sm font-mono font-extrabold text-rose-700 px-3 py-1 bg-rose-100 rounded-lg border border-rose-300">
              {totalChangePct}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 px-1">
        <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        <span>Contribution percentages sum deterministically to the net observed variance.</span>
      </div>
    </div>
  );
};
