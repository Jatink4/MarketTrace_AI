import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot
} from 'recharts';
import { AlertCircle, TrendingDown, Info } from 'lucide-react';

interface AnomalyChartProps {
  data: Array<{
    month: string;
    actual: number;
    expected: number;
    minExpected: number;
    maxExpected: number;
    isAnomaly?: boolean;
    label?: string;
  }>;
  unit?: string;
}

export const AnomalyChart: React.FC<AnomalyChartProps> = ({ data, unit = '₹ Cr' }) => {
  // Format tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const actualVal = payload.find((p: any) => p.dataKey === 'actual')?.value;
      const expectedVal = payload.find((p: any) => p.dataKey === 'expected')?.value;
      const minVal = payload.find((p: any) => p.dataKey === 'minExpected')?.value;
      const maxVal = payload.find((p: any) => p.dataKey === 'maxExpected')?.value;
      const isAug = label.includes('Aug') || label.includes('Wk 6') || label.includes('Jul');

      return (
        <div className="bg-white p-3 rounded-xl shadow-dropdown border border-gray-200 text-xs space-y-1.5 z-50">
          <p className="font-bold text-gray-900 border-b border-gray-100 pb-1">{label}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">Actual:</span>
            <span className="font-bold font-mono text-gray-900">{actualVal !== undefined ? `${actualVal} ${unit}` : 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">Expected Baseline:</span>
            <span className="font-semibold font-mono text-indigo-600">{expectedVal} {unit}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-[11px] text-gray-400">
            <span>95% CI Range:</span>
            <span className="font-mono">[{minVal} - {maxVal}] {unit}</span>
          </div>
          {isAug && (
            <div className="mt-1 pt-1 border-t border-rose-100 text-rose-600 font-bold flex items-center gap-1 text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Statistical Anomaly Breach (-8.4%)</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const anomalyPoint = data.find(d => d.isAnomaly);

  return (
    <div className="space-y-3">
      {/* Alert Callout Banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 bg-rose-100 rounded-lg text-rose-700 flex-shrink-0 mt-0.5">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-rose-900">
              August revenue is outside the normal historical range
            </h4>
            <p className="text-xs text-rose-700 mt-0.5">
              Actual: <strong className="font-mono">₹9.16 Cr</strong> vs Expected Baseline: <strong className="font-mono">₹9.80–₹10.30 Cr</strong> (95% statistical confidence band). Net deviation: <strong className="font-mono">-8.4%</strong>.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-[11px] font-mono text-rose-800 font-semibold shadow-2xs">
          <span>Z-Score: -3.42 (p &lt; 0.001)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818CF8" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#C7D2FE" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              domain={['auto', 'auto']}
              tickFormatter={(v) => `${v}`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
              iconSize={8}
            />

            {/* Expected Confidence Interval Area */}
            <Area
              type="monotone"
              dataKey="maxExpected"
              stroke="transparent"
              fill="url(#confidenceBand)"
              name="Expected 95% CI Range"
            />
            <Area
              type="monotone"
              dataKey="minExpected"
              stroke="transparent"
              fill="#FFFFFF"
              name=""
            />

            {/* Expected Baseline Line */}
            <Line
              type="monotone"
              dataKey="expected"
              stroke="#6366F1"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              name="Expected Baseline (ARIMA)"
            />

            {/* Actual Revenue Line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#0F172A"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#0F172A' }}
              activeDot={{ r: 6, fill: '#EF4444', stroke: '#FFFFFF', strokeWidth: 2 }}
              name="Actual Revenue"
            />

            {/* Reference dot for Anomaly Point */}
            {anomalyPoint && (
              <ReferenceDot
                x={anomalyPoint.month}
                y={anomalyPoint.actual}
                r={7}
                fill="#EF4444"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-100 pt-2">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-gray-400" />
          Shaded area represents the 95% statistical confidence interval
        </span>
        <span className="font-mono text-gray-600">Model: Holt-Winters ARIMA (n=12 mo)</span>
      </div>
    </div>
  );
};
