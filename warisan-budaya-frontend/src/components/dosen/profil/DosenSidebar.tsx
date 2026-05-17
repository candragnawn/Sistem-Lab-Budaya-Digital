'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, User, FileText, BookOpen,
  Briefcase, Award, GraduationCap, ChevronDown, ChevronRight, Menu, MapPin, Search, PlusCircle, PenTool, Star, FileBox
} from 'lucide-react';

export function DosenSidebar() {
  const pathname = usePathname();
  const [profilOpen, setProfilOpen] = useState(true);

  const isActive = (path: string) => pathname?.includes(path);
  
  const basePath = `/akun/profil`;

  const profilMenu = [
    { name: 'Data Pribadi', path: `${basePath}/data-pribadi`, icon: <User className="w-4 h-4" /> },
    { name: 'Inpassing', path: `${basePath}/inpassing`, icon: <FileText className="w-4 h-4" />, badge: 'SISTER' },
    { name: 'Jabatan Fungsional', path: `${basePath}/jabatan-fungsional`, icon: <Briefcase className="w-4 h-4" />, badge: 'SINTA' },
    { name: 'Kepangkatan', path: `${basePath}/kepangkatan`, icon: <Award className="w-4 h-4" /> },
    { name: 'Penempatan', path: `${basePath}/penempatan`, icon: <MapPin className="w-4 h-4" />, badge: 'SISTER' },
    { name: 'Profesor Emiritus', path: `${basePath}/profesor-emiritus`, icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const otherSections = [
    { name: 'Kualifikasi', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Kompetensi', icon: <Search className="w-4 h-4" /> },
    { name: 'Pelaksanaan Pendidikan', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Pelaksanaan Penelitian', icon: <PenTool className="w-4 h-4" /> },
    { name: 'Pelaksanaan Pengabdian', icon: <PlusCircle className="w-4 h-4" /> },
    { name: 'Penunjang', icon: <Star className="w-4 h-4" /> },
    { name: 'Reward', icon: <Award className="w-4 h-4" /> },
    { name: 'Data Dokumen', icon: <FileBox className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#e2e8f0] flex flex-col h-fit overflow-hidden">
      <div className="bg-[#1b3252] p-4 flex justify-between items-center">
        <span className="text-amber-500 font-bold text-xs tracking-wider uppercase">NAVIGASI KATEGORI</span>
        <button className="text-amber-500 hover:text-amber-400">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-3 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-100px)]">
        {/* Ikhtisar */}
        <Link href={`/akun`} className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-slate-50 text-slate-700 text-[13px] font-medium transition-colors">
          <LayoutGrid className="w-4 h-4 text-slate-400" />
          <span>Ikhtisar / Overview</span>
        </Link>
        
        {/* Profil Section */}
        <div className="mt-1">
          <button 
            onClick={() => setProfilOpen(!profilOpen)}
            className="w-full flex items-center justify-between px-3 py-3 rounded-md bg-slate-50 text-slate-800 text-[13px] font-bold border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1b3252]"></div>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-[#1b3252]" />
              <span>Profil</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-normal">0/8</span>
              {profilOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            </div>
          </button>
          
          {profilOpen && (
            <div className="flex flex-col gap-1 mt-2 mb-2">
              {profilMenu.map((item, idx) => {
                const active = isActive(item.path);
                return (
                  <Link 
                    key={idx} 
                    href={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-md text-[13px] transition-colors ml-2 ${
                      active 
                        ? 'bg-[#1b3252] text-white font-medium shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={active ? 'text-blue-300' : 'text-slate-400'}>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${active ? 'bg-white/20 text-white' : item.badge === 'SISTER' ? 'text-orange-500 bg-orange-50' : 'text-emerald-500 bg-emerald-50'}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
        
        {/* Other Sections */}
        <div className="mt-2 flex flex-col gap-1 border-t border-slate-100 pt-2">
          {otherSections.map((item, i) => (
            <Link key={i} href="#" className="flex items-center justify-between px-3 py-3 rounded-md hover:bg-slate-50 text-slate-600 text-[13px] font-medium transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{item.icon}</span>
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-300">0/2</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
