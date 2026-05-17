"use client";

import { Dosen } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function DosenCard({ dosen }: { dosen: Dosen }) {
  const [imgError, setImgError] = useState(false);
  
  const avatarSrc = (dosen.avatarUrl && !imgError) ? dosen.avatarUrl : "/default-avatar.png";

  return (
    <div className="bg-white rounded-[8px] p-[20px] flex flex-col md:flex-row gap-[20px] mb-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-transparent hover:border-[#e2e8f0] transition-colors">
      <div className="w-[80px] h-[80px] bg-[#e2e8f0] rounded-[6px] shrink-0 relative overflow-hidden">
        <Image 
          src={avatarSrc} 
          alt={dosen.name} 
          fill 
          className="object-cover" 
          onError={() => setImgError(true)}
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center gap-[8px] mb-[10px]">
          <Link href={`/dosen/${dosen.id}/profil/kepangkatan`} className="text-[16px] text-[#1b3252] font-semibold hover:text-blue-600 transition-colors">
            {dosen.name}
          </Link>
          {dosen.isVerified && (
            <div className="w-[14px] h-[14px] relative">
              <Image src="/icon-verified.png" alt="Verified" fill className="object-contain" />
            </div>
          )}
        </div>
        
        <div className="text-[12px] text-[#64748b] leading-[1.8] mb-[10px]">
          <p className="flex items-center gap-[8px]">
            <span className="w-[12px] h-[12px] relative block">
              <Image src="/icon-list.png" alt="List Icon" fill className="object-contain" />
            </span>
            Prodi {dosen.prodi}
          </p>
          <p className="flex items-center gap-[8px]">
            <span className="w-[12px] h-[12px] relative block">
              <Image src="/icon-list.png" alt="List Icon" fill className="object-contain" />
            </span>
            Fakultas {dosen.fakultas}
          </p>
          <p className="flex items-center gap-[8px]">
            <span className="w-[12px] h-[12px] relative block">
              <Image src="/icon-list.png" alt="List Icon" fill className="object-contain" />
            </span>
            SIWADA ID: <span className="font-semibold text-[#333333] ml-1">{dosen.id}</span>
          </p>
        </div>
        
        <div className="mt-[15px] text-[12px] text-[#64748b]">
          <p className="flex items-center gap-[8px] mb-[5px]">
            <span className="w-[12px] h-[12px] relative block">
              <Image src="/icon-list.png" alt="List Icon" fill className="object-contain" />
            </span>
            Subjects:
          </p>
          <div className="flex flex-wrap gap-[8px] mt-[5px] ml-[20px]">
            {dosen.subjects.map((subject, idx) => (
              <span key={idx} className="bg-[#f1f5f9] text-[#64748b] px-[10px] py-[4px] rounded-[12px] text-[11px] border border-[#e2e8f0]">
                {subject}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-[15px] text-[12px] text-[#64748b]">
          <p className="flex items-center gap-[8px] mb-[5px]">
            <span className="w-[12px] h-[12px] relative block">
              <Image src="/icon-list.png" alt="List Icon" fill className="object-contain" />
            </span>
            Metrics:
          </p>
          <div className="ml-[20px] leading-[1.6]">
            Scopus H-Index: <strong className="text-[#333333]">{dosen.metrics.scopusHIndex}</strong><br/>
            Google Scholar H-Index: <strong className="text-[#333333]">{dosen.metrics.gsHIndex}</strong><br/>
            Google Scholar i10-Index: <strong className="text-[#333333]">{dosen.metrics.gsi10Index}</strong>
          </div>
        </div>
      </div>
      
      <div className="md:text-right flex flex-col justify-center gap-[20px] min-w-[120px] mt-4 md:mt-0 pt-4 md:pt-0">
        <div>
          <h2 className="text-[24px] text-[#1b3252] font-serif leading-[1]">{dosen.sinta3yr}</h2>
          <p className="text-[10px] text-[#64748b] uppercase mt-[4px]">SINTA Score 3yr</p>
        </div>
        <div>
          <h2 className="text-[24px] text-[#1b3252] font-serif leading-[1]">{dosen.sintaOverall}</h2>
          <p className="text-[10px] text-[#64748b] uppercase mt-[4px]">SINTA Score Overall</p>
        </div>
      </div>
    </div>
  );
}
