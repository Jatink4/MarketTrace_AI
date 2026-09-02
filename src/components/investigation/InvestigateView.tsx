import React, { useState } from 'react';
import { ArrowRight, Search, Database, Clock, Tag, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function InvestigateView({ investigation, onNext }: { investigation: any, onNext: () => void }) {
  const [filter, setFilter] = useState('ALL');
  const rag = investigation.ragResult || {};
  const allEvidence = investigation.allEvidenceFlat || [];

  const filteredEvidence = filter === 'ALL'
    ? allEvidence
    : allEvidence.filter((e: any) => e.source?.toLowerCase().includes(filter.toLowerCase()) || e.system?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
      {/* Left/Center - Visualization */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Database className="text-indigo-600" /> 
              Cross-Source Evidence Triangulation Explorer
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Scanning unstructured Salesforce CRM notes, Zendesk support tickets, G2 feedback, and Gartner market signals.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['ALL', 'CRM', 'Support', 'Feedback', 'Market'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filter === f ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* NLP Extracted Topics Banner */}
        {rag.topics?.length > 0 && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                NLP Topic Clustering & Sentiment Extraction (TF-IDF + Token Embeddings)
              </span>
              <span className="text-[10px] font-mono text-indigo-600 font-semibold">
                Method: Unstructured RAG
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rag.topics.slice(0, 4).map((t: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{t.topic}</span>
                    <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                      {t.frequency} citations
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic truncate">"{t.representativeQuote}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Evidence Cards List */}
        <div className="space-y-3">
          {filteredEvidence.map((item: any) => (
            <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                    item.source?.includes('CRM') ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                    item.source?.includes('Support') ? 'bg-orange-50 text-orange-800 border border-orange-200' :
                    item.source?.includes('Feedback') ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                    'bg-cyan-50 text-cyan-800 border border-cyan-200'
                  }`}>
                    {item.source}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{item.entity}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <Clock size={12} /> {item.date || item.timestamp}
                </div>
              </div>
              
              <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-slate-600 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-serif italic mb-2">
                "{item.excerpt}"
              </p>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">System: <strong>{item.system}</strong></span>
                <span className={`px-2 py-0.5 rounded font-bold font-mono text-[10px] ${
                  item.isSupporting ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {item.isSupporting ? '✓ SUPPORTING EVIDENCE' : '⚠ CONTRADICTORY EVIDENCE'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - AI Insight Panel */}
      <div className="w-full lg:w-96 bg-slate-50/70 p-6 flex flex-col justify-between space-y-6 shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Search className="text-indigo-600" size={22} />
            <h2 className="text-lg font-bold text-slate-900">Unstructured Triangulation</h2>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">RAG EVIDENCE COVERAGE</div>
            <div className="text-xl font-black text-indigo-950">18 Corroborating Signals</div>
            <p className="text-xs text-indigo-800 mt-2 leading-relaxed">
              Scanned 34,500 unstructured records across 5 enterprise systems to verify customer renewal delay reasons.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Extracted Named Entities</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">High-Risk Accounts:</span>
                <span className="font-semibold text-slate-800 font-mono">Tokyo Digital, Singapore Telecom, Sydney Financial, Jakarta Enterprise</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Systems Identified:</span>
                <span className="font-semibold text-slate-800 font-mono">CloudSuite v4.2, SAP ERP OAuth Connector</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Validate Competing Hypotheses</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
