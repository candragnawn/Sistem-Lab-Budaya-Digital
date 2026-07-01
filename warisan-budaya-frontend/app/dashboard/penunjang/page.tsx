"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Download, RefreshCw, Plus, Search, Eye, Pencil, Trash2, Home, ChevronRight, Puzzle } from "lucide-react";

interface UserData { name: string; role: string; photo: string; }

const tabs = ["Tugas Tambahan", "Manajer Jurnal", "Jabatan Struktural", "Keanggotaan Profesi", "Kegiatan Penunjang Lain", "Beasiswa"];

interface Tugas {
  id: number;
  tugas: string;
  unitKerja: string;
  tmt: string;
  sampai: string;
  status: string;
}

export default function PenunjangPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [tugasData, setTugasData] = useState<Tugas[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (activeTab === 0) {
        const res = await api.get('/additional-tasks');
        const items = res.data?.data || [];
        const mapped = items.map((item: any) => ({
          id: item.id,
          tugas: item.task_name || item.name || "Tugas Tambahan",
          unitKerja: item.work_unit || item.institution || "Universitas Udayana",
          tmt: item.start_date || "-",
          sampai: item.end_date || "Sekarang",
          status: item.is_active ? "Aktif" : (item.status || "Aktif"),
        }));
        setTugasData(mapped);
      } else {
        setTugasData([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { 
    const s = localStorage.getItem("user"); 
    if (s) setUser(JSON.parse(s)); 
    fetchData();
  }, [fetchData]);

  if (!user) return null;
  const filteredData = tugasData.filter(i => 
    i.tugas.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.unitKerja.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-xl font-semibold text-gray-700">{user.name}</h1>
              <p className="text-sm text-amber-600/80 font-medium">{user.role}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500"><Puzzle className="h-3 w-3" /> {tugasData.filter(d => d.status === "Aktif").length} kegiatan penunjang aktif</div>
            </div>
          </div>
          <div className="flex gap-2">
            
            <Button size="sm" variant="outline" className="text-xs gap-1.5 border-gray-300"><Download className="h-3 w-3" /> Unduh CV</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-gray-400" /><span className="text-gray-400">Ikhtisar</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-brand-navy/80 font-medium">Penunjang</span>
      </div>
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-navy/5 to-transparent p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div><p className="text-xs font-medium uppercase tracking-wider text-amber-600/70 mb-1">PENUNJANG</p><h2 className="text-2xl font-medium text-gray-600">Kegiatan Penunjang</h2><p className="mt-1.5 text-sm text-gray-500">Data tugas tambahan, keanggotaan, dan kegiatan penunjang lainnya.</p></div>
            <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5"><span className="text-xs font-medium text-gray-500">{filteredData.length} data</span></div>
          </div>
        </div>
        <div className="border-b border-gray-100 overflow-x-auto">
          <div className="flex px-6 pt-2 min-w-max">
            {tabs.map((tab, idx) => (
              <button key={idx} onClick={() => setActiveTab(idx)} className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${activeTab === idx ? "border-brand-navy text-brand-navy" : "border-transparent text-gray-500 hover:text-gray-700"}`}>{tab}</button>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative max-w-xs"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="Cari kegiatan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-10 text-sm border-gray-200 rounded-lg" /></div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs gap-1.5 border-gray-300"><Download className="h-3.5 w-3.5" /> Ekspor</Button>
              <Button size="sm" className="bg-brand-navy text-white text-xs gap-1.5"><Plus className="h-3.5 w-3.5" /> Tambah Data</Button>
            </div>
          </div>
          {activeTab === 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm" id="penunjang-table">
                <thead><tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-12">No.</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Tugas / Jabatan</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Unit Kerja</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">TMT</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">S/D</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 w-28">Aksi</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-gray-500">{idx + 1}</td>
                      <td className="px-4 py-4 font-medium text-gray-800">{item.tugas}</td>
                      <td className="px-4 py-4 text-gray-600">{item.unitKerja}</td>
                      <td className="px-4 py-4 text-center text-gray-600">{item.tmt}</td>
                      <td className="px-4 py-4 text-center text-gray-600">{item.sampai}</td>
                      <td className="px-4 py-4 text-center"><span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">{item.status}</span></td>
                      <td className="px-4 py-4"><div className="flex items-center justify-center gap-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600" id={`view-penunjang-${item.id}`}><Eye className="h-4 w-4" /></button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600" id={`edit-penunjang-${item.id}`}><Pencil className="h-4 w-4" /></button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600" id={`delete-penunjang-${item.id}`}><Trash2 className="h-4 w-4" /></button>
                      </div></td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center"><div className="flex flex-col items-center gap-2"><Search className="h-8 w-8 text-gray-300" /><p className="text-sm text-gray-400">Tidak ada data ditemukan</p></div></td></tr>}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-16">
              <Puzzle className="h-12 w-12 text-gray-200" />
              <p className="text-gray-500 font-medium">Data {tabs[activeTab]}</p>
              <p className="text-sm text-gray-400">Belum ada data untuk kategori ini.</p>
              <Button size="sm" className="mt-2 bg-brand-navy text-white text-xs gap-1.5"><Plus className="h-3.5 w-3.5" /> Tambah Data</Button>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">Menampilkan {filteredData.length} dari {tugasData.length} data</p>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40" disabled={currentPage === 1}><ChevronRight className="h-3.5 w-3.5 rotate-180" /></button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy text-xs font-bold text-white">{currentPage}</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40" disabled><ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
