import React, { useState } from 'react';
import { Plus, Search, Filter, Download, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { formatINR } from '../../utils/validation';

export const InvoicesView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sampleInvoices = [
    {
      id: 'INV-2026-081',
      customerName: 'Mehta Hardware & Sanitary',
      phone: '+91 98201 34910',
      date: '11 Nov 2026',
      dueDate: '25 Nov 2026',
      subtotal: 15678,
      gstRate: 18,
      grandTotal: 18500,
      status: 'pending',
      itemsCount: 4,
    },
    {
      id: 'INV-2026-080',
      customerName: 'Shree Balaji Traders',
      phone: '+91 98450 12894',
      date: '10 Nov 2026',
      dueDate: '10 Nov 2026',
      subtotal: 8135,
      gstRate: 18,
      grandTotal: 9600,
      status: 'paid',
      itemsCount: 2,
    },
    {
      id: 'INV-2026-079',
      customerName: 'Kisan Krishi Kendra',
      phone: '+91 97123 45678',
      date: '08 Nov 2026',
      dueDate: '22 Nov 2026',
      subtotal: 12033,
      gstRate: 18,
      grandTotal: 14200,
      status: 'pending',
      itemsCount: 5,
    },
    {
      id: 'INV-2026-078',
      customerName: 'Rajesh Electrical Works',
      phone: '+91 99012 34567',
      date: '05 Nov 2026',
      dueDate: '05 Nov 2026',
      subtotal: 20338,
      gstRate: 18,
      grandTotal: 24000,
      status: 'paid',
      itemsCount: 6,
    },
  ];

  const filtered = sampleInvoices.filter((inv) => {
    const matchesFilter = filter === 'all' || inv.status === filter;
    const matchesSearch = inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">GST Invoices & Billing</h2>
          <p className="text-xs text-slate-500">
            Create, manage and share tax invoices compliant with Indian GST rules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Invoice creation form will open here once the database schema is linked in the next milestone.')}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#005bf8] hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['all', 'pending', 'paid'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'all' ? 'All Invoices' : tab}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search invoice or party..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Invoices table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Invoice No.</th>
                <th className="px-4 py-3">Customer / Party</th>
                <th className="px-4 py-3">Billing Date</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Taxable + GST (18%)</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right pr-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600">
                    {inv.id}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold block text-slate-900">{inv.customerName}</span>
                    <span className="text-[11px] text-slate-400">{inv.phone}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">{inv.date}</td>
                  <td className="px-4 py-3.5 text-slate-500">{inv.dueDate}</td>
                  <td className="px-4 py-3.5 text-slate-600">
                    {formatINR(inv.subtotal)} + {formatINR(inv.grandTotal - inv.subtotal)}
                  </td>
                  <td className="px-4 py-3.5 font-extrabold text-slate-900">
                    {formatINR(inv.grandTotal)}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        inv.status === 'paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {inv.status === 'paid' ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Paid</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          <span>Pending</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right pr-5">
                    <button
                      type="button"
                      title="Download PDF"
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
