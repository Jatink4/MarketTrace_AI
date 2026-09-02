import React from 'react';
import {
  LayoutDashboard,
  SearchCode,
  Gauge,
  Database,
  ListTodo,
  MessageSquareDiff,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Persona } from '../../types';

export type NavTab =
  | 'overview'
  | 'investigations'
  | 'kpi-explorer'
  | 'evidence'
  | 'actions'
  | 'feedback'
  | 'governance'
  | 'system-health';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentPersona: Persona;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentPersona
}) => {
  const navItems: Array<{
    id: NavTab;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'investigations',
      label: 'Investigations',
      icon: SearchCode,
      badge: 'Active',
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    { id: 'kpi-explorer', label: 'KPI Explorer', icon: Gauge, badge: '5 Governed' },
    { id: 'evidence', label: 'Evidence', icon: Database, badge: '5 Sources' },
    { id: 'actions', label: 'Actions', icon: ListTodo, badge: 'Governed' },
    { id: 'feedback', label: 'Feedback & Learning', icon: MessageSquareDiff },
    { id: 'governance', label: 'Governance & Security', icon: ShieldAlert },
    { id: 'system-health', label: 'System Health', icon: Activity, badge: '2.8s' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200/90 flex flex-col justify-between flex-shrink-0 h-[calc(100vh-80px)] sticky top-[80px]">
      {/* Navigation Links */}
      <div className="p-4 space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Navigation
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80 shadow-xs'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                      item.badgeColor || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Workflow Transformation Summary Widget */}
        <div className="mt-6 p-3 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-xl border border-indigo-100 text-[11px] text-gray-600 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-gray-900">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Root-Cause Workflow</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            <strong>KPI</strong> → Materiality → Context → Drivers → Evidence → Root Cause → Narrative → Action → Feedback
          </p>
        </div>
      </div>

      {/* Bottom Sidebar: Data Status & User Info */}
      <div className="p-4 border-t border-gray-200/90 bg-gray-50/50 space-y-3">
        {/* Data Status */}
        <div className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-gray-200 shadow-2xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1 animate-pulse" />
          <div className="text-left">
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-bold text-gray-900">Data Status</p>
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            </div>
            <p className="text-[10px] text-gray-500 font-medium">
              All prototype sources available (5/5 connected)
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-900 text-white font-bold text-xs flex items-center justify-center">
            AM
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-xs font-bold text-gray-900 truncate">Alex Morgan</p>
            <p className="text-[10px] text-gray-500 truncate">Strategy & Analytics</p>
            <p className="text-[9px] font-mono text-indigo-600 font-semibold uppercase">Role: {currentPersona}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
