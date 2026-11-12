import React, { useState } from 'react';
import { Plus, Search, Phone, MessageSquare, IndianRupee } from 'lucide-react';
import { formatINR } from '../../utils/validation';

export const CustomersView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sampleCustomers = [
    {
      id: 'cust-1',
      name: 'Mehta Hardware & Sanitary',
      contactPerson: 'Ketan Mehta',
      phone: '+91 98201 34910',
      city: 'Ahmedabad, Gujarat',
      gstin: '24AABCM1234F1ZX',
      balanceDue: 18500,
      totalBilled: 145000,
      status: 'pending',
    },
    {
      id: 'cust-2',
      name: 'Rajesh Electrical Works',
      contactPerson: 'Rajesh Verma',
      phone: '+91 99012 34567',
      city: 'Surat, Gujarat',
      gstin: '24AAACR5678B1ZY',
      balanceDue: 0,
      totalBilled: 98000,
      status: 'clear',
    },
    {
      id: 'cust-3',
      name: 'Shree Balaji Traders',
      contactPerson: 'Manoj Agarwal',
      phone: '+91 98450 12894',
      city: 'Vadodara, Gujarat',
      gstin: '24AAPFA9012C1ZZ',
      balanceDue: 0,
      totalBilled: 64200,
      status: 'clear',
    },
    {
      id: 'cust-4',
      name: 'Kisan Krishi Kendra',
      contactPerson: 'Ramesh Patel',
      phone: '+91 97123 45678',
      city: 'Rajkot, Gujarat',
      gstin: 'Unregistered (Composition)',
      balanceDue: 14200,
      totalBilled: 42000,
      status: 'pending',
    },
    {
      id: 'cust-5',
      name: 'Apex Industrial Spares',
      contactPerson: 'Vikram Joshi',
      phone: '+91 98765 43210',
      city: 'Gandhinagar, Gujarat',
      gstin: '24AAJCA4321D1ZW',
      balanceDue: 5700,
      totalBilled: 86400,
      status: 'pending',
    },
  ];

  const filtered = sampleCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Customer Directory & Party Ledger</h2>
          <p className="text-xs text-slate-500">
            Track customer balances (Udhaar), billing history, and GSTIN information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Customer entry form will be active with database sync in the next phase.')}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#005bf8] hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Summary Dues Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 font-medium">Total Active Parties</p>
          <p className="text-xl font-extrabold text-slate-900 mt-1">18 Customers</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <p className="text-xs text-amber-800 font-medium">Total Pending Due (Market Udhaar)</p>
          <p className="text-xl font-extrabold text-amber-900 mt-1">{formatINR(38400)}</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <p className="text-xs text-emerald-800 font-medium">Total Lifetime Invoiced</p>
          <p className="text-xl font-extrabold text-emerald-900 mt-1">{formatINR(435600)}</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-xl border border-slate-200">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search party name, contact person or phone..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Party Name & City</th>
                <th className="px-4 py-3">Contact Person & Phone</th>
                <th className="px-4 py-3">GSTIN</th>
                <th className="px-4 py-3">Total Billed</th>
                <th className="px-4 py-3">Balance Due (Udhaar)</th>
                <th className="px-4 py-3 text-right pr-5">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-slate-900 block">{cust.name}</span>
                    <span className="text-[11px] text-slate-400">{cust.city}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-slate-800 block font-medium">{cust.contactPerson}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {cust.phone}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-600">
                    {cust.gstin}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700">
                    {formatINR(cust.totalBilled)}
                  </td>
                  <td className="px-4 py-3.5">
                    {cust.balanceDue > 0 ? (
                      <span className="font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {formatINR(cust.balanceDue)}
                      </span>
                    ) : (
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        All Cleared (₹0)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right pr-5">
                    {cust.balanceDue > 0 && (
                      <button
                        type="button"
                        onClick={() => alert(`WhatsApp payment reminder link prepared for ${cust.name}`)}
                        className="inline-flex items-center gap-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1 text-[11px] font-semibold transition-colors cursor-pointer"
                        title="Send WhatsApp payment reminder"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>Remind</span>
                      </button>
                    )}
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
