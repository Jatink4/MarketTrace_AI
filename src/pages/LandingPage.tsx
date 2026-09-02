import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, BrainCircuit, ArrowRight, ShieldCheck, Database, Zap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded text-white">
            <Activity size={20} className="stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">MARKETTRACE AI</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Platform</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Enterprise</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 hover:text-indigo-600">Sign In</button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Launch Console
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-8">
          <BrainCircuit size={14} />
          <span>The Decision Gap is Closed</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mb-6">
          Don't just see what changed.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
            Understand why — and what to do next.
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mb-12">
          MarketTrace AI is the world's first KPI Root-Cause Intelligence platform. We automatically detect anomalies, trace them through your unstructured data, and generate evidence-grounded actions.
        </p>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/investigation/inv-novacommerce-01')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-600/20 flex items-center gap-2"
          >
            Explore Interactive Demo
            <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            View Dashboard
          </button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <Database size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Unstructured Triangulation</h3>
            <p className="text-slate-600">Connects structured BI metrics directly to unstructured CRM notes, support tickets, and market signals.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Temporal Reasoning</h3>
            <p className="text-slate-600">Validates causality by automatically distinguishing between supporting, preceding, and contradictory evidence.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Governed Actions</h3>
            <p className="text-slate-600">Produces explicit Confidence & Uncertainty scores, stopping hallucinations and routing decisions to owners.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
