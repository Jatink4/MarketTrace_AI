import React from 'react';
import { Persona, ScenarioKey } from '../../types';
import { UserCheck, ShieldCheck, Cpu, Database, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
  currentScenario: ScenarioKey;
  onScenarioChange: (scenario: ScenarioKey) => void;
  onOpenGovernance?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  onPersonaChange,
  currentScenario,
  onScenarioChange
}) => {
  const personas: Persona[] = ['CEO', 'Regional Manager', 'Product Manager', 'Data Analyst'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200/90 shadow-sm">
      {/* Top Architectural Principle Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-gray-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-indigo-900/40">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white tracking-wide">ENTERPRISE BI PRINCIPLE:</span>
          <span className="text-gray-300">
            Quantitative truth comes from deterministic analytical systems. The LLM explains & orchestrates the evidence.
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-gray-300">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deterministic Math: <strong className="text-white">Active</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>LLM Synthesis: <strong className="text-white">Grounded</strong></span>
          </div>
        </div>
      </div>

      {/* Main App Header */}
      <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">MARKETTRACE AI</h1>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-800 rounded uppercase tracking-wider">
                Enterprise BI v2.4
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Don't just see what changed. Understand why — and what to do next.
            </p>
          </div>
        </div>

        {/* Center: Interactive Scenario Switcher */}
        <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl border border-gray-200">
          <span className="text-[11px] font-semibold text-gray-500 uppercase px-2 tracking-wider">
            Demo Scenario:
          </span>
          <button
            onClick={() => onScenarioChange('cloudflow-aug-2026')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              currentScenario === 'cloudflow-aug-2026'
                ? 'bg-white text-indigo-700 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
            }`}
            title="Main Wow Scenario: Revenue -8.4% Integration Friction Investigation"
          >
            🔥 August Revenue (-8.4%)
          </button>

          <button
            onClick={() => onScenarioChange('ambiguous-revenue')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              currentScenario === 'ambiguous-revenue'
                ? 'bg-white text-amber-700 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
            }`}
            title="Ambiguity & Abstention Demo: Multi-Factor Balanced Cause (-7.2% Abstain)"
          >
            ⚖️ Ambiguity & Abstention
          </button>

          <button
            onClick={() => onScenarioChange('sparse-history')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              currentScenario === 'sparse-history'
                ? 'bg-white text-blue-700 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
            }`}
            title="Sparse History Demo: Product X (6 Weeks History - Low Confidence Guardrail)"
          >
            ⏳ Sparse History (6-Wks)
          </button>
        </div>

        {/* Right: Persona Switcher & User Profile */}
        <div className="flex items-center gap-4">
          {/* Persona Switcher */}
          <div className="flex items-center gap-2 bg-indigo-50/70 border border-indigo-200/80 rounded-xl px-3 py-1.5">
            <div className="flex items-center gap-1.5 text-xs text-indigo-900 font-semibold">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>Persona:</span>
            </div>
            <div className="relative inline-block">
              <select
                value={currentPersona}
                onChange={(e) => onPersonaChange(e.target.value as Persona)}
                aria-label="Active Decision Persona"
                className="text-xs font-bold text-indigo-950 bg-white border border-indigo-300 rounded-lg px-2.5 py-1 pr-6 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs appearance-none"
              >
                {personas.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-indigo-700 absolute right-2 top-2 pointer-events-none" />
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center border-2 border-indigo-200 shadow-xs">
              AM
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-gray-900 leading-tight">Alex Morgan</p>
              <p className="text-[11px] text-gray-500 leading-tight flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Strategy & Analytics
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
