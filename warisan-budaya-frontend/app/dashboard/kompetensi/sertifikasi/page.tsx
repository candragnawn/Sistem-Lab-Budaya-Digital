"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Download, RefreshCw, Plus, Search, Eye, Pencil, Trash2, Home, ChevronRight, Award } from "lucide-react";

interface UserData { name: string; role: string; photo: string; }

const sertifikasiData = [
  { id: 1, nama: "Sertifikasi Dosen (SERDOS)", lembaga: "Dikti - Kemendikbud", tahun: 2008, nomor: "SD/0123/456/2008", bidang: "Ilmu Budaya", status: "Valid" },
  { id: 2, nama: "Certified Researcher LIPI", lembaga: "LIPI", tahun: 2015, nomor: "CR/789/LIPI/2015", bidang: "Arkeologi", status: "Valid" },
  { id: 3, nama: "Workshop Digital Heritage UNESCO", lembaga: "UNESCO Bangkok", tahun: 2019, nomor: "WHB/202/UNESCO/2019", bidang: "Warisan Budaya Digital", status: "Valid" },
  { id: 4, nama: "Pelatihan Pengelolaan Museum Digital", lembaga: "Kemdikbud", tahun: 2022, nomor: "PPM/334/2022", bidang: "Museologi Digital", status: "Valid" },
];

export default function SertifikasiPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage] = useState(1);
  useEffect(() => { const s = localStorage.getItem("user"); if (s) setUser(JSON.parse(s)); }, []);
  if (!user) return null;
  const filteredData = sertifikasiData.filter(i =>
    i.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.lembaga.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.bidang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500"><span className="text-brand-navy font-medium">Universitas Udayana</span><span className="mx-2">/</span><span>Laboratorium Warisan Budaya Digital</span></div>
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-brand-gold">
              <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white"><CheckCircle className="h-3 w-3 text-white" /></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-sm text-amber-600/80 font-medium">{user.role}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500"><Award className="h-3 w-3" /> {sertifikasiData.length} sertifikasi kompetensi</div>
            </div>
          </div>
          <div className="flex gap-2">
            
            <Button size="sm" variant="outline" className="text-xs gap-1.5 border-gray-300"><Download className="h-3 w-3" /> Unduh CV</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-gray-400" /><span className="text-gray-400">Ikhtisar</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-gray-500">Kompetensi</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-brand-navy font-medium">Sertifikasi</span>
      </div>
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-navy/5 to-transparent p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div><p className="text-xs font-medium uppercase tracking-wider text-brand-gold/80 mb-1">KOMPETENSI</p><h2 className="text-2xl font-semibold text-gray-800">Sertifikasi</h2><p className="mt-1.5 text-sm text-gray-500">Daftar sertifikasi kompetensi dan keahlian profesional yang dimiliki.</p></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-600" /><span className="text-xs font-medium text-green-700">Lengkap</span></div>
              <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5"><span className="text-xs font-medium text-gray-600">{filteredData.length} data</span></div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative max-w-xs"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="Cari sertifikasi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-10 text-sm border-gray-200 rounded-lg" /></div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs gap-1.5 border-gray-300"><Download className="h-3.5 w-3.5" /> Ekspor</Button>
              <Button size="sm" className="bg-brand-navy text-white text-xs gap-1.5"><Plus className="h-3.5 w-3.5" /> Tambah Data</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredData.map((item) => (
              <div key={item.id} className="rounded-xl border border-gray-200 p-4 hover:border-brand-navy/30 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-navy/10 flex items-center justify-center"><Award className="h-5 w-5 text-brand-navy" /></div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">{item.nama}</h3>
                      <p className="text-xs text-gray-500">{item.lembaga}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600" id={`view-sertifikasi-${item.id}`}><Eye className="h-3.5 w-3.5" /></button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600" id={`edit-sertifikasi-${item.id}`}><Pencil className="h-3.5 w-3.5" /></button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600" id={`delete-sertifikasi-${item.id}`}><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><p className="text-gray-400">Tahun</p><p className="font-medium text-gray-700">{item.tahun}</p></div>
                  <div><p className="text-gray-400">Status</p><span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">{item.status}</span></div>
                  <div className="col-span-2"><p className="text-gray-400">Nomor Sertifikat</p><p className="font-mono text-gray-600">{item.nomor}</p></div>
                  <div className="col-span-2"><p className="text-gray-400">Bidang</p><p className="font-medium text-gray-700">{item.bidang}</p></div>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && <div className="col-span-2 flex flex-col items-center gap-2 py-12"><Search className="h-8 w-8 text-gray-300" /><p className="text-sm text-gray-400">Tidak ada data ditemukan</p></div>}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">Menampilkan {filteredData.length} dari {sertifikasiData.length} data</p>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40" disabled={currentPage === 1}><ChevronRight className="h-3.5 w-3.5 rotate-180" /></button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy text-xs font-medium text-white">{currentPage}</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40" disabled><ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
