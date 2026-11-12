import React from 'react';
import { Menu, Plus, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NavItemKey } from '../../types';

interface HeaderProps {
  currentTab: NavItemKey;
  onOpenMobileMenu: () => void;
  onNewAction?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobileMenu,
  onNewAction,
}) => {
  const { workspace, user } = useAuth();

  const getTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Business Dashboard';
      case 'invoices':
        return 'Invoices & GST Billing';
      case 'customers':
        return 'Customer Directory & Udhaar';
      case 'payments':
        return 'Payment Tracking & UPI';
      case 'ai-desk':
        return 'AI Business Records Desk';
      case 'records':
        return 'Business Records & Storage';
      case 'settings':
        return 'Workspace & Supabase Setup';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur-sm">
      {/* Left side: Hamburger toggle for mobile & title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open mobile navigation menu"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {getTitle()}
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span>{workspace?.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="h-3 w-3" />
              Verified Workspace
            </span>
          </div>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onNewAction && (
          <button
            type="button"
            onClick={onNewAction}
            className="flex items-center gap-1.5 rounded-lg bg-[#005bf8] hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Transaction</span>
            <span className="sm:hidden">New</span>
          </button>
        )}

        {/* User avatar indicator */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-[#005bf8] font-bold text-xs"
            title={user?.email}
          >
            <UserIcon className="h-4 w-4" />
          </div>
          <div className="hidden md:block text-left text-xs">
            <p className="font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
              {workspace?.name}
            </p>
            <p className="text-[10px] text-slate-500 truncate max-w-[120px]">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
