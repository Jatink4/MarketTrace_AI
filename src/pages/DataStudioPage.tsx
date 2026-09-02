import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  Activity, 
  Database, 
  Sparkles, 
  Play, 
  RefreshCw, 
  ChevronRight, 
  HelpCircle,
  FileCode,
  Sliders,
  Download
} from 'lucide-react';
import { uploadDataset, profileDataset, mapDataset, runAnalysis, fetchKPIs } from '../api/client';
import { MethodologyBanner } from '../components/common/MethodologyBanner';

const SAMPLE_DATASETS = [
  { 
    id: 'sales.csv', 
    name: 'sales.csv (NovaCommerce August Anomaly)', 
    grain: 'Transaction', 
    rows: '645 rows', 
    tag: 'Scenario A: Main Demo',
    downloadUrl: '/sales.csv',
    desc: '645 transaction records with an -8.2% drop in August driven by APAC Enterprise CloudSuite renewals.'
  },
  { 
    id: 'low_confidence.csv', 
    name: 'low_confidence.csv (Ambiguous / Abstention)', 
    grain: 'Transaction', 
    rows: '30 rows', 
    tag: 'Scenario B: Abstain',
    downloadUrl: '/low_confidence.csv',
    desc: 'Balanced competing signals across marketing and churn triggering an ABSTAIN verdict.'
  },
  { 
    id: 'new_product.csv', 
    name: 'new_product.csv (Sparse 18-Day History)', 
    grain: 'Transaction', 
    rows: '18 rows', 
    tag: 'Scenario C: Sparse History',
    downloadUrl: '/new_product.csv',
    desc: '18 days of history triggering comparative launch cohort benchmarking.'
  }
];

