import React from 'react';
import { UploadCloud, FileText, CheckCircle2, Shield, FolderArchive } from 'lucide-react';

export const RecordsView: React.FC = () => {
  const sampleRecords = [
    { name: 'GST_Registration_Certificate_REG-06.pdf', size: '1.4 MB', date: '01 Nov 2026', tag: 'Legal & Tax' },
    { name: 'Bank_Statement_HDFC_Current_Oct2026.pdf', size: '3.8 MB', date: '02 Nov 2026', tag: 'Banking' },
    { name: 'Supplier_Purchase_Challan_Batch49.pdf', size: '840 KB', date: '08 Nov 2026', tag: 'Purchase' },
    { name: 'Shop_Establishment_Gumasta_License.pdf', size: '920 KB', date: '15 Oct 2026', tag: 'Compliance' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Business Records & Document Vault</h2>
          <p className="text-xs text-slate-500">
            Secure cloud storage for purchase bills, GST returns, and merchant contracts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('File upload will link with Supabase Storage buckets in the next milestone.')}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#005bf8] hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-xs cursor-pointer"
        >
          <UploadCloud className="h-4 w-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Supabase Storage Architecture Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#005bf8]">
            <FolderArchive className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Supabase Storage Vault Architecture</h3>
            <p className="text-xs text-slate-500">
              Each workspace gets an isolated, encrypted bucket with row-level access control.
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 border border-dashed border-slate-300 text-center cursor-pointer hover:bg-slate-100/70 transition-colors">
          <UploadCloud className="mx-auto h-8 w-8 text-slate-400 mb-2" />
          <p className="text-xs font-semibold text-slate-700">Drop your bills, challans, or bank PDFs here</p>
          <p className="text-[11px] text-slate-400 mt-1">Automatic OCR & AI invoice parsing will extract amounts</p>
        </div>
      </div>

      {/* Documents List */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-semibold text-xs text-slate-800">
          Saved Business Records
        </div>
        <div className="divide-y divide-slate-100">
          {sampleRecords.map((rec, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-xs">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-blue-600" />
                <div>
                  <span className="font-semibold text-slate-900 block">{rec.name}</span>
                  <span className="text-[11px] text-slate-400">{rec.size} • Uploaded {rec.date}</span>
                </div>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                {rec.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
