import React, { useState } from 'react';
import { ALL_EVIDENCE_RECORDS, MISSING_EVIDENCE_ITEMS } from '../data/evidenceData';
import { EvidenceItem } from '../types';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { EvidenceStrengthScore } from '../components/common/Badge';
import {
  Database,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileQuestion,
  ExternalLink,
  Search,
  Calendar,
  Layers
} from 'lucide-react';

export const EvidencePage: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<'ALL' | 'SUPPORTING' | 'CONTRADICTING' | 'MISSING'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingItem, setInspectingItem] = useState<EvidenceItem | null>(null);

  const filteredEvidence = ALL_EVIDENCE_RECORDS.filter((ev) => {
    const matchesSource = selectedSource === 'ALL' || ev.source === selectedSource;
    const matchesType =
      selectedType === 'ALL' ||
      (selectedType === 'SUPPORTING' && ev.isSupporting) ||
      (selectedType === 'CONTRADICTING' && ev.isContradicting);
    const matchesSearch =
      searchQuery === '' ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.rawDetail.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSource && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Enterprise Evidence Explorer & Traceability Hub
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Triangulate empirical data across 5 enterprise systems of record with provenance tracking.
          </p>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
          5 Systems Connected & Audited
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Source Filter */}
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-slate-50 border border-gray-200 rounded-lg px-3 py-1.5 font-semibold text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="ALL">All Sources (5 Systems)</option>
            <option value="Customer Support">Customer Support (Zendesk)</option>
            <option value="Product Analytics">Product Analytics (ClickHouse)</option>
            <option value="CRM">CRM (Salesforce)</option>
            <option value="Customer Feedback">Customer Feedback (G2/CSAT)</option>
            <option value="Market Intelligence">Market Intelligence</option>
            <option value="Sales Database">Sales Database (ERP)</option>
          </select>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedType === 'ALL' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600'
              }`}
            >
              All Signals
            </button>
            <button
              onClick={() => setSelectedType('SUPPORTING')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedType === 'SUPPORTING' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-gray-600'
              }`}
            >
              Supporting
            </button>
            <button
              onClick={() => setSelectedType('CONTRADICTING')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedType === 'CONTRADICTING' ? 'bg-amber-500 text-white shadow-2xs' : 'text-gray-600'
              }`}
            >
              Contradicting
            </button>
            <button
              onClick={() => setSelectedType('MISSING')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                selectedType === 'MISSING' ? 'bg-slate-800 text-white shadow-2xs' : 'text-gray-600'
              }`}
            >
              Missing Gaps
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records, tickets, terms..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Evidence Grid */}
      {selectedType === 'MISSING' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {MISSING_EVIDENCE_ITEMS.map((miss) => (
            <div
              key={miss.id}
              className="bg-white rounded-xl border border-slate-300 p-4 shadow-subtle space-y-2 text-xs"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileQuestion className="w-4 h-4 text-slate-600" />
                  {miss.name}
                </span>
                <span className="text-[10px] font-mono bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded font-bold">
                  {miss.importance} Priority Gap
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{miss.description}</p>
              <p className="text-[10px] text-gray-400 font-mono pt-1">Source: {miss.source}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredEvidence.map((ev) => {
            const isSupporting = ev.isSupporting;

            return (
              <div
                key={ev.id}
                onClick={() => setInspectingItem(ev)}
                className={`bg-white rounded-xl border-2 p-4 shadow-2xs hover:shadow-card transition-all cursor-pointer space-y-2.5 flex flex-col justify-between ${
                  isSupporting ? 'border-emerald-100 hover:border-emerald-300' : 'border-amber-200 hover:border-amber-400 bg-amber-50/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="font-bold text-xs text-gray-900">{ev.source}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSupporting
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {isSupporting ? '✓ SUPPORTING' : '⚠ CONTRADICTING'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-gray-950 mt-2 tracking-tight">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-3 leading-relaxed">
                    {ev.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-gray-400">{ev.rawRecordId}</span>
                  <span className="text-indigo-600 font-bold flex items-center gap-1 hover:underline">
                    Inspect Trace <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Traceability Inspection Modal */}
      <Modal
        isOpen={!!inspectingItem}
        onClose={() => setInspectingItem(null)}
        title={inspectingItem ? `Record Traceability: ${inspectingItem.rawRecordId}` : 'Evidence Inspector'}
        subtitle={`System of Record: ${inspectingItem?.source}`}
      >
        {inspectingItem && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-900 text-white rounded-xl font-mono text-[11px] space-y-1">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
                <span>SYSTEM: {inspectingItem.source}</span>
                <span>EVENT_DATE: {inspectingItem.date}</span>
              </div>
              <p className="pt-1 text-emerald-400 font-bold">{inspectingItem.title}</p>
              <p className="text-slate-300">{inspectingItem.entity}</p>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-bold text-gray-900 uppercase text-[11px]">
                Original Payload / Excerpt
              </h5>
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 leading-relaxed italic">
                "{inspectingItem.rawDetail}"
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
              <div>
                <span className="text-[10px] text-gray-400 uppercase block">EVIDENCE IMPACT</span>
                <span className="font-bold text-gray-900">{inspectingItem.strengthImpact} IMPACT</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase block">TARGET HYPOTHESIS</span>
                <span className="font-bold text-indigo-700">{inspectingItem.hypothesisId}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
