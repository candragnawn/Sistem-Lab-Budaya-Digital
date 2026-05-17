import React from 'react';
import { Search, Download, Plus, AlertCircle, RefreshCw, Eye, Edit, Trash2 } from 'lucide-react';
import { ProfileTableProps } from '@/types/dosen-profil';

export function ProfileTableTemplate({
  title,
  description,
  status,
  dataCount,
  syncSource,
  columns,
  data
}: ProfileTableProps) {
  
  const getStatusColor = (s: string) => {
    switch(s) {
      case 'Lengkap': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Sebagian': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Belum Diisi': return 'bg-rose-50 text-rose-600 border-rose-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getStatusIcon = (s: string) => {
    switch(s) {
      case 'Lengkap': return <BadgeCheckIcon className="w-4 h-4" />;
      case 'Sebagian': return <AlertCircle className="w-4 h-4" />;
      case 'Belum Diisi': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-slate-50 rounded-full -mr-10 -mt-10 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-1">PROFIL</div>
          <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">{title}</h2>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
        
        <div className="flex flex-col items-end gap-3 relative z-10">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
            {getStatusIcon(status)}
            <span>{status}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-md">{dataCount} data</span>
            {syncSource && (
              <button className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-md transition-colors border border-emerald-100">
                <RefreshCw className="w-3.5 h-3.5" />
                {syncSource}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari data..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-md border border-slate-200 transition-colors w-full sm:w-auto">
              <Download className="w-4 h-4" />
              Ekspor
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1b3252] hover:bg-[#294c7a] text-white text-sm font-medium rounded-md transition-colors shadow-sm w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Tambah Data
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 mb-4 opacity-50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-slate-400">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <p className="text-slate-500 text-sm">Belum ada data. Klik "Tambah Data" untuk memulai.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4 border-b border-slate-200 w-16">NO.</th>
                  {columns.map((col, idx) => (
                    <th key={idx} className="px-6 py-4 border-b border-slate-200">{col.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">{rIdx + 1}</td>
                    {columns.map((col, cIdx) => (
                      <td key={cIdx} className="px-6 py-4">
                        {col.type === 'action' ? (
                          <div className="flex items-center gap-3">
                            <button className="text-blue-600 hover:text-blue-800 transition-colors p-1" title="Lihat">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-amber-500 hover:text-amber-600 transition-colors p-1" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-rose-500 hover:text-rose-600 transition-colors p-1" title="Hapus">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : col.type === 'badge' ? (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${col.badgeColors?.[row[col.accessor]] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                            {row[col.accessor]}
                          </span>
                        ) : col.type === 'currency' ? (
                          <span className="text-slate-700">{row[col.accessor]}</span>
                        ) : (
                          <span className="text-slate-700">{row[col.accessor]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {data.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 text-sm">
            <span className="text-slate-500">Menampilkan {data.length} dari {dataCount} data</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded text-slate-400 hover:bg-slate-200 transition-colors" disabled>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded bg-[#1b3252] text-white font-medium text-xs">1</button>
              <button className="p-1 rounded text-slate-600 hover:bg-slate-200 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BadgeCheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
