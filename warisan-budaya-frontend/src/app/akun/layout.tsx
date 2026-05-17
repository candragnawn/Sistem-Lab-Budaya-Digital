import React from 'react';
import { DosenProfileHeader } from '@/components/dosen/profil/DosenProfileHeader';
import { DosenSidebar } from '@/components/dosen/profil/DosenSidebar';

export default function AkunLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5efe6] font-sans">
      {/* Breadcrumb */}
      <div className="bg-white px-[50px] py-[12px] text-[13px] text-slate-500 border-b border-slate-200 shadow-sm flex items-center">
        <span className="text-[#1b3252] font-semibold mr-1">Universitas Ivan</span> / <span className="ml-1">Laboratorium Warisan Budaya Digital</span>
      </div>

      <div className="flex-1 px-4 sm:px-8 lg:px-[50px] py-8 w-full">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-[280px] shrink-0 sticky top-6 z-10">
            <DosenSidebar />
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <DosenProfileHeader />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
