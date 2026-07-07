"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, ChevronRight, HandHeart } from "lucide-react";

export default function PelaksanaanPengabdianMainPage() {
  const [user, setUser] = useState<{name: string; role: string; photo: string} | null>(null);
  useEffect(() => { const s = localStorage.getItem("user"); if (s) setUser(JSON.parse(s)); }, []);
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500"><span className="text-brand-navy font-medium">Universitas Udayana</span><span className="mx-2">/</span><span>Laboratorium Warisan Budaya Digital</span></div>
      
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <div className="h-full w-full overflow-hidden rounded-full border-2 border-brand-gold">
                <img src={user.photo || "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"} alt={user.name} className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white z-10"><CheckCircle className="h-3 w-3 text-white" /></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-700">{user.name}</h1>
              <p className="text-sm text-amber-600/80 font-medium">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-gray-400" /><span className="text-gray-400">Ikhtisar</span><ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-brand-navy/80 font-medium">Pelaksanaan Pengabdian</span>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-navy/5 to-transparent p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-amber-600/70 mb-1">PELAKSANAAN PENGABDIAN</p>
              <h2 className="text-2xl font-medium text-gray-600">Pengabdian &amp; Penunjang Terkait</h2>
              <p className="mt-1.5 text-sm text-gray-500">Pilih menu di sebelah kiri untuk melihat daftar pengabdian, pembicara, pengelola jurnal, dan jabatan struktural.</p>
            </div>
          </div>
        </div>
        
        <div className="p-16 flex flex-col items-center justify-center text-center">
          <HandHeart className="h-16 w-16 text-brand-navy/20 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">Pilih Kategori</h3>
          <p className="text-gray-500 mt-2 max-w-sm">Silakan pilih menu spesifik melalui bilah navigasi (sidebar) untuk melihat dan mengelola data Pelaksanaan Pengabdian.</p>
        </div>
      </div>
    </div>
  );
}
