import React, { useState } from 'react';
import { GOVERNANCE_ROLES_CONFIG, MASKED_DATA_EXAMPLES, AUDIT_LOG_ENTRIES } from '../data/governanceData';
import { Persona } from '../types';
import { Card } from '../components/common/Card';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  FileText,
  KeyRound,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface GovernancePageProps {
  currentPersona?: Persona;
  onPersonaChange?: (persona: Persona) => void;
}

export const GovernancePage: React.FC<GovernancePageProps> = ({
  currentPersona: initialPersona = 'Data Analyst',
  onPersonaChange
}) => {
  const [internalPersona, setInternalPersona] = useState<Persona>(initialPersona);
  const personas: Persona[] = ['CEO', 'Regional Manager', 'Product Manager', 'Data Analyst'];
  const currentPersona = onPersonaChange ? initialPersona : internalPersona;
  const activeRole = GOVERNANCE_ROLES_CONFIG[currentPersona] || GOVERNANCE_ROLES_CONFIG['Data Analyst'];

  const handlePersonaSelect = (p: Persona) => {
    if (onPersonaChange) onPersonaChange(p);
    else setInternalPersona(p);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Enterprise Governance, RBAC & Row-Level Security
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Governed access policies, data masking, and real-time security audit logging.
          </p>
        </div>

        {/* Persona Switcher */}
        <div className="flex items-center gap-1.5 bg-indigo-50 p-1.5 rounded-xl border border-indigo-200">
          <span className="text-[11px] font-bold text-indigo-900 px-2 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-indigo-600" /> Test Persona:
          </span>
          {personas.map((p) => (
            <button
              key={p}
              onClick={() => handlePersonaSelect(p)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currentPersona === p
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Role Access Matrix Card */}
      <Card
        title={`Active Security Context: ${activeRole.title} (${activeRole.department})`}
        subtitle="Role-Based Access Control (RBAC) & Column-Level Security Permissions"
        badge={
          <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
            Policy: Enforced
          </span>
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Revenue KPI Access</span>
            <p className="text-sm font-bold text-emerald-700 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Authorized
            </p>
            <span className="text-[10px] text-gray-500">Aggregated Sales Metric</span>
          </div>

          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Customer PII Data</span>
            <p
              className={`text-sm font-bold mt-1 flex items-center gap-1 ${
                activeRole.customerLevelData === 'Full'
                  ? 'text-emerald-700'
                  : activeRole.customerLevelData === 'Masked'
                  ? 'text-amber-700'
                  : 'text-indigo-700'
              }`}
            >
              {activeRole.customerLevelData === 'Masked' ? (
                <Lock className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
              {activeRole.customerLevelData} Access
            </p>
            <span className="text-[10px] text-gray-500">Emails, Phone, Contacts</span>
          </div>

          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Finance Sensitive Fields</span>
            <p
              className={`text-sm font-bold mt-1 flex items-center gap-1 ${
                activeRole.financeSensitiveFields === 'Visible' ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {activeRole.financeSensitiveFields === 'Visible' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-rose-600" />
              )}
              {activeRole.financeSensitiveFields}
            </p>
            <span className="text-[10px] text-gray-500">Raw Margin & Transaction IDs</span>
          </div>

          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">HR & Compensation</span>
            <p className="text-sm font-bold text-rose-700 flex items-center gap-1 mt-1">
              <XCircle className="w-4 h-4 text-rose-600" /> {activeRole.hrAccess}
            </p>
            <span className="text-[10px] text-gray-500">Rep Quota & Commissions</span>
          </div>
        </div>
      </Card>

      {/* Row-Level Security (RLS) Simulator */}
      <Card
        title="Row-Level Security (RLS) Partition Simulator"
        subtitle="Verifying that regional managers only see authorized geographic territories"
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-center justify-between text-indigo-900">
            <span className="font-semibold">
              Currently testing RLS partition rules for: <strong>{activeRole.title}</strong>
            </span>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-indigo-200 font-bold">
              RLS Rule #402-B
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(activeRole.regionAccess).map(([region, access]) => {
              const isVisible = access === 'Visible';

              return (
                <div
                  key={region}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isVisible
                      ? 'bg-white border-gray-200 shadow-2xs'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div>
                    <span className="font-bold text-gray-900 block">{region}</span>
                    <span className="text-[10px] text-gray-500">Regional Ledger</span>
                  </div>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isVisible
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {access}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Data Masking in Action */}
      <Card
        title="Dynamic Data Masking Examples"
        subtitle="Automatic redaction of PII and PCI-sensitive enterprise fields in AI contexts"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/70 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5">Field Name</th>
                <th className="px-4 py-2.5">Raw Database Record</th>
                <th className="px-4 py-2.5">Masked Presentation (AI/UI)</th>
                <th className="px-4 py-2.5">Governance Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MASKED_DATA_EXAMPLES.map((mask, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-900">{mask.field}</td>
                  <td className="px-4 py-3 font-mono text-gray-400">{mask.rawUnmasked}</td>
                  <td className="px-4 py-3 font-mono font-bold text-indigo-700 bg-indigo-50/30">
                    {mask.maskedDisplay}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-[11px]">{mask.policy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Enterprise Security Audit Log */}
      <Card
        title="Enterprise Security Audit Log"
        subtitle="Immutable audit trail of all analytics executions, telemetry queries, and proposed actions"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/70 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-3 py-2.5">Timestamp</th>
                <th className="px-3 py-2.5">User</th>
                <th className="px-3 py-2.5">Role</th>
                <th className="px-3 py-2.5">KPI Accessed</th>
                <th className="px-3 py-2.5">Analysis Type</th>
                <th className="px-3 py-2.5">Action Taken</th>
                <th className="px-3 py-2.5">Policy Enforced</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px]">
              {AUDIT_LOG_ENTRIES.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 font-mono">
                  <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{entry.timestamp}</td>
                  <td className="px-3 py-2 font-bold text-gray-900">{entry.user}</td>
                  <td className="px-3 py-2 text-indigo-700">{entry.role}</td>
                  <td className="px-3 py-2 text-gray-800">{entry.kpi}</td>
                  <td className="px-3 py-2 text-gray-600">{entry.analysisType}</td>
                  <td className="px-3 py-2 text-emerald-700 font-semibold">{entry.actionTaken}</td>
                  <td className="px-3 py-2 text-gray-400">{entry.policyEnforced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
