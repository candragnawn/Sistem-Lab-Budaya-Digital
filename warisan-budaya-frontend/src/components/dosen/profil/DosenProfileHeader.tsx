import React from 'react';
import { BadgeCheck, RefreshCw, Download } from 'lucide-react';
import Image from 'next/image';

export function DosenProfileHeader() {
  return (
    <div className="bg-gradient-to-r from-[#1b3252] to-[#294c7a] rounded-lg p-6 mb-6 text-white flex items-center relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute right-20 bottom-0 w-40 h-40 border border-white/10 rounded-full -mb-10 pointer-events-none" />
      
      <div className="relative z-10 flex gap-6 items-center w-full">
        <div className="relative">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/20 border-2 border-white/30 flex items-center justify-center">
            {/* Placeholder for avatar */}
            <span className="text-3xl font-bold opacity-50">KP</span>
            {/* In a real scenario, use Image component if avatar URL exists */}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-[#1b3252]">
            <BadgeCheck className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-serif mb-1">Kadek Pasek Divandra Kusuma</h1>
          <p className="text-blue-200 text-sm mb-3">Guru Besar • Prodi GW - Fakultas Nomor 5 - Universitas Cambai</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/20">
              NIDN: <strong>0001096801</strong>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/20">
              NIP: <strong>19680901199303001</strong>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/20">
              SISTER ID: <strong>5678901</strong>
            </span>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Sync Sekarang
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Unduh CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
