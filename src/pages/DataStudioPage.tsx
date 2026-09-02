import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Activity, 
  Database, 
  Sparkles, 
  RefreshCw, 
  Cpu, 
  ArrowLeft,
  ShieldCheck,
  Zap,
  Play,
  Layers,
  Scale,
  Clock
} from 'lucide-react';
import { runAnalysis, fetchKPIs, fetchLLMConfig } from '../api/client';
import { MethodologyBanner } from '../components/common/MethodologyBanner';
import { StepByStepAnalysisView } from '../components/investigation/StepByStepAnalysisView';
import { LLMConfigModal } from '../components/common/LLMConfigModal';

export default function DataStudioPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'upload' | 'scenarioA' | 'scenarioB' | 'scenarioC'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [activeFileName, setActiveFileName] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [activeStageMessage, setActiveStageMessage] = useState<string>('');
  const [progressPct, setProgressPct] = useState<number>(0);
  const [showLLMModal, setShowLLMModal] = useState<boolean>(false);
  const [llmConfig, setLLMConfig] = useState<any>(null);
  const [selectedKPI, setSelectedKPI] = useState<string>('Revenue');
  const [kpis, setKpis] = useState<any[]>([]);

  useEffect(() => {
    fetchKPIs().then(setKpis).catch(() => {});
    fetchLLMConfig().then(setLLMConfig).catch(() => {});
  }, []);

  // Handle direct 1-click file upload and analysis
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setActiveFileName(file.name);
    setProgressPct(10);
    setActiveStageMessage('Parsing CSV schema & data rows...');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const rawContent = e.target?.result as string;

        setProgressPct(35);
        setActiveStageMessage('Detecting anomaly deviation & Z-scores (Holt-Winters)...');

        setTimeout(() => {
          setProgressPct(60);
          setActiveStageMessage('Decomposing variance across multi-dimensional loss shares...');
        }, 300);

        setTimeout(() => {
          setProgressPct(85);
          setActiveStageMessage('Synthesizing LLM Root Cause Story & Prioritized Action Plan...');
        }, 700);

        const res = await runAnalysis({
          filename: file.name,
          rawContent,
          kpi: selectedKPI
        });

        setTimeout(() => {
          setProgressPct(100);
          setActiveStageMessage('Analysis Complete!');
          setAnalysisResult(res);
          setIsUploading(false);
        }, 1100);
      };
      reader.readAsText(file);
    } catch (err) {
      console.error('Upload failed:', err);
      setIsUploading(false);
      setActiveStageMessage('Analysis failed. Please check file format.');
    }
  };

  // Handle scenario runs
  const handleRunScenario = async (scenarioKey: 'scenarioA' | 'scenarioB' | 'scenarioC') => {
    setIsUploading(true);
    const scenarioName = scenarioKey === 'scenarioA' ? 'Scenario A (High Confidence)' : scenarioKey === 'scenarioB' ? 'Scenario B (Abstention Guardrail)' : 'Scenario C (Sparse History)';
    setActiveFileName(scenarioName);
    setProgressPct(20);
    setActiveStageMessage(`Executing 17-stage intelligence pipeline on ${scenarioName}...`);

    setTimeout(() => {
      setProgressPct(60);
      setActiveStageMessage('Evaluating evidence & chronological precedence...');
    }, 300);

    setTimeout(() => {
      setProgressPct(85);
      setActiveStageMessage('Generating grounded persona narratives & recommendations...');
    }, 600);

    try {
      const res = await runAnalysis({
        datasetId: scenarioKey === 'scenarioB' ? 'low_confidence.csv' : scenarioKey === 'scenarioC' ? 'new_product.csv' : 'sales.csv',
        kpi: selectedKPI,
        scenarioKey: scenarioKey === 'scenarioB' ? 'ambiguous-revenue' : scenarioKey === 'scenarioC' ? 'sparse-history' : 'cloudflow-aug-2026'
      });

      setTimeout(() => {
        setProgressPct(100);
        setAnalysisResult(res);
        setIsUploading(false);
      }, 950);
    } catch (err) {
      console.error('Scenario run failed:', err);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-3.5 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-xs">
            <Activity size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">MarketTrace AI</h1>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200 font-mono">
                KPI Intelligence-to-Action Engine
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Deterministic Root-Cause Analysis + External LLM Grounded Narrative Synthesis
            </p>
          </div>
        </div>

        {/* Right Tools: LLM Settings & Dashboard */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLLMModal(true)}
            className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Cpu size={14} className="text-indigo-600" />
            <span>LLM: {llmConfig?.provider?.toUpperCase() || 'GEMINI'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors"
          >
            Enterprise Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        {/* Methodology Banner */}
        <MethodologyBanner />

        {/* MODE & SCENARIO SELECTOR */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud size={18} className="text-indigo-600" />
              <span>Select Input Mode or Upload Dataset</span>
            </h2>
            {analysisResult && (
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setActiveFileName('');
                }}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                + Run Another Dataset
              </button>
            )}
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button
              onClick={() => setActiveTab('upload')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                activeTab === 'upload'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <UploadCloud size={18} className={activeTab === 'upload' ? 'text-white' : 'text-indigo-600'} />
              <div>
                <div className="text-xs font-extrabold">Upload Custom CSV</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === 'upload' ? 'text-indigo-100' : 'text-slate-500'}`}>
                  Drop any business CSV dataset
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('scenarioA');
                handleRunScenario('scenarioA');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                activeTab === 'scenarioA'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <Layers size={18} className={activeTab === 'scenarioA' ? 'text-white' : 'text-emerald-600'} />
              <div>
                <div className="text-xs font-extrabold">Scenario A (High Conf)</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === 'scenarioA' ? 'text-indigo-100' : 'text-slate-500'}`}>
                  Multi-Factor Root Cause (87% Conf)
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('scenarioB');
                handleRunScenario('scenarioB');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                activeTab === 'scenarioB'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <Scale size={18} className={activeTab === 'scenarioB' ? 'text-white' : 'text-amber-600'} />
              <div>
                <div className="text-xs font-extrabold">Scenario B (Abstain)</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === 'scenarioB' ? 'text-indigo-100' : 'text-slate-500'}`}>
                  Uncertainty Guardrail (52% Conf)
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('scenarioC');
                handleRunScenario('scenarioC');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                activeTab === 'scenarioC'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <Clock size={18} className={activeTab === 'scenarioC' ? 'text-white' : 'text-blue-600'} />
              <div>
                <div className="text-xs font-extrabold">Scenario C (Sparse)</div>
                <div className={`text-[11px] mt-0.5 ${activeTab === 'scenarioC' ? 'text-indigo-100' : 'text-slate-500'}`}>
                  18-Day History Launch Cohort
                </div>
              </div>
            </button>
          </div>

          {/* Drag and Drop Zone for Custom Upload */}
          {activeTab === 'upload' && !analysisResult && (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
              }}
              className={`border-2 border-dashed rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all shadow-xs flex flex-col items-center justify-center space-y-4 ${
                isUploading
                  ? 'bg-indigo-50/50 border-indigo-400'
                  : 'bg-white border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
              />

              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-xs">
                {isUploading ? (
                  <RefreshCw className="animate-spin text-indigo-600" size={32} />
                ) : (
                  <UploadCloud size={32} />
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isUploading
                    ? `Analyzing ${activeFileName}...`
                    : 'Drop your CSV file here, or click to browse'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
                  {isUploading
                    ? activeStageMessage
                    : 'Select any CSV file. MarketTrace will auto-detect metrics, dates, and dimensions, run deterministic root cause isolation, and synthesize AI recommendations.'}
                </p>
              </div>

              {/* Live Progress Bar when uploading */}
              {isUploading && (
                <div className="w-full max-w-md space-y-1.5 pt-2">
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>{activeStageMessage}</span>
                    <span>{progressPct}%</span>
                  </div>
                </div>
              )}

              {!isUploading && (
                <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 font-medium pt-2">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-mono">Supported: .csv, .json, .txt</span>
                  <span>•</span>
                  <span>Auto-detected grain & dimensions</span>
                  <span>•</span>
                  <span>Grounded LLM synthesis</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ANALYSIS OUTPUT VIEW */}
        {analysisResult && !isUploading && (
          <div className="space-y-6 animate-in slide-in-from-bottom-3 duration-300">
            <StepByStepAnalysisView
              analysis={analysisResult}
              onOpenLLMSettings={() => setShowLLMModal(true)}
              onNavigateToFullWorkspace={() => navigate(`/investigation/${analysisResult.analysisId || analysisResult.id}`)}
            />
          </div>
        )}
      </main>

      {/* LLM Configuration Modal */}
      <LLMConfigModal
        isOpen={showLLMModal}
        onClose={() => setShowLLMModal(false)}
        onConfigSaved={(cfg) => {
          setLLMConfig(cfg);
        }}
      />
    </div>
  );
}
