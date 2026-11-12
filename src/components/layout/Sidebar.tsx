import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  IndianRupee, 
  Sparkles, 
  FolderArchive, 
  Settings, 
  LogOut, 
  X,
  Database,
  Building2,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NavItemKey } from '../../types';

interface SidebarProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onClose,
}) => {
  const { workspace, user, logout, backendStatus } = useAuth();

  const navItems: { key: NavItemKey; label: string; icon: React.ComponentType<{ className?: string }>; tag?: string }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'invoices', label: 'Invoices', icon: FileText, tag: 'GST' },
    { key: 'customers', label: 'Customers', icon: Users },
    { key: 'payments', label: 'Payments', icon: IndianRupee },
    { key: 'ai-desk', label: 'AI Assistant', icon: Sparkles, tag: 'AI' },
    { key: 'records', label: 'Records Vault', icon: FolderArchive },
    { key: 'settings', label: 'Settings & DB', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          role="presentation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col bg-[#071329] text-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top brand header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div 
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#005bf8] text-white font-bold text-lg shadow-md select-none"
              aria-hidden="true"
            >
              ₹
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block leading-tight">
                AI Business Desk
              </span>
              <span className="text-[10px] text-blue-300 font-medium tracking-wide">
                Indian MSME Edition
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Active Workspace Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {workspace?.name || 'My Business'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {user?.email || 'Active Workspace'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1.5 px-3 py-2 overflow-y-auto" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onSelectTab(item.key);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#005bf8] text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.tag && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 text-blue-300'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Database & Cloud status indicator */}
        <div className="p-3 mx-3 mb-2 rounded-lg bg-slate-900/50 border border-white/5 text-xs">
          <div className="flex items-center justify-between text-slate-300 mb-1">
            <span className="flex items-center gap-1.5 font-medium text-[11px]">
              <Database className="h-3.5 w-3.5 text-blue-400" />
              <span>Database Sync</span>
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            {backendStatus === 'supabase_configured'
              ? 'Supabase PostgreSQL connected'
              : 'Local Session active (Supabase ready)'}
          </p>
          <button
            type="button"
            onClick={() => {
              onSelectTab('settings');
              onClose();
            }}
            className="mt-1.5 text-[10px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View configuration</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {/* Logout and user profile */}
        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white py-2 text-xs font-medium transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign out of desk</span>
          </button>
        </div>
      </aside>
    </>
  );
};
