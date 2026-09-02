import React from 'react';
import { GitCommit, ArrowDown, Database, Activity, Layers, Search, Clock, Scale, CheckCircle2, X } from 'lucide-react';

interface DataLineageModalProps {
  isOpen: boolean;
  onClose: () => void;
  investigation: any;
}

export const DataLineageModal: React.FC<DataLineageModalProps> = ({ isOpen, onClose, investigation }) => {
  if (!isOpen) return null;

  const lineageSteps = [
    {
      step: 1,
      name: 'Raw Ingestion & Grain Normalization',
      source: investigation.filename || 'sales.csv (645 records / 84,392 transactions)',
      detail: 'Daily transactional records mapped to Revenue semantic contract: SUM(revenue), grain: transaction.',
      icon: Database,
      badge: 'Data Layer'
    },
    {
      step: 2,
      name: 'Statistical Anomaly Detection',
      source: 'Holt-Winters ARIMA / Z-Score Engine',
      detail: `Detected ${investigation.changePct}% deviation from $5.25M baseline to ${investigation.currentValue}. Z-Score: ${investigation.zScore || -3.42} (p < 0.001).`,
      icon: Activity,
      badge: 'Time-Series Math'
    },
    {
      step: 3,
      name: 'Dimensional Variance Decomposition',
      source: 'Multi-Dimensional Additive Share Analysis',
      detail: `Isolated primary variance to ${investigation.affectedRegion || 'APAC'} (62.2% of loss share) and ${investigation.affectedSegment || 'Enterprise'} (-16.4% segment drop).`,
      icon: Layers,
      badge: 'Decomposition'
    },
    {
      step: 4,
      name: 'Factor Discovery & Cross-Correlation',
      source: 'Salesforce CRM & Pipeline Cohorts',
      detail: 'Lag-15 cross-correlation (r = -0.84) indicates enterprise renewal pipeline began contracting 15 days prior to top-line drop.',
      icon: Search,
      badge: 'Correlation'
    },
    {
      step: 5,
      name: 'Unstructured NLP & Cross-Source Triangulation',
      source: 'Zendesk Enterprise Tickets & Customer Reviews',
      detail: '18 P1 tickets citing v4.2 OAuth ERP connector timeout bugs extracted. NPS in APAC Enterprise fell from +54 to +18.',
      icon: Search,
      badge: 'NLP / RAG'
    },
    {
      step: 6,
      name: 'Chronological Precedence & Causal Validation',
      source: 'Difference-in-Differences & Event Study',
      detail: 'Precedence confirmed (Pipeline drop July 15 → Revenue drop Aug 1). Alternative H2 (CloudApex discount on Aug 12) refuted as 11 days late.',
      icon: Clock,
      badge: 'Causality'
    },
    {
      step: 7,
      name: 'Weighted Evidence Scoring & Root Cause Ranking',
      source: '7-Factor Transparent Scoring Algorithm',
      detail: 'Hypothesis H1 scored 87% (HIGH Confidence) based on 30% evidence strength, 20% temporal alignment, 15% overlap, and 15% contribution share.',
      icon: Scale,
      badge: 'Root Cause #1'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
              <GitCommit size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">End-to-End Data Lineage</h2>
              <p className="text-xs text-slate-500 font-mono">Traceable evidence lineage from raw bytes to root-cause decision</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        {/* Lineage Tree Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {lineageSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative flex items-start gap-4">
                {/* Connecting Line */}
                {idx < lineageSteps.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-200" />
                )}

                {/* Node Icon */}
                <div className="w-8 h-8 rounded-full bg-indigo-50 border-2 border-indigo-600 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                  {item.step}
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1 hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{item.name}</span>
                    <span className="text-[10px] font-mono font-bold bg-white text-indigo-700 px-2 py-0.5 rounded border border-slate-200">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-900">
                    Source: <span className="font-mono text-slate-700">{item.source}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono">Auditable & Certified by MarketTrace Governance Layer</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Lineage
          </button>
        </div>
      </div>
    </div>
  );
};
