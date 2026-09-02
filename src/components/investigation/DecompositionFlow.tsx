import React, { useState } from 'react';
import { DecompositionNode } from '../../types';
import { ArrowRight, ChevronRight, Layers, Target } from 'lucide-react';

interface DecompositionFlowProps {
  rootNode: DecompositionNode;
}

export const DecompositionFlow: React.FC<DecompositionFlowProps> = ({ rootNode }) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'root': true,
    'seg-enterprise': true,
    'reg-c': true
  });

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {/* Primary Funnel Path Callout */}
      <div className="p-3.5 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-xl text-white border border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
            Primary Contribution Path Isolated
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="px-2 py-1 bg-white/10 rounded-md font-bold">Total Revenue (-8.4%)</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-2 py-1 bg-white/10 rounded-md font-bold text-amber-300">Enterprise Segment (-18.2%)</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-2 py-1 bg-white/10 rounded-md font-bold text-rose-300">Region C APAC (-29.4%)</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="px-2 py-1 bg-rose-500/30 text-rose-200 border border-rose-400/40 rounded-md font-bold">
            Product X Core Engine (-34.1%)
          </span>
        </div>

        <p className="text-[11px] text-gray-300 mt-2 font-mono">
          65.0% of the entire revenue contraction (₹54.6 Lakh of ₹84.0 Lakh) originated within Enterprise accounts in Region C using Product X.
        </p>
      </div>

      {/* Interactive Tree View */}
      <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-600 border-b border-gray-200/80 pb-2">
          <span className="font-bold flex items-center gap-1.5 text-gray-800">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            Hierarchical Variance Decomposition Tree
          </span>
          <span className="font-mono text-[11px] text-gray-500">Method: Multi-Dimensional Slice & Dice</span>
        </div>

        {/* Root */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200 shadow-2xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              <span className="text-gray-900 font-bold">{rootNode.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-gray-500 text-[11px]">Loss: {rootNode.absoluteLoss}</span>
              <span className="font-mono font-bold text-rose-600 px-2 py-0.5 bg-rose-50 rounded border border-rose-200">
                {rootNode.changePct}%
              </span>
            </div>
          </div>

          {/* Level 1: Segments */}
          {rootNode.children && (
            <div className="pl-4 border-l-2 border-indigo-200 space-y-2 my-2">
              {rootNode.children.map((seg) => {
                const isExpanded = expandedNodes[seg.id];
                const isPrimary = seg.id === 'seg-enterprise';

                return (
                  <div key={seg.id} className="space-y-2">
                    <div
                      onClick={() => seg.children && toggleNode(seg.id)}
                      className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                        isPrimary
                          ? 'bg-amber-50/70 border-amber-300 hover:bg-amber-100/50 shadow-2xs'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {seg.children ? (
                          <ChevronRight className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        ) : (
                          <span className="w-3.5" />
                        )}
                        <span className="font-bold text-gray-900">{seg.name}</span>
                        {isPrimary && (
                          <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold uppercase">
                            Primary Focus (81% Impact)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-gray-500 text-[11px]">{seg.absoluteLoss}</span>
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded border text-[11px] ${
                            seg.changePct <= -10
                              ? 'bg-rose-100 text-rose-800 border-rose-300'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {seg.changePct}%
                        </span>
                      </div>
                    </div>

                    {/* Level 2: Regions */}
                    {isExpanded && seg.children && (
                      <div className="pl-4 border-l-2 border-amber-300 space-y-2 my-2">
                        {seg.children.map((reg) => {
                          const isRegExpanded = expandedNodes[reg.id];
                          const isRegPrimary = reg.id === 'reg-c';

                          return (
                            <div key={reg.id} className="space-y-2">
                              <div
                                onClick={() => reg.children && toggleNode(reg.id)}
                                className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                                  isRegPrimary
                                    ? 'bg-rose-50/70 border-rose-300 shadow-2xs'
                                    : 'bg-white border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {reg.children ? (
                                    <ChevronRight className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isRegExpanded ? 'rotate-90' : ''}`} />
                                  ) : (
                                    <span className="w-3.5" />
                                  )}
                                  <span className="font-bold text-gray-900">{reg.name}</span>
                                  {isRegPrimary && (
                                    <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded font-bold uppercase">
                                      Hotspot (-29.4%)
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="font-mono text-gray-500 text-[11px]">{reg.absoluteLoss}</span>
                                  <span className="font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded border border-rose-200 text-[11px]">
                                    {reg.changePct}%
                                  </span>
                                </div>
                              </div>

                              {/* Level 3: Products */}
                              {isRegExpanded && reg.children && (
                                <div className="pl-4 border-l-2 border-rose-400 space-y-1.5 my-1.5">
                                  {reg.children.map((prod) => (
                                    <div
                                      key={prod.id}
                                      className={`flex items-center justify-between p-2 rounded-lg border ${
                                        prod.id === 'prod-x'
                                          ? 'bg-rose-100/60 border-rose-400 font-bold'
                                          : 'bg-white border-gray-200'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                                        <span className="text-gray-900">{prod.name}</span>
                                        {prod.id === 'prod-x' && (
                                          <span className="text-[10px] bg-rose-700 text-white px-1.5 py-0.2 rounded font-bold">
                                            Root Bottleneck
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <span className="font-mono text-gray-600 text-[11px]">{prod.absoluteLoss}</span>
                                        <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">
                                          {prod.changePct}%
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
