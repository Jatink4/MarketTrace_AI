import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LEARNING_LOOP_STATS } from '../data/governanceData';
import { Card } from '../components/common/Card';
import {
  MessageSquareDiff,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  TrendingUp,
  Brain,
  ShieldCheck,
  History,
  Info,
  ArrowLeft
} from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Analyst Feedback & Learning Loop</h1>
            <p className="text-xs text-slate-500">
              Continuous calibration of hypothesis weights and anomaly thresholds based on human analyst corrections.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-xl">
          Active Learning Loop
        </span>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Total Analyst Corrections</span>
            <p className="text-2xl font-extrabold text-gray-950 font-mono">
              {LEARNING_LOOP_STATS.totalAnalystCorrections}
            </p>
            <span className="text-[11px] text-indigo-600 font-medium">Logged & Calibrated</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Accepted Hypotheses</span>
            <p className="text-2xl font-extrabold text-emerald-600 font-mono">
              {LEARNING_LOOP_STATS.acceptedHypothesesPct}%
            </p>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> High Human Agreement
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Rejected Explanations</span>
            <p className="text-2xl font-extrabold text-rose-600 font-mono">
              {LEARNING_LOOP_STATS.rejectedHypothesesPct}%
            </p>
            <span className="text-[11px] text-gray-500">Recalibrated Weights</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Engine Abstentions</span>
            <p className="text-2xl font-extrabold text-amber-600 font-mono">
              {LEARNING_LOOP_STATS.abstainedPct}%
            </p>
            <span className="text-[11px] text-amber-700 font-medium">Ambiguity Guardrails</span>
          </div>
        </div>

        {/* Top Learning Callout Banner */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl shadow-md space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Top Model Calibration Finding
            </span>
          </div>
          <p className="text-sm font-bold text-white leading-relaxed">
            "{LEARNING_LOOP_STATS.topLearningInsight}"
          </p>
          <p className="text-xs text-gray-300">
            Analyst feedback consistently indicated that initial sales rep reports blame external competitor price-drops, whereas technical telemetry proves that internal integration friction triggers 74% of deal stalls.
          </p>
        </div>

        {/* Learning Precision Trend & Recent Feedback Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Precision Trend */}
          <Card
            title="Empirical Evaluation Trend"
            subtitle="Model precision improvement over trailing 4 fiscal months"
            badge={
              <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                76% → 84% Precision
              </span>
            }
          >
            <div className="space-y-4">
              <div className="space-y-3">
                {LEARNING_LOOP_STATS.evaluationTrend.map((t, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-700">{t.period}</span>
                      <span className="font-mono text-indigo-700">{t.precisionScore}% Alignment</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${t.precisionScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Methodology Disclaimer:</strong> This represents analyst feedback evaluation. Adjustments occur via governed heuristic weight recalibration.
                </span>
              </div>
            </div>
          </Card>

          {/* Recent Audit Submissions */}
          <Card
            title="Recent Analyst Correction Logs"
            subtitle="Verified feedback submissions by enterprise analytics leads"
          >
            <div className="space-y-3">
              {LEARNING_LOOP_STATS.recentFeedbackHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 border border-gray-200 rounded-xl space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-gray-200/60 pb-1">
                    <span className="font-bold text-gray-900">{item.analyst}</span>
                    <span className="font-mono text-[10px] text-gray-400">{item.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold font-mono text-[10px]">
                      {item.isUseful}
                    </span>
                    <span className="font-semibold text-gray-800">{item.selectedRootCause}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 italic">"{item.comment}"</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
