import React, { useState } from 'react';
import { CONNECTED_KPIS } from '../data/kpiData';
import { KPI, ScenarioKey } from '../types';
import { Card } from '../components/common/Card';
import { MaterialityBadge, AnalyticalMethodBadge } from '../components/common/Badge';
import { SemanticContractModal } from '../components/governance/SemanticContractModal';
import {
  Gauge,
  SlidersHorizontal,
  FileCode2,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Info,
  Calendar,
  Layers,
  SearchCode
} from 'lucide-react';

interface KPIExplorerPageProps {
  onLaunchInvestigation: (scenarioKey?: ScenarioKey) => void;
}

export const KPIExplorerPage: React.FC<KPIExplorerPageProps> = ({ onLaunchInvestigation }) => {
  const [selectedKPIId, setSelectedKPIId] = useState<string>('kpi-revenue');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<string>('All');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('August 2026');
  const [viewingContract, setViewingContract] = useState<KPI | null>(null);

  const selectedKPI = CONNECTED_KPIS.find(k => k.id === selectedKPIId) || CONNECTED_KPIS[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Governed KPI Explorer & Semantic Registry
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Explore dimensional slices across certified enterprise metrics with deterministic anomaly detection boundaries.
          </p>
        </div>

        <button
          onClick={() => setViewingContract(selectedKPI)}
          className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-indigo-200"
        >
          <FileCode2 className="w-4 h-4" />
          <span>View Semantic Contract & Lineage</span>
        </button>
      </div>

      {/* Slicing Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        {/* KPI Selector */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Metric
          </label>
          <select
            value={selectedKPIId}
            onChange={(e) => setSelectedKPIId(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {CONNECTED_KPIS.map((k) => (
              <option key={k.id} value={k.id}>
                {k.name}
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Region Dimension
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Regions (Global)</option>
            <option value="Region C">Region C (APAC / South Asia)</option>
            <option value="Region A">Region A (Americas)</option>
            <option value="Region B">Region B (EMEA)</option>
          </select>
        </div>

        {/* Segment */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Customer Segment
          </label>
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Customer Tiers</option>
            <option value="Enterprise">Enterprise (&gt; ₹25L)</option>
            <option value="Mid-Market">Mid-Market (₹5L–₹25L)</option>
            <option value="SMB">SMB (&lt; ₹5L)</option>
          </select>
        </div>

        {/* Product */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Product Family
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Products</option>
            <option value="Product X">Product X (Core Engine)</option>
            <option value="Product Y">Product Y (Analytics Suite)</option>
            <option value="Product Z">Product Z (Integrations)</option>
          </select>
        </div>

        {/* Period */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Time Grain
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="August 2026">August 2026 (Fiscal Month)</option>
            <option value="July 2026">July 2026 (Fiscal Month)</option>
            <option value="Q2 2026">Q2 2026 (Quarterly)</option>
            <option value="Trailing 12 Months">Trailing 12 Months</option>
          </select>
        </div>
      </div>

      {/* Sliced Metric Detail Card */}
      <Card
        title={
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold text-gray-900">{selectedKPI.name}</span>
            <MaterialityBadge level={selectedKPI.materiality} />
          </div>
        }
        subtitle={`Active Slices: Region: ${selectedRegion} | Segment: ${selectedSegment} | Product: ${selectedProduct} | Period: ${selectedPeriod}`}
        action={
          <button
            onClick={() => onLaunchInvestigation('cloudflow-aug-2026')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investigate WHY for {selectedKPI.name}</span>
          </button>
        }
      >
        <div className="space-y-6">
          {/* Key Metric Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Current Observed</span>
              <p className="text-xl font-extrabold text-gray-950 font-mono">{selectedKPI.currentValue}</p>
              <span className="text-[10px] text-gray-500">Recorded for {selectedPeriod}</span>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Baseline Target</span>
              <p className="text-xl font-bold text-indigo-900 font-mono">{selectedKPI.previousValue}</p>
              <span className="text-[10px] text-gray-500">Expected Normal Range</span>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Calculated Variance</span>
              <p
                className={`text-xl font-extrabold font-mono ${
                  selectedKPI.changePct < 0 ? 'text-rose-600' : 'text-emerald-600'
                }`}
              >
                {selectedKPI.changePct > 0 ? `+${selectedKPI.changePct}%` : `${selectedKPI.changePct}%`}
              </p>
              <span className="text-[10px] text-gray-500">{selectedKPI.businessImpactFormatted}</span>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">Data Freshness</span>
              <p className="text-sm font-bold text-gray-900 mt-1">{selectedKPI.freshness}</p>
              <span className="text-[10px] text-emerald-700 font-semibold">SLA: On Track</span>
            </div>
          </div>

          {/* Governed Formula & Semantics Callout */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="font-mono text-indigo-300 font-bold uppercase text-[10px]">
                GOVERNED SEMANTIC DEFINITION
              </span>
              <span className="text-gray-400 font-mono text-[10px]">Owner: {selectedKPI.semanticContract.owner}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{selectedKPI.semanticContract.definition}</p>
            <div className="p-2 bg-slate-950 font-mono text-emerald-400 rounded text-[11px] overflow-x-auto">
              SQL: {selectedKPI.semanticContract.formula}
            </div>
          </div>
        </div>
      </Card>

      {/* Semantic Contract Modal */}
      {viewingContract && (
        <SemanticContractModal
          isOpen={!!viewingContract}
          onClose={() => setViewingContract(null)}
          contract={viewingContract.semanticContract}
        />
      )}
    </div>
  );
};