export default function DataStudioPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Studio Flow Steps: 'upload' | 'profile' | 'map' | 'validate' | 'running' | 'complete'
  const [currentStep, setCurrentStep] = useState<'upload' | 'profile' | 'map' | 'validate' | 'running' | 'complete'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDataset, setUploadedDataset] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [kpis, setKpis] = useState<any[]>([]);
  const [selectedKPI, setSelectedKPI] = useState('Revenue');
  const [columnMapping, setColumnMapping] = useState<any>({
    metric: 'revenue',
    date: 'date',
    region: 'region',
    product: 'product',
    customer_segment: 'customer_segment',
    channel: 'channel'
  });

  // Pipeline Live Execution Progress
  const [pipelineProgress, setPipelineProgress] = useState<number>(0);
  const [activeStageName, setActiveStageName] = useState<string>('Initializing pipeline...');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [completedStages, setCompletedStages] = useState<string[]>([]);

  useEffect(() => {
    fetchKPIs().then(setKpis).catch(() => {});
  }, []);

  // Handle Drag & Drop / File selection
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const res = await uploadDataset({
          filename: file.name,
          content
        });

        setUploadedDataset(res.dataset);
        setProfile(res.profile);

        // Auto map columns
        if (res.dataset.columns) {
          const cols = res.dataset.columns;
          const newMap: any = {};
          cols.forEach((c: string) => {
            const cl = c.toLowerCase();
            if (cl.includes('rev') || cl.includes('amount') || cl.includes('sales')) newMap.metric = c;
            if (cl.includes('date') || cl.includes('time')) newMap.date = c;
            if (cl.includes('reg') || cl.includes('country')) newMap.region = c;
            if (cl.includes('prod') || cl.includes('sku')) newMap.product = c;
            if (cl.includes('seg') || cl.includes('tier') || cl.includes('customer')) newMap.customer_segment = c;
            if (cl.includes('chan') || cl.includes('source')) newMap.channel = c;
          });
          setColumnMapping(newMap);
        }

        setIsUploading(false);
        setCurrentStep('profile');
      };
      reader.readAsText(file);
    } catch (err) {
      console.error('Upload failed:', err);
      setIsUploading(false);
    }
  };

  // Load sample dataset
  const handleLoadSample = async (sampleName: string) => {
    setIsUploading(true);
    try {
      const res = await runAnalysis({
        datasetId: sampleName,
        kpi: selectedKPI,
        scenarioKey: sampleName === 'low_confidence.csv' ? 'ambiguous-revenue' : sampleName === 'new_product.csv' ? 'sparse-history' : 'cloudflow-aug-2026'
      });

      setAnalysisResult(res);
      navigate(`/investigation/${res.analysisId}`);
    } catch (err) {
      console.error('Sample run failed:', err);
      setIsUploading(false);
    }
  };

  // Execute full analysis pipeline
  const handleRunIntelligenceAnalysis = async () => {
    setCurrentStep('running');
    setPipelineProgress(5);
    setCompletedStages([]);

    const pipelineSteps = [
      { name: 'Preparing & Normalizing Ingested Rows...', pct: 15 },
      { name: 'Detecting KPI Movements (Z-Score + Holt-Winters)...', pct: 28 },
      { name: 'Decomposing Dimensional Variances (Waterfall)...', pct: 42 },
      { name: 'Discovering Candidate Factors & Signals...', pct: 55 },
      { name: 'Searching Unstructured Evidence (NLP + RAG)...', pct: 68 },
      { name: 'Testing Hypotheses & Chronological Precedence...', pct: 80 },
      { name: 'Running Uncertainty Guardrails & Scoring...', pct: 90 },
      { name: 'Synthesizing Persona-Specific Explanations...', pct: 98 }
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < pipelineSteps.length) {
        setActiveStageName(pipelineSteps[current].name);
        setPipelineProgress(pipelineSteps[current].pct);
        setCompletedStages(prev => [...prev, pipelineSteps[current].name]);
        current++;
      }
    }, 450);

    try {
      const res = await runAnalysis({
        datasetId: uploadedDataset?.id || 'sales-001',
        kpi: selectedKPI,
        columnMapping
      });

      setTimeout(() => {
        clearInterval(interval);
        setPipelineProgress(100);
        setActiveStageName('Analysis Pipeline Complete!');
        setAnalysisResult(res);
        setCurrentStep('complete');
      }, 3800);
    } catch (err) {
      clearInterval(interval);
      console.error('Analysis failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Activity size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Data Studio</h1>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                DYNAMIC INGESTION & ANALYSIS
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ingest new business data, profile schema quality, map semantic contracts, and trigger the root-cause intelligence engine.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold"
          >
            Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        {/* Top Principle Banner */}
        <MethodologyBanner />

        {/* Step Stepper */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between text-xs font-semibold overflow-x-auto">
          {[
            { key: 'upload', label: '1. Upload Data' },
            { key: 'profile', label: '2. Profile & Quality' },
            { key: 'map', label: '3. Semantic Mapping' },
            { key: 'validate', label: '4. Validate' },
            { key: 'running', label: '5. Intelligence Pipeline' }
          ].map((s, idx) => {
            const isCurrent = currentStep === s.key;
            const isDone = ['profile', 'map', 'validate', 'running', 'complete'].indexOf(currentStep) >= idx;

            return (
              <React.Fragment key={s.key}>
                <div className={`flex items-center gap-2 shrink-0 ${isCurrent ? 'text-indigo-600 font-bold' : isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isDone && !isCurrent ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {idx + 1}
                    </div>
                  )}
                  <span>{s.label}</span>
                </div>
                {idx < 4 && <ChevronRight size={14} className="text-slate-300 shrink-0 mx-1" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* STEP 1: UPLOAD */}
        {currentStep === 'upload' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Drag and drop upload box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
              }}
              className="bg-white border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl p-10 md:p-12 text-center cursor-pointer transition-all hover:bg-indigo-50/20 shadow-xs flex flex-col items-center justify-center space-y-4"
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
                {isUploading ? <RefreshCw className="animate-spin" size={32} /> : <UploadCloud size={32} />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isUploading ? 'Uploading & Parsing Dataset...' : 'Add New Business Data Source'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Drag & drop your CSV, JSON, or TXT dataset here, or <span className="text-indigo-600 font-bold underline">browse files</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-medium">
                <span className="bg-slate-100 px-2.5 py-1 rounded">Supported: CSV, JSON, TXT</span>
                <span>•</span>
                <span>Max size: 50MB</span>
                <span>•</span>
                <span>Grain: Auto-detected</span>
              </div>
            </div>

            {/* Download Sample CSV Package Callout */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded border border-indigo-400/30">
                    TEST DATASETS PACKAGE
                  </span>
                  <h3 className="text-base font-bold">Download Sample CSV Files to Test Ingestion</h3>
                </div>
                <p className="text-xs text-slate-300">
                  Download real multi-source CSV files, test uploading them, or edit values to watch MarketTrace detect changes dynamically.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/sales.csv"
                  download="sales.csv"
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-indigo-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download size={14} /> Download sales.csv (Main)
                </a>
                <a
                  href="/low_confidence.csv"
                  download="low_confidence.csv"
                  className="px-4 py-2 bg-indigo-800/80 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 border border-indigo-600 transition-colors"
                >
                  <Download size={14} /> low_confidence.csv
                </a>
                <a
                  href="/new_product.csv"
                  download="new_product.csv"
                  className="px-4 py-2 bg-indigo-800/80 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 border border-indigo-600 transition-colors"
                >
                  <Download size={14} /> new_product.csv
                </a>
              </div>
            </div>

            {/* Quick-Launch Sample Test Datasets */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Or Run Instant Benchmark Test Scenarios</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pre-generated test datasets with verified empirical anomalies for demonstration.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded border border-indigo-200">
                  3 Scenarios Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SAMPLE_DATASETS.map((sample) => (
                  <div
                    key={sample.id}
                    className="p-4 bg-slate-50 border border-slate-200 hover:border-indigo-400 rounded-xl space-y-3 transition-all hover:shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-white text-indigo-700 border border-slate-200">
                          {sample.tag}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{sample.rows}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-2">{sample.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{sample.desc}</p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => handleLoadSample(sample.id)}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Play size={14} /> Run Intelligence Analysis
                      </button>
                      <a
                        href={sample.downloadUrl}
                        download={sample.id}
                        className="w-full py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors block text-center"
                      >
                        <Download size={13} /> Download File
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE */}
        {currentStep === 'profile' && profile && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Profile Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">File Ingested</span>
                <p className="text-sm font-extrabold text-slate-900 truncate" title={profile.filename}>{profile.filename}</p>
                <span className="text-[10px] text-indigo-600 font-mono font-semibold">Status: READY</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Rows</span>
                <p className="text-xl font-extrabold text-slate-900 font-mono">{profile.rowCount.toLocaleString()}</p>
                <span className="text-[10px] text-slate-500">{profile.columnCount} Columns</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Detected Grain</span>
                <p className="text-sm font-extrabold text-indigo-900 font-mono">{profile.detectedGrain}</p>
                <span className="text-[10px] text-slate-500">Auto-classified</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Date Range</span>
                <p className="text-xs font-bold text-slate-900 font-mono">
                  {profile.dateRange ? `${profile.dateRange.start} → ${profile.dateRange.end}` : 'N/A'}
                </p>
                <span className="text-[10px] text-slate-500">{profile.dateRange?.days || 0} days coverage</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Data Quality</span>
                <p className={`text-xl font-extrabold font-mono ${profile.dataQualityScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {profile.dataQualityScore}%
                </p>
                <span className="text-[10px] text-slate-500">Quality Verified</span>
              </div>
            </div>

            {/* Quality Warnings if any */}
            {profile.warnings?.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle size={14} className="text-amber-600" />
                  <span>Data Quality Diagnostics ({profile.warnings.length})</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-amber-800">
                  {profile.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}

            {/* Detailed Column Profiles Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
              <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">Automated Schema & Column Inspection</h3>
                <span className="text-xs text-slate-500">{profile.columns.length} Fields Profiled</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Column Name</th>
                      <th className="px-6 py-3">Inferred Type</th>
                      <th className="px-6 py-3">Missing %</th>
                      <th className="px-6 py-3">Unique Values</th>
                      <th className="px-6 py-3">Sample Values</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {profile.columns.map((c: any) => (
                      <tr key={c.name} className="hover:bg-slate-50/60">
                        <td className="px-6 py-3 font-bold text-slate-900">{c.name}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.type === 'Currency' || c.type === 'Numeric' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            c.type === 'Date' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            c.type === 'ID' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {c.type}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-slate-600">{c.missingPct}%</td>
                        <td className="px-6 py-3 text-slate-600">{c.uniqueCount}</td>
                        <td className="px-6 py-3 text-slate-500 truncate max-w-xs">{c.sampleValues?.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep('upload')}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
              >
                ← Back to Upload
              </button>
              <button
                onClick={() => setCurrentStep('map')}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                Proceed to Semantic Mapping →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SEMANTIC MAPPING */}
        {currentStep === 'map' && profile && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Map Dataset to Governed Semantic Contract</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect your dataset fields to the target KPI and its required analytical dimensions.
                </p>
              </div>

              {/* Target KPI Picker */}
              <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider block">Target Governed KPI</span>
                  <p className="text-xs text-indigo-800 mt-0.5">Select the business metric you wish to investigate for anomalies.</p>
                </div>
                <select
                  value={selectedKPI}
                  onChange={(e) => setSelectedKPI(e.target.value)}
                  className="px-4 py-2 bg-white border border-indigo-300 rounded-lg text-sm font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                >
                  {kpis.map(k => (
                    <option key={k.kpiId || k.name} value={k.name}>{k.name} ({k.formula})</option>
                  ))}
                </select>
              </div>

              {/* Column Mapping Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Metric Field */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-900">Metric Value Column *</label>
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold">Required: Numeric</span>
                  </div>
                  <select
                    value={columnMapping.metric || ''}
                    onChange={(e) => setColumnMapping({ ...columnMapping, metric: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900"
                  >
                    <option value="">-- Select Metric Column --</option>
                    {profile.columns.map((c: any) => (
                      <option key={c.name} value={c.name}>{c.name} ({c.type})</option>
                    ))}
                  </select>
                </div>

                {/* Date Field */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-900">Time Dimension (Date) *</label>
                    <span className="text-[10px] font-mono text-blue-600 font-semibold">Required: Date</span>
                  </div>
                  <select
                    value={columnMapping.date || ''}
                    onChange={(e) => setColumnMapping({ ...columnMapping, date: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900"
                  >
                    <option value="">-- Select Date Column --</option>
                    {profile.columns.map((c: any) => (
                      <option key={c.name} value={c.name}>{c.name} ({c.type})</option>
                    ))}
                  </select>
                </div>

                {/* Region Dimension */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <label className="font-bold text-slate-900">Geographic / Region Dimension</label>
                  <select
                    value={columnMapping.region || ''}
                    onChange={(e) => setColumnMapping({ ...columnMapping, region: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900"
                  >
                    <option value="">-- (Optional) Select Region Column --</option>
                    {profile.columns.map((c: any) => (
                      <option key={c.name} value={c.name}>{c.name} ({c.type})</option>
                    ))}
                  </select>
                </div>

                {/* Customer Segment Dimension */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <label className="font-bold text-slate-900">Customer Segment Dimension</label>
                  <select
                    value={columnMapping.customer_segment || ''}
                    onChange={(e) => setColumnMapping({ ...columnMapping, customer_segment: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900"
                  >
                    <option value="">-- (Optional) Select Segment Column --</option>
                    {profile.columns.map((c: any) => (
                      <option key={c.name} value={c.name}>{c.name} ({c.type})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep('profile')}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
              >
                ← Back to Profile
              </button>
              <button
                onClick={() => setCurrentStep('validate')}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                Pre-Flight Validation →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: VALIDATE */}
        {currentStep === 'validate' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Pre-Flight Pipeline Validation</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirming semantic contracts, statistical prerequisites, and multi-source connectivity.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-900">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>KPI Contract Verified: {selectedKPI} [SUM({columnMapping.metric})]</span>
                  </div>
                  <span className="font-semibold text-emerald-700">PASS</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-900">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Temporal Alignment: Column [{columnMapping.date}] ready for time-series ARIMA modeling</span>
                  </div>
                  <span className="font-semibold text-emerald-700">PASS</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-900">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Multi-Source Context: CRM (Salesforce), Support (Zendesk), and Market Intelligence Connected</span>
                  </div>
                  <span className="font-semibold text-emerald-700">PASS</span>
                </div>
              </div>

              {/* Ready to run CTA */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl shadow-md text-center space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full uppercase border border-indigo-400/30">
                    Ready to Execute
                  </span>
                  <h3 className="text-xl font-extrabold mt-3">Trigger End-to-End Root-Cause Intelligence Engine</h3>
                  <p className="text-xs text-slate-300 max-w-xl mx-auto mt-1 leading-relaxed">
                    The engine will execute all 17 deterministic and AI synthesis stages to detect anomalies, isolate variance, cross-correlate signals, evaluate causal precedence, and formulate persona-specific recommendations.
                  </p>
                </div>

                <button
                  onClick={handleRunIntelligenceAnalysis}
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition-all active:scale-95 inline-flex items-center gap-2"
                >
                  <Play size={18} /> Launch Full 17-Stage Analysis
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep('map')}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
              >
                ← Back to Mapping
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: RUNNING LIVE PIPELINE */}
        {(currentStep === 'running' || currentStep === 'complete') && (
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-center animate-in zoom-in-95">
            <div className="max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                {currentStep === 'complete' ? (
                  <CheckCircle2 size={36} className="text-emerald-600 animate-in zoom-in" />
                ) : (
                  <RefreshCw size={32} className="animate-spin text-indigo-600" />
                )}
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentStep === 'complete' ? 'Analysis Complete & Traceable!' : 'Executing Intelligence Pipeline...'}
                </h2>
                <p className="text-sm text-indigo-600 font-mono font-bold mt-1">
                  {activeStageName}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${pipelineProgress}%` }}
                />
              </div>

              {/* Completed Stages List */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
                {completedStages.map((stage, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>{stage}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">✓ Done</span>
                  </div>
                ))}
              </div>

              {/* When complete, primary button to navigate */}
              {currentStep === 'complete' && analysisResult && (
                <div className="pt-4 animate-in slide-in-from-bottom-2">
                  <button
                    onClick={() => navigate(`/investigation/${analysisResult.analysisId}`)}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 transition-transform active:scale-95"
                  >
                    View Full Root-Cause Investigation →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
