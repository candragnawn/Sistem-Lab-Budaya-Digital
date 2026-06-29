
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Search, Plus, Home, ChevronRight, RefreshCw, Pencil, Trash2 } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface DataModel {
  id: number;
  task_name: string;
  unit: string;
  sk_number: string;
  start_date: string;
  end_date: string;
}

export default function TugasTambahanPage() {
  const [user, setUser] = useState<{name: string; role: string; photo: string} | null>(null);
  const [data, setData] = useState<DataModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    const s = localStorage.getItem("user"); 
    if (s) setUser(JSON.parse(s)); 
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/additional-tasks");
      if (res.data && res.data.data) {
        setData(res.data.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data dari API", err);
      toast.error("Gagal mengambil data Tugas Tambahan");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  const filteredData = data.filter((i: any) => {
    const q = searchQuery.toLowerCase();
    return (i.task_name && String(i.task_name).toLowerCase().includes(q)) || (i.unit && String(i.unit).toLowerCase().includes(q)) || (i.nomor_sk && String(i.nomor_sk).toLowerCase().includes(q)) || false;
  });

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500"><span className="text-brand-navy font-medium">Universitas Udayana</span><span className="mx-2">/</span><span>Laboratorium Warisan Budaya Digital</span></div>
      
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-brand-gold">
              <img src={user.photo || "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"} alt={user.name} className="h-full w-full object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white"><CheckCircle className="h-3 w-3 text-white" /></div>
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
        <span className="text-brand-navy font-medium">Penunjang</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-brand-navy/80 font-medium">Tugas Tambahan</span>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Data Tugas Tambahan</h2>
              <p className="text-xs text-gray-500 mt-0.5">{data.length} data ditemukan</p>
            </div>
            <div className="flex items-center gap-2">
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Cari..." className="pl-9 h-9 text-sm w-56 border-gray-200" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button size="sm" className="bg-brand-navy text-white hover:bg-brand-navy/90 text-xs gap-1.5" onClick={() => toast.info("Fitur Tambah belum diaktifkan")}><Plus className="h-3.5 w-3.5" /> Tambah Data</Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-12">No.</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Nama Tugas</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Unit Kerja</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Nomor SK</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">TMT Mulai</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">TMT Selesai</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item: any, idx: number) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-4 text-gray-500 align-top">{idx + 1}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.task_name || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.unit || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.nomor_sk || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.tanggal_mulai || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.tanggal_selesai || "-"}</td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-center justify-center gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"><Pencil className="h-4 w-4" /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">{isLoading ? "Memuat data..." : "Belum ada data."}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
