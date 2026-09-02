import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchInvestigation, fetchLLMConfig } from '../api/client';
import { 
  Activity, 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  GitCommit, 
  Zap, 
  ShieldCheck, 
  Users, 
  Database,
  Search,
  Layers,
  Sparkles,
  AlertOctagon,
  Download,
  Cpu,
  Eye,
  ListOrdered
} from 'lucide-react';

import DetectView from '../components/investigation/DetectView';
import DecomposeView from '../components/investigation/DecomposeView';
import InvestigateView from '../components/investigation/InvestigateView';
import ValidateView from '../components/investigation/ValidateView';
import ExplainView from '../components/investigation/ExplainView';
import ActView from '../components/investigation/ActView';
import { PipelineExecutionViewer } from '../components/investigation/PipelineExecutionViewer';
import { DataLineageModal } from '../components/investigation/DataLineageModal';
import { TelemetryModal } from '../components/investigation/TelemetryModal';
import { MethodologyBanner } from '../components/common/MethodologyBanner';
import { FeedbackCard } from '../components/investigation/FeedbackCard';
import { StepByStepAnalysisView } from '../components/investigation/StepByStepAnalysisView';
import { LLMConfigModal } from '../components/common/LLMConfigModal';

const STAGES = [
  { id: '01', name: 'Detect', component: DetectView },
  { id: '02', name: 'Decompose', component: DecomposeView },
  { id: '03', name: 'Investigate', component: InvestigateView },
  { id: '04', name: 'Validate', component: ValidateView },
  { id: '05', name: 'Explain', component: ExplainView },
  { id: '06', name: 'Act', component: ActView }
];

