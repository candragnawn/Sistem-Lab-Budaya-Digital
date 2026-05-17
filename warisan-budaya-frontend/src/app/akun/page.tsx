import React from 'react';
import Link from 'next/link';
import { 
  Award, FileText, Briefcase, GraduationCap, LayoutGrid, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function DosenOverviewPage({ params }: { params: { id: string } }) {
  const summaryItems = [
    { name: 'Kepangkatan', path: `/dosen/${params.id}/profil/kepangkatan`, desc: '8 Riwayat Golongan & Pangkat', count: 8, icon: <Award className="w-5 h-5 text-blue-500" /> },
    { name: 'Jabatan Fungsional', path: `/dosen/${params.id}/profil/jabatan-fungsional`, desc: '3 Riwayat Jabatan Akademik', count: 3, icon: <Briefcase className="w-5 h-5 text-indigo-500" /> },
    { name: 'Inpassing', path: `/dosen/${params.id}/profil/inpassing`, desc: '1 Penyetaraan Pangkat/Golongan', count: 1, icon: <FileText className="w-5 h-5 text-amber-500" /> },
    { name: 'Penempatan', path: `/dosen/${params.id}/profil/penempatan`, desc: '1 Riwayat Penempatan Kerja', count: 1, icon: <LayoutGrid className="w-5 h-5 text-emerald-500" /> },
    { name: 'Profesor Emiritus', path: `/dosen/${params.id}/profil/profesor-emiritus`, desc: 'Belum ada riwayat pengakuan', count: 0, icon: <GraduationCap className="w-5 h-5 text-rose-500" /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-40 h-40 bg-blue-50/50 rounded-full -mr-12 -mt-12 pointer-events-none" />
        <h2 className="text-xl font-serif font-bold text-slate-800 mb-2">Selamat Datang di Portal Dosen</h2>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          Di sini Anda dapat mengelola data profil, kepangkatan, jabatan fungsional, penempatan, dan riwayat akademik lainnya. Pastikan seluruh data Anda tersinkronisasi dengan baik melalui platform SISTER & SINTA.
        </p>
      </div>

      {/* Grid of Profile Sections */}
      <div>
        <h3 className="text-md font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          Ringkasan Kelengkapan Data Profil
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summaryItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.path}
              className="bg-white p-5 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex justify-between items-center group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{item.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-full text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  {item.count} Data
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
