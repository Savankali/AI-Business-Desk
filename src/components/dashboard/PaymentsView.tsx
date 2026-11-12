import React from 'react';
import { Plus, CheckCircle, QrCode, ArrowDownRight, IndianRupee } from 'lucide-react';
import { formatINR } from '../../utils/validation';

export const PaymentsView: React.FC = () => {
  const samplePayments = [
    { id: 'PAY-89211', party: 'Rajesh Electrical Works', amount: 24000, date: '11 Nov 2026, 11:15 AM', mode: 'UPI', ref: 'UPI/632198421094', status: 'verified' },
    { id: 'PAY-89210', party: 'Shree Balaji Traders', amount: 9600, date: '10 Nov 2026, 04:40 PM', mode: 'NEFT', ref: 'HDFC0000123/N9821', status: 'verified' },
    { id: 'PAY-89209', party: 'Patel Hardware & Paints', amount: 35000, date: '07 Nov 2026, 01:20 PM', mode: 'Cheque', ref: 'CHQ-894102', status: 'verified' },
    { id: 'PAY-89208', party: 'Apex Industrial Spares', amount: 15000, date: '04 Nov 2026, 10:00 AM', mode: 'UPI', ref: 'UPI/632098412891', status: 'verified' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Payment Tracking & UPI Reconciliation</h2>
          <p className="text-xs text-slate-500">
            Log incoming customer settlements, match bank UTRs, and generate instant payment receipts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Record Payment form will be connected to database in the next phase.')}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#005bf8] hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Record Received Payment</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 font-medium">Collected via UPI & QR</p>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{formatINR(39000)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 font-medium">Bank Transfers (NEFT / RTGS)</p>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{formatINR(44600)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 font-medium">Cheque & Cash Collections</p>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{formatINR(35000)}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Receipt No.</th>
                <th className="px-4 py-3">Customer / Party</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Payment Mode</th>
                <th className="px-4 py-3">Reference / UTR</th>
                <th className="px-4 py-3">Amount Received</th>
                <th className="px-4 py-3 text-right pr-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {samplePayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-slate-800">{p.id}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-900">{p.party}</td>
                  <td className="px-4 py-3.5 text-slate-500">{p.date}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {p.mode}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500">{p.ref}</td>
                  <td className="px-4 py-3.5 font-extrabold text-emerald-700">
                    +{formatINR(p.amount)}
                  </td>
                  <td className="px-4 py-3.5 text-right pr-5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </span>
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
