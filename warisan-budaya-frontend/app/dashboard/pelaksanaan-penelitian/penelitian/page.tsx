"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, RefreshCw, Plus, Search, Pencil, Trash2, Home, ChevronRight, TestTube, X } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface Research {
  id?: number;
  judul: string;
  bidang_ilmu: string;
  tahun_pelaksanaan: string;
  durasi: string;
}

export default function PenelitianPage() {
  const [user, setUser] = useState<{ name: string; role: string; photo: string } | null>(null);
  const [data, setData] = useState<Research[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Research>>({});

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) setUser(JSON.parse(s));
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/research");
      if (res.data && res.data.data) {
        setData(res.data.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data dari API", err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Map nama field Indonesia ke nama kolom database
      const payload = {
        title: formData.judul,
        scientific_field: formData.bidang_ilmu,
        implementation_year: formData.tahun_pelaksanaan,
        duration: formData.durasi,
      };

      if (formData.id) {
        await api.put(`/research/${formData.id}`, payload);
        toast.success("Data Penelitian berhasil diubah");
      } else {
        await api.post("/research", payload);
        toast.success("Data Penelitian berhasil ditambahkan");
      }

      setIsSheetOpen(false);
    } catch (error) {
      toast.error("Gagal menyimpan data");
      console.error(error);
    } finally {
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/research/${id}`);
        setData(data.filter(item => item.id !== id));
        toast.success("Data berhasil dihapus");
      } catch (error) {
        toast.error("Gagal menghapus data");
      }
    }
  };

  if (!user) return null;

  const filteredData = data.filter(i =>
    (i.judul && i.judul.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (i.bidang_ilmu && i.bidang_ilmu.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500"><span className="text-brand-navy font-medium">Universitas Udayana</span><span className="mx-2">/</span><span>Laboratorium Warisan Budaya Digital</span></div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-gray-400" /><span className="text-gray-400">Ikhtisar</span><ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-brand-navy font-medium">Pelaksanaan Penelitian</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-brand-navy/80 font-medium">Penelitian</span>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-navy/5 to-transparent p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-amber-600/70 mb-1">PENGABDIAN</p>
              <h2 className="text-2xl font-medium text-gray-600">Riwayat Penelitian</h2>
              <p className="mt-1.5 text-sm text-gray-500">Data rekam jejak penelitian dan karya ilmiah.</p>
            </div>
            <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5"><span className="text-xs font-medium text-gray-500">{filteredData.length} data</span></div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Cari Judul Penelitian..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-10 text-sm border-gray-200 rounded-lg text-gray-900 bg-white" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={fetchData} className="text-xs gap-1.5 border-gray-300 text-gray-700 bg-white"><RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} /> Muat Ulang</Button>
              <Button size="sm" onClick={() => { setFormData({}); setIsSheetOpen(true); }} className="bg-brand-navy text-white hover:bg-brand-navy/90 text-xs gap-1.5"><Plus className="h-3.5 w-3.5" /> Tambah Data</Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-12">No.</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Judul Penelitian</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Bidang Ilmu</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Tahun Pelaksanaan</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Durasi (Bulan)</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 w-28">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-4 font-medium text-gray-800">{item.judul}</td>
                    <td className="px-4 py-4 text-gray-600">{item.bidang_ilmu}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{item.tahun_pelaksanaan}</td>
                    <td className="px-4 py-4 text-center text-gray-600 font-semibold">{item.durasi}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => { setFormData(item); setIsSheetOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(item.id!)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">{isLoading ? "Memuat data..." : "Tidak ada data Penelitian ditemukan."}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-brand-navy p-6 pt-8 text-white relative flex-shrink-0">
              <button onClick={() => setIsSheetOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <TestTube className="h-6 w-6 text-brand-gold" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-semibold m-0">{formData.id ? "Edit Data Penelitian" : "Tambah Data Penelitian"}</h2>
                  <p className="text-gray-300 mt-1 text-sm">Lengkapi formulir di bawah ini dengan data yang valid.</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Judul Penelitian <span className="text-red-500">*</span></label>
                <Input value={formData.judul || ""} onChange={(e) => setFormData({...formData, judul: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Masukkan judul penelitian..." />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Bidang Ilmu <span className="text-red-500">*</span></label>
                <Input value={formData.bidang_ilmu || ""} onChange={(e) => setFormData({...formData, bidang_ilmu: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Sistem Informasi, Budaya Digital, dsb..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tahun Pelaksanaan <span className="text-red-500">*</span></label>
                  <Input type="number" value={formData.tahun_pelaksanaan || ""} onChange={(e) => setFormData({...formData, tahun_pelaksanaan: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Cth: 2026" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Durasi (Bulan) <span className="text-red-500">*</span></label>
                  <Input type="number" value={formData.durasi || ""} onChange={(e) => setFormData({...formData, durasi: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Cth: 6" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 p-5 flex justify-end gap-3 bg-gray-50 flex-shrink-0">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)} className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">Batal</Button>
              <Button onClick={handleSave} className="bg-brand-navy hover:bg-brand-navy/90 text-white">Simpan Data</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
