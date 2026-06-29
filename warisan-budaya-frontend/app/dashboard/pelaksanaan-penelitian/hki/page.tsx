"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, RefreshCw, Plus, Search, Pencil, Trash2, Home, ChevronRight, BookOpen, X } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface HKI {
  id?: number;
  jenis_hki: string;
  judul: string;
  quartil: string;
  nomor_sertifikat: string;
  tanggal_terbit: string;
}

export default function HKIPage() {
  const [user, setUser] = useState<{ name: string; role: string; photo: string } | null>(null);
  const [data, setData] = useState<HKI[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<HKI>>({});

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) setUser(JSON.parse(s));
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/hkis");
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
        hki_type: formData.jenis_hki,
        title: formData.judul,
        quartile: formData.quartil,
        certificate_number: formData.nomor_sertifikat,
        publish_date: formData.tanggal_terbit,
      };

      if (formData.id) {
        await api.put(`/hkis/${formData.id}`, payload);
        toast.success("Data HKI berhasil diubah");
      } else {
        await api.post("/hkis", payload);
        toast.success("Data HKI berhasil ditambahkan");
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
        await api.delete(`/hkis/${id}`);
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
    (i.nomor_sertifikat && i.nomor_sertifikat.toLowerCase().includes(searchQuery.toLowerCase()))
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
        <span className="text-brand-navy font-medium">Pelaksanaan Penelitian</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-brand-navy/80 font-medium">HKI</span>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-navy/5 to-transparent p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-amber-600/70 mb-1">PENGABDIAN</p>
              <h2 className="text-2xl font-medium text-gray-600">Hak Kekayaan Intelektual (HKI)</h2>
              <p className="mt-1.5 text-sm text-gray-500">Data HKI yang telah dicatatkan atau dipatenkan.</p>
            </div>
            <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5"><span className="text-xs font-medium text-gray-500">{filteredData.length} data</span></div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Cari HKI..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-10 text-sm border-gray-200 rounded-lg text-gray-900 bg-white" />
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
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Judul</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Jenis</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Quartile</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">No. Sertifikat</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Tanggal</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 w-28">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-4 font-medium text-gray-800">{item.judul}</td>
                    <td className="px-4 py-4 text-gray-600">{item.jenis_hki}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{item.quartil}</td>
                    <td className="px-4 py-4 text-gray-600 font-mono text-xs">{item.nomor_sertifikat}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{item.tanggal_terbit}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => { setFormData(item); setIsSheetOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(item.id!)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">{isLoading ? "Memuat data..." : "Tidak ada data HKI ditemukan."}</td></tr>}
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
                  <BookOpen className="h-6 w-6 text-brand-gold" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-semibold m-0">{formData.id ? "Edit Data HKI" : "Tambah Data HKI"}</h2>
                  <p className="text-gray-300 mt-1 text-sm">Lengkapi formulir di bawah ini dengan data yang valid.</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Jenis HKI <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
                    value={formData.jenis_hki || ""}
                    onChange={(e) => setFormData({...formData, jenis_hki: e.target.value})}
                  >
                    <option value="" disabled>Pilih Jenis HKI</option>
                    <option value="Paten">Paten</option>
                    <option value="Hak Cipta">Hak Cipta</option>
                    <option value="Merek Dagang">Merek Dagang</option>
                    <option value="Desain Industri">Desain Industri</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Judul HKI <span className="text-red-500">*</span></label>
                <Input value={formData.judul || ""} onChange={(e) => setFormData({...formData, judul: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Masukkan judul..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Quartile</label>
                  <Input value={formData.quartil || ""} onChange={(e) => setFormData({...formData, quartil: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Cth: Q1" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tanggal Publish <span className="text-red-500">*</span></label>
                  <Input type="date" value={formData.tanggal_terbit || ""} onChange={(e) => setFormData({...formData, tanggal_terbit: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nomor Sertifikat <span className="text-red-500">*</span></label>
                <Input value={formData.nomor_sertifikat || ""} onChange={(e) => setFormData({...formData, nomor_sertifikat: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Masukkan nomor sertifikat..." />
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
