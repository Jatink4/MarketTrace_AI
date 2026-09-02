import React from 'react';
import { MaterialityLevel } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'critical' | 'neutral' | 'indigo' | 'outline';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] font-medium',
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold'
  };

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 border border-gray-200',
    primary: 'bg-blue-50 text-blue-700 border border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    critical: 'bg-rose-50 text-rose-700 border border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    outline: 'bg-transparent text-gray-700 border border-gray-300'
  };

  return (
    <span
      className={`inline-flex items-center rounded-md transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const MaterialityBadge: React.FC<{ level: MaterialityLevel }> = ({ level }) => {
  if (level === 'HIGH') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
        HIGH MATERIALITY
      </span>
    );
  }
  if (level === 'MEDIUM') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        MEDIUM MATERIALITY
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
      LOW MATERIALITY
    </span>
  );
};

export const AnalyticalMethodBadge: React.FC<{ method: string }> = ({ method }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-300" title="Analytical calculation method">
      <svg className="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <path d="M9 14l2-4 3 4 2-2"></path>
      </svg>
      {method}
    </span>
  );
};

export const EvidenceStrengthScore: React.FC<{ score: number; max?: number }> = ({ score, max = 100 }) => {
  let color = 'bg-rose-500';
  let textColor = 'text-rose-700';
  let bgColor = 'bg-rose-50';

  if (score >= 80) {
    color = 'bg-indigo-600';
    textColor = 'text-indigo-700';
    bgColor = 'bg-indigo-50';
  } else if (score >= 60) {
    color = 'bg-blue-600';
    textColor = 'text-blue-700';
    bgColor = 'bg-blue-50';
  } else if (score >= 40) {
    color = 'bg-amber-500';
    textColor = 'text-amber-700';
    bgColor = 'bg-amber-50';
  } else {
    color = 'bg-slate-400';
    textColor = 'text-slate-600';
    bgColor = 'bg-slate-50';
  }

  return (
    <div className="flex items-center gap-2" title="Evidence strength reflects how strongly the available evidence supports the hypothesis. It is not a probability of causality.">
      <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${(score / max) * 100}%` }}
        />
      </div>
      <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${bgColor} ${textColor}`}>
        {score} / {max}
      </span>
    </div>
  );
};
