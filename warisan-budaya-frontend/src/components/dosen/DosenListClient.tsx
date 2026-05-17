"use client";

import { useState, useMemo } from 'react';
import { Dosen } from '@/types';
import { DosenCard } from '@/components/dosen/DosenCard';
import Image from 'next/image';

export function DosenListClient({ initialData }: { initialData: Dosen[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredAndSortedDosen = useMemo(() => {
    let result = [...initialData];

    // 1. Search Filter (Case-insensitive)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.id.includes(q)
      );
    }

    // 2. Sorting
    switch (sortOption) {
      case "abjad-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "abjad-za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "terbaru":
        result.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
        break;
      case "scopus":
        result.sort((a, b) => b.metrics.scopusHIndex - a.metrics.scopusHIndex);
        break;
      default:
        break;
    }
    
    return result;
  }, [initialData, searchQuery, sortOption]);

  return (
    <div className="max-w-[1000px] w-full mx-auto px-[20px] py-[30px]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-[20px] gap-4">
        <div>
          <h2 className="text-[24px] text-[#1b3252] font-serif">Daftar Dosen</h2>
          <p className="text-[13px] text-[#64748b] mt-[5px]">Daftar seluruh dosen kontributor arsip</p>
        </div>
        <div className="flex items-center gap-[10px] text-[13px] text-[#64748b]">
          <label>Urutkan:</label>
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-[15px] py-[8px] border border-[#e2e8f0] rounded-[6px] bg-white outline-none min-w-[150px] text-[#64748b]"
          >
            <option value="">Pilih...</option>
            <option value="abjad-az">Abjad (A-Z)</option>
            <option value="abjad-za">Abjad (Z-A)</option>
            <option value="terbaru">Terbaru</option>
            <option value="scopus">Scopus Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-[15px] rounded-[8px] flex flex-col md:flex-row gap-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-[20px]">
        <div className="flex-grow flex items-center bg-[#f8fafc] border border-[#e2e8f0] rounded-[6px] px-[15px]">
          <div className="w-[12px] h-[12px] relative shrink-0">
            <Image src="/icon-magnify.png" alt="Search" fill className="object-contain" />
          </div>
          <input 
            type="text" 
            placeholder="Cari nama atau ID kontributor..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-none bg-transparent p-[10px] outline-none text-[13px]"
          />
        </div>
        <select className="w-full md:w-[200px] px-[15px] py-[10px] border border-[#e2e8f0] rounded-[6px] bg-[#f8fafc] outline-none text-[#64748b] text-[13px]">
          <option>Semua Fakultas</option>
        </select>
        <select className="w-full md:w-[200px] px-[15px] py-[10px] border border-[#e2e8f0] rounded-[6px] bg-[#f8fafc] outline-none text-[#64748b] text-[13px]">
          <option>Semua Prodi</option>
        </select>
      </div>

      <p className="text-[12px] text-[#64748b] mb-[15px]">
        Menampilkan <strong className="text-[#333333]">{filteredAndSortedDosen.length}</strong> dosen
      </p>

      {/* Dosen List */}
      <div>
        {filteredAndSortedDosen.length > 0 ? (
          filteredAndSortedDosen.map((dosen) => (
            <DosenCard key={dosen.id} dosen={dosen} />
          ))
        ) : (
          <div className="text-center py-[50px] text-[#64748b]">
            Dosen tidak ditemukan.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredAndSortedDosen.length > 0 && (
        <div className="flex justify-center gap-[5px] mt-[30px]">
          <button className="px-[12px] py-[6px] border border-[#e2e8f0] bg-white text-[#64748b] rounded-[4px] text-[13px] cursor-pointer hover:bg-gray-50 transition-colors">
            &lt; Previous
          </button>
          <button className="px-[12px] py-[6px] border border-[#1b3252] bg-[#1b3252] text-white rounded-[4px] text-[13px] cursor-pointer">
            1
          </button>
          <button className="px-[12px] py-[6px] border border-[#e2e8f0] bg-white text-[#64748b] rounded-[4px] text-[13px] cursor-pointer hover:bg-gray-50 transition-colors">
            Next &gt;
          </button>
        </div>
      )}

    </div>
  );
}
