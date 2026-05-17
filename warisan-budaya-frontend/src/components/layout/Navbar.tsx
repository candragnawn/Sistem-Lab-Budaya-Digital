"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-[#1b3252] text-[#ffffff] flex justify-between items-center px-[50px] py-[15px] relative z-50">
      <Link href="/" className="flex items-center gap-[10px] cursor-pointer">
        <div className="w-[30px] h-[30px] relative">
          <Image src="/logo-buku.png" alt="Navbar Logo" fill className="object-contain" />
        </div>
        <div>
          <h1 className="text-[18px] font-semibold tracking-[1px] leading-tight">SIWADA</h1>
          <span className="text-[10px] text-[#94a3b8] block leading-tight">Sistem Informasi Warisan Budaya</span>
        </div>
      </Link>

      <ul className="flex gap-[30px] list-none text-[14px]">
        <li>
          <Link 
            href="/dosen" 
            className={`cursor-pointer transition-colors ${pathname === '/dosen' ? 'text-[#ceaa56] border-b-2 border-[#ceaa56] pb-[2px]' : 'hover:text-[#ceaa56]'}`}
          >
            Daftar Dosen
          </Link>
        </li>
        <li>
          <Link 
            href="/publikasi" 
            className={`cursor-pointer transition-colors ${pathname === '/publikasi' ? 'text-[#ceaa56] border-b-2 border-[#ceaa56] pb-[2px]' : 'hover:text-[#ceaa56]'}`}
          >
            Publikasi
          </Link>
        </li>
        <li>
          <Link 
            href="/arsip" 
            className={`cursor-pointer transition-colors ${pathname === '/arsip' ? 'text-[#ceaa56] border-b-2 border-[#ceaa56] pb-[2px]' : 'hover:text-[#ceaa56]'}`}
          >
            Arsip Digital
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard" 
            className={`cursor-pointer transition-colors ${pathname === '/dashboard' ? 'text-[#ceaa56] border-b-2 border-[#ceaa56] pb-[2px]' : 'hover:text-[#ceaa56]'}`}
          >
            Dashboard
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-[20px]">
        <div className="flex gap-[15px] items-center relative">
          
          {/* Global Search Feature */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 150, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Pencarian..."
                  className="px-3 py-1 rounded-md text-sm text-black outline-none border border-gray-300"
                  autoFocus
                />
              )}
            </AnimatePresence>
            <div 
              className="w-[20px] h-[20px] relative cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Image src="/icon-search.png" alt="Search Icon" fill className="object-contain" />
            </div>
          </div>

          {/* Notification Feature */}
          <div className="relative">
            <div 
              className="w-[20px] h-[20px] relative cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <Image src="/icon-bell.png" alt="Bell Icon" fill className="object-contain" />
              <sup className="bg-[#ceaa56] text-[#1b3252] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center absolute -top-2 -right-2">3</sup>
            </div>
            
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-[35px] right-0 bg-white text-black p-4 rounded-md shadow-lg min-w-[200px] text-sm text-center border border-gray-100"
                >
                  Belum ada notifikasi baru.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-[10px] cursor-pointer group ml-4">
          <div className="w-[35px] h-[35px] bg-[#ccc] rounded-full relative overflow-hidden border-2 border-transparent group-hover:border-[#ceaa56] transition-colors">
            <Image src="/avatar-dosen.png" alt="User Avatar" fill className="object-cover" />
          </div>
          <div>
            <h4 className="text-[14px] font-medium leading-tight group-hover:text-[#ceaa56] transition-colors">Ivan Ganteng</h4>
            <p className="text-[11px] text-[#ceaa56] leading-tight">Dosen</p>
          </div>
          <span className="text-xs ml-1 text-[#94a3b8] group-hover:text-white transition-colors">▼</span>
        </div>
      </div>
    </nav>
  );
}
