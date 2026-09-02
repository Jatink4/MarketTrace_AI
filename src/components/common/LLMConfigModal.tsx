import React, { useState, useEffect } from 'react';
import { Sparkles, Key, CheckCircle2, AlertCircle, RefreshCw, X, Shield, ExternalLink, Cpu } from 'lucide-react';
import { fetchLLMConfig, saveLLMConfig, testLLMConnection } from '../../api/client';

interface LLMConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved?: (config: any) => void;
}

export const LLMConfigModal: React.FC<LLMConfigModalProps> = ({ isOpen, onClose, onConfigSaved }) => {
  const [provider, setProvider] = useState<string>('gemini');
  const [apiKey, setApiKey] = useState<string>('');
  const [model, setModel] = useState<string>('gemini-2.5-flash');
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [currentConfig, setCurrentConfig] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchLLMConfig()
        .then((cfg) => {
          setCurrentConfig(cfg);
          if (cfg.provider) setProvider(cfg.provider);
          if (cfg.geminiModel && cfg.provider === 'gemini') setModel(cfg.geminiModel);
          if (cfg.openaiModel && cfg.provider === 'openai') setModel(cfg.openaiModel);
          if (cfg.groqModel && cfg.provider === 'groq') setModel(cfg.groqModel);
          if (cfg.customModel && cfg.provider === 'custom') setModel(cfg.customModel);
          if (cfg.customBaseUrl) setBaseUrl(cfg.customBaseUrl);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProviderChange = (newProvider: string) => {
    setProvider(newProvider);
    setTestResult(null);
    if (newProvider === 'gemini') setModel('gemini-2.5-flash');
    else if (newProvider === 'openai') setModel('gpt-4o-mini');
    else if (newProvider === 'groq') setModel('llama-3.3-70b-versatile');
    else if (newProvider === 'custom') setModel('gpt-4o-mini');
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testLLMConnection({
        provider,
        apiKey: apiKey.trim(),
        model,
        baseUrl: baseUrl.trim()
      });
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.response?.data?.message || err.message || 'Connection test failed'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload: any = { provider };
      if (provider === 'gemini') {
        if (apiKey.trim()) payload.geminiApiKey = apiKey.trim();
        payload.geminiModel = model;
      } else if (provider === 'openai') {
        if (apiKey.trim()) payload.openaiApiKey = apiKey.trim();
        payload.openaiModel = model;
      } else if (provider === 'groq') {
        if (apiKey.trim()) payload.groqApiKey = apiKey.trim();
        payload.groqModel = model;
      } else if (provider === 'custom') {
        if (apiKey.trim()) payload.customApiKey = apiKey.trim();
        payload.customModel = model;
        payload.customBaseUrl = baseUrl.trim();
      }

      const res = await saveLLMConfig(payload);
      if (onConfigSaved) onConfigSaved(res.data);
      onClose();
    } catch (err) {
      console.error('Failed to save LLM config:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-400/30 text-indigo-300">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base">External LLM Engine Settings</h3>
              <p className="text-xs text-slate-300">Configure AI model provider for live root cause analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 font-sans text-xs">
          {/* Provider Selection */}
          <div>
            <label className="font-bold text-slate-800 block mb-2 text-xs uppercase tracking-wider">
              Select AI Model Provider
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'gemini', name: 'Google Gemini', tag: 'Fast & Smart', desc: 'gemini-2.5-flash' },
                { id: 'openai', name: 'OpenAI', tag: 'GPT-4o', desc: 'gpt-4o-mini' },
                { id: 'groq', name: 'Groq', tag: 'Ultra-Fast', desc: 'llama-3.3-70b' },
                { id: 'deterministic', name: 'Grounded AI', tag: 'Offline Mode', desc: 'Deterministic' }
              ].map((p) => {
                const isSelected = provider === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleProviderChange(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>{p.name}</span>
                      {isSelected && <CheckCircle2 size={14} className="text-indigo-600 shrink-0" />}
                    </div>
                    <span className="text-[10px] text-indigo-600 font-mono font-medium block">{p.tag}</span>
                    <span className="text-[10px] text-slate-400 truncate block mt-0.5">{p.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Selection & API Key Inputs */}
          {provider !== 'deterministic' ? (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              {/* API Key Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Key size={14} className="text-slate-400" />
                    <span>{provider.toUpperCase()} API Key</span>
                  </label>
                  {provider === 'gemini' && (
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1 text-[11px] font-semibold"
                    >
                      Get Free Gemini Key <ExternalLink size={11} />
                    </a>
                  )}
                  {provider === 'openai' && (
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1 text-[11px] font-semibold"
                    >
                      OpenAI Keys <ExternalLink size={11} />
                    </a>
                  )}
                  {provider === 'groq' && (
                    <a
                      href="https://console.groq.com/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1 text-[11px] font-semibold"
                    >
                      Groq Console <ExternalLink size={11} />
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={
                    provider === 'gemini' ? 'AIzaSy...' :
                    provider === 'openai' ? 'sk-...' :
                    provider === 'groq' ? 'gsk_...' : 'Enter your API key...'
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Shield size={12} className="text-emerald-600" />
                  <span>Your API key is used strictly for root-cause narrative & recommendations generation.</span>
                </p>
              </div>

              {/* Model Select */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Cpu size={14} className="text-slate-400" />
                  <span>Model Selection</span>
                </label>
                {provider === 'gemini' && (
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="gemini-2.5-flash">gemini-2.5-flash (Recommended, High Speed & Precision)</option>
                    <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                    <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                    <option value="gemini-1.5-pro">gemini-1.5-pro (Deep Reasoning)</option>
                  </select>
                )}
                {provider === 'openai' && (
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="gpt-4o-mini">gpt-4o-mini (Fast & Cost-Effective)</option>
                    <option value="gpt-4o">gpt-4o (State of the Art)</option>
                  </select>
                )}
                {provider === 'groq' && (
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Fastest Inference)</option>
                    <option value="llama-3.1-8b-instant">llama-3.1-8b-instant</option>
                    <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                  </select>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Deterministic Grounded Engine Active</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uses the built-in mathematical decomposition, anomaly Z-scoring, cross-correlation precedence, and offline calibrated narrative generator.
              </p>
            </div>
          )}

          {/* Test Connection Status Banner */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle size={16} className="text-red-600 shrink-0" />
              )}
              <span className="font-medium">{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {provider !== 'deterministic' ? (
            <button
              type="button"
              onClick={handleTest}
              disabled={isTesting || !apiKey.trim()}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {isTesting ? <RefreshCw size={13} className="animate-spin" /> : <Sparkles size={13} />}
              <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