export default function InvestigationWorkspace() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentAnalysisId = id || 'inv-novacommerce-01';
  const [investigation, setInvestigation] = useState<any>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLineage, setShowLineage] = useState(false);
  const [showTelemetry, setShowTelemetry] = useState(false);
  const [showLLMModal, setShowLLMModal] = useState(false);
  const [llmConfig, setLLMConfig] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState('Data Analyst');
  const [accessDeniedMessage, setAccessDeniedMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'step_by_step' | 'stage_inspect'>('step_by_step');

  const loadInvestigation = (targetId: string, role = selectedRole) => {
    setIsLoading(true);
    setAccessDeniedMessage(null);
    fetchInvestigation(targetId, role)
      .then((data) => {
        setInvestigation(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load investigation:', err);
        if (err.response?.status === 403) {
          setAccessDeniedMessage(err.response?.data?.message || 'Access restricted by Role-Based Access Control policy.');
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadInvestigation(currentAnalysisId, selectedRole);
    fetchLLMConfig().then(setLLMConfig).catch(() => {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentAnalysisId, selectedRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3 font-mono text-sm p-8">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-slate-600 font-bold">Loading Traceable Intelligence Context #{currentAnalysisId}...</div>
      </div>
    );
  }

  if (accessDeniedMessage) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 font-sans">
        <div className="max-w-md bg-white p-8 rounded-2xl border border-red-200 shadow-lg text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Restricted Evidence Access</h2>
          <p className="text-xs text-slate-600 leading-relaxed">{accessDeniedMessage}</p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setSelectedRole('Executive')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700"
            >
              Switch to Executive Role
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!investigation) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 space-y-4">
        <p className="text-slate-600 font-bold">Investigation #{currentAnalysisId} not found.</p>
        <button
          onClick={() => navigate('/data-studio')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold"
        >
          Go to Data Studio
        </button>
      </div>
    );
  }

  const ActiveComponent = STAGES[activeStage].component;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                investigation.materialityLevel === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
              }`}>
                {investigation.materialityLevel || 'HIGH'} MATERIALITY
              </span>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {investigation.company || 'NovaCommerce'} • {investigation.period || 'August 2026'} • #{investigation.analysisId || investigation.id}
              </span>
            </div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">{investigation.title}</h1>
          </div>
        </div>

        {/* Right Tools: LLM Settings, Lineage, Telemetry, Role */}
        <div className="flex items-center gap-2">
          {/* LLM Engine Setting */}
          <button
            onClick={() => setShowLLMModal(true)}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-indigo-200 transition-colors shadow-2xs"
          >
            <Cpu size={14} className="text-indigo-600" />
            <span>LLM: {llmConfig?.provider?.toUpperCase() || 'GEMINI'}</span>
          </button>

          {/* View Lineage */}
          <button
            onClick={() => setShowLineage(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <GitCommit size={14} className="text-indigo-600" />
            <span>Lineage</span>
          </button>

          {/* Telemetry */}
          <button
            onClick={() => setShowTelemetry(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Zap size={14} className="text-indigo-600" />
            <span>Telemetry</span>
          </button>

          {/* Role selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pl-2 border-l border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400">Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="Executive">Executive</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Product Manager">Product Manager</option>
            </select>
          </div>
        </div>
      </header>

      {/* Mode Switcher & Stepper Ribbon */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 font-bold">
            <button
              onClick={() => setViewMode('step_by_step')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === 'step_by_step' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered size={14} />
              <span>Step-by-Step Analysis & AI Story</span>
            </button>
            <button
              onClick={() => setViewMode('stage_inspect')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === 'stage_inspect' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers size={14} />
              <span>Deep Stage Inspector</span>
            </button>
          </div>

          {viewMode === 'stage_inspect' && (
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pl-3 border-l border-slate-200">
              {STAGES.map((stage, idx) => (
                <React.Fragment key={stage.id}>
                  <div 
                    className={`flex items-center gap-1.5 cursor-pointer px-2.5 py-1 rounded-lg transition-all ${
                      activeStage === idx 
                        ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200' 
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                    onClick={() => setActiveStage(idx)}
                  >
                    {activeStage > idx ? (
                      <CheckCircle2 size={13} className="text-emerald-500" />
                    ) : activeStage === idx ? (
                      <Circle size={13} className="fill-indigo-600 text-indigo-600" />
                    ) : (
                      <Circle size={13} />
                    )}
                    <span>{stage.id} {stage.name}</span>
                  </div>
                  {idx < STAGES.length - 1 && <ChevronRight size={12} className="text-slate-300" />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/data-studio')}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-xs"
          >
            <Database size={13} />
            <span>Upload New CSV</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col space-y-6 px-6 pt-6 max-w-7xl mx-auto w-full">
        {viewMode === 'step_by_step' ? (
          <StepByStepAnalysisView
            analysis={investigation}
            onOpenLLMSettings={() => setShowLLMModal(true)}
            onNavigateToFullWorkspace={() => setViewMode('stage_inspect')}
          />
        ) : (
          <div className="space-y-4">
            {/* Visual Pipeline Viewer */}
            <PipelineExecutionViewer pipelineData={investigation.pipelineExecution} />

            {/* Stage Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <ActiveComponent 
                investigation={investigation} 
                onNext={() => {
                  setActiveStage(s => Math.min(STAGES.length - 1, s + 1));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }} 
              />
            </div>

            {/* Analyst Feedback */}
            <FeedbackCard
              investigationId={investigation.analysisId || investigation.id}
              onFeedbackSubmitted={() => {
                console.log('Feedback registered successfully');
              }}
            />
          </div>
        )}
      </main>

      {/* Data Lineage Modal */}
      <DataLineageModal
        isOpen={showLineage}
        onClose={() => setShowLineage(false)}
        investigation={investigation}
      />

      {/* Telemetry Modal */}
      <TelemetryModal
        isOpen={showTelemetry}
        onClose={() => setShowTelemetry(false)}
        telemetry={investigation.telemetry}
      />

      {/* LLM Config Modal */}
      <LLMConfigModal
        isOpen={showLLMModal}
        onClose={() => setShowLLMModal(false)}
        onConfigSaved={(cfg) => setLLMConfig(cfg)}
      />
    </div>
  );
}
