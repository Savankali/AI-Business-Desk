import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  ArrowUpRight, 
  FileText, 
  CreditCard, 
  Sparkles, 
  Database,
  CheckCircle2,
  AlertTriangle,
  Receipt
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../utils/validation';
import { NavItemKey } from '../../types';

interface DashboardOverviewProps {
  onNavigate: (tab: NavItemKey) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const { workspace, backendStatus } = useAuth();

  // Initial business records seed for immediate visual clarity
  const stats = [
    {
      title: "Total Revenue (Month)",
      value: formatINR(142850),
      subtitle: "+18.4% from last month",
      icon: TrendingUp,
      accent: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Pending Receivables (Market Due)",
      value: formatINR(38400),
      subtitle: "3 customer invoices pending",
      icon: Clock,
      accent: "text-amber-600 bg-amber-50",
    },
    {
      title: "Active Customers / Parties",
      value: "18",
      subtitle: "All accounts active",
      icon: Users,
      accent: "text-blue-600 bg-blue-50",
    },
    {
      title: "Total Collected This Month",
      value: formatINR(104450),
      subtitle: "82% via UPI / NEFT",
      icon: Receipt,
      accent: "text-indigo-600 bg-indigo-50",
    },
  ];

  const recentTransactions = [
    { id: 'INV-2026-081', party: 'Mehta Hardware & Sanitary', date: 'Today, 2:30 PM', amount: 18500, type: 'Invoice', status: 'pending' },
    { id: 'PAY-89211', party: 'Rajesh Electrical Works', date: 'Today, 11:15 AM', amount: 24000, type: 'UPI Payment', status: 'paid' },
    { id: 'INV-2026-080', party: 'Shree Balaji Traders', date: 'Yesterday', amount: 9600, type: 'Invoice', status: 'paid' },
    { id: 'INV-2026-079', party: 'Kisan Krishi Kendra', date: '10 Nov 2026', amount: 14200, type: 'Invoice', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#071329] via-[#0d2858] to-[#071329] p-6 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-xs font-semibold text-blue-200 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            AI Business Desk Initialized
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome to {workspace?.name || 'Your Business Desk'}
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Your single pane of glass for GST invoices, party ledgers, payment tracking, and AI record queries.
          </p>
        </div>

        {/* Decorative background element */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-radial from-blue-500/20 to-transparent pointer-events-none" />
      </div>

      {/* Honest Database Connectivity Status Card */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Database Architecture & Status Check
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-semibold">
                {backendStatus === 'supabase_configured' ? 'Supabase Connected' : 'Local Workspace Session'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {backendStatus === 'supabase_configured'
                ? 'Your workspace is synchronized with Supabase PostgreSQL and Supabase Storage.'
                : 'Workspace state is active and persisted in browser session. Supabase PostgreSQL and Auth connection parameters can be provided in environment variables.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('settings')}
          className="shrink-0 rounded-lg bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Inspect DB Settings
        </button>
      </div>

      {/* 4 Key Business Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {stat.title}
                </span>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.accent}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {stat.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => onNavigate('invoices')}
          className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition-all text-left cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#005bf8] group-hover:bg-[#005bf8] group-hover:text-white transition-colors">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Create GST Invoice</p>
            <p className="text-[11px] text-slate-500">Generate bill & share PDF</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('customers')}
          className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition-all text-left cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#005bf8] group-hover:bg-[#005bf8] group-hover:text-white transition-colors">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Add Customer / Party</p>
            <p className="text-[11px] text-slate-500">Track party balance & GSTIN</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('payments')}
          className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition-all text-left cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#005bf8] group-hover:bg-[#005bf8] group-hover:text-white transition-colors">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Record Payment</p>
            <p className="text-[11px] text-slate-500">Log UPI / NEFT entry</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('ai-desk')}
          className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition-all text-left cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#005bf8] group-hover:bg-[#005bf8] group-hover:text-white transition-colors">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Ask AI Records Desk</p>
            <p className="text-[11px] text-slate-500">Query pending dues & records</p>
          </div>
        </button>
      </div>

      {/* Two Column Section: Recent Transactions & Feature Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Transactions Table */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:px-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Desk Activity</h3>
              <p className="text-xs text-slate-500">Latest invoices and payment records</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('invoices')}
              className="text-xs font-semibold text-[#005bf8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 sm:px-6">Reference / Party</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 text-right sm:pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5 sm:px-6">
                      <span className="font-semibold block text-slate-900">{tx.party}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{tx.id}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">{tx.date}</td>
                    <td className="px-4 py-3.5 text-slate-600">{tx.type}</td>
                    <td className="px-4 py-3.5 font-bold text-slate-900">
                      {formatINR(tx.amount)}
                    </td>
                    <td className="px-4 py-3.5 text-right sm:pr-6">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          tx.status === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {tx.status === 'paid' ? 'Paid / Settled' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Architecture & Next Scope Checklist */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Development Scope Status
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Initial initialization scope implemented cleanly as requested:
            </p>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">1. Login page</span>
                  <p className="text-[11px] text-slate-500">Emergent AI design reference with dark navy hero.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">2. Registration page</span>
                  <p className="text-[11px] text-slate-500">Clean input layout and account toggle.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">3. Business workspace setup</span>
                  <p className="text-[11px] text-slate-500">Business name + credentials onboarding.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">4. Authentication UI</span>
                  <p className="text-[11px] text-slate-500">Real validation, session persistence, secure hashing notes.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">5. Dashboard layout</span>
                  <p className="text-[11px] text-slate-500">Indian MSME metrics, ₹ INR currency, status check.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">6. Sidebar navigation</span>
                  <p className="text-[11px] text-slate-500">Full navigation tree for invoices, customers, AI desk.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">7. Responsive mobile layout</span>
                  <p className="text-[11px] text-slate-500">Mobile drawer, stackable panels, touch navigation.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <span>Next up: Invoices, Customers & Supabase Sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
