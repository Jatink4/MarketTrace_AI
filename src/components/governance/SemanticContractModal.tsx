import React from 'react';
import { SemanticContract } from '../../types';
import { Modal } from '../common/Modal';
import { ShieldCheck, Database, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SemanticContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: SemanticContract;
}

export const SemanticContractModal: React.FC<SemanticContractModalProps> = ({
  isOpen,
  onClose,
  contract
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`KPI Semantic Contract: ${contract.kpi}`}
      subtitle="Enterprise Governed Metric Specification & Data Lineage"
      maxWidth="2xl"
    >
      <div className="space-y-4 text-xs">
        {/* Definition & Formula */}
        <div className="p-4 bg-slate-50 border border-gray-200 rounded-xl space-y-2.5">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-gray-400 block tracking-wider">
              OFFICIAL BUSINESS DEFINITION
            </span>
            <p className="text-gray-900 font-medium text-xs mt-0.5 leading-relaxed">
              {contract.definition}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-gray-400 block tracking-wider">
              DETERMINISTIC SQL FORMULA
            </span>
            <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-lg text-xs mt-0.5 overflow-x-auto">
              {contract.formula}
            </div>
          </div>
        </div>

        {/* Governed Properties Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-2.5 bg-white border border-gray-200 rounded-lg space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">DATA GRAIN</span>
            <p className="font-bold text-gray-900">{contract.grain}</p>
          </div>

          <div className="p-2.5 bg-white border border-gray-200 rounded-lg space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">CALENDAR ALIGNMENT</span>
            <p className="font-bold text-gray-900">{contract.calendar}</p>
          </div>

          <div className="p-2.5 bg-white border border-gray-200 rounded-lg space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">ANOMALY THRESHOLD</span>
            <p className="font-bold text-rose-700">{contract.threshold}</p>
          </div>

          <div className="p-2.5 bg-white border border-gray-200 rounded-lg space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">GOVERNANCE OWNER</span>
            <p className="font-bold text-indigo-900">{contract.owner}</p>
          </div>

          <div className="p-2.5 bg-white border border-gray-200 rounded-lg space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">ACCESS POLICY</span>
            <p className="font-bold text-gray-900">{contract.access}</p>
          </div>

          <div className="p-2.5 bg-white border border-gray-200 rounded-lg space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">DIMENSIONS</span>
            <p className="font-mono text-gray-700 text-[11px] truncate">
              {contract.dimensions.join(', ')}
            </p>
          </div>
        </div>

        {/* Data Lineage Graph */}
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-gray-900 uppercase text-[11px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Verified Data Lineage Chain
            </h5>
            <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Fully Audited
            </span>
          </div>

          <div className="space-y-2">
            {contract.lineage.map((node) => (
              <div
                key={node.step}
                className="p-2.5 bg-white border border-gray-200 rounded-lg flex items-start gap-3 shadow-2xs"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-mono font-bold flex items-center justify-center text-xs flex-shrink-0">
                  {node.step}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900">{node.title}</p>
                    <span className="font-mono text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                      {node.system}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{node.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-lg text-[11px] text-indigo-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-700 flex-shrink-0" />
          <span>
            Semantic Contract guarantees that LLMs and dashboards read standardized, pre-calculated metric formulas.
          </span>
        </div>
      </div>
    </Modal>
  );
};
