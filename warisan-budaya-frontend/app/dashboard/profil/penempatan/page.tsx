
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Search, Plus, Home, ChevronRight, RefreshCw, Pencil, Trash2, X, FileText } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface DataModel {
  id?: number;
  status: string;
  ikatan_kerja: string;
  unit: string;
  universitas: string;
  tanggal_mulai: string;
}

export default function PenempatanPage() {
  const [user, setUser] = useState<{ name: string; role: string; photo: string } | null>(null);
  const [data, setData] = useState<DataModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<DataModel>>({});

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) setUser(JSON.parse(s));
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/placements");
      if (res.data && res.data.data) {
        setData(res.data.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data dari API", err);
      toast.error("Gagal mengambil data Penempatan");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        status: formData.status,
        employment_bond: formData.ikatan_kerja,
        unit: formData.unit,
        university: formData.universitas,
        start_date: formData.tanggal_mulai,
      };

      if (formData.id) {
        await api.put(`/placements/${formData.id}`, payload);
        toast.success("Data Penempatan berhasil diubah");
      } else {
        await api.post("/placements", payload);
        toast.success("Data Penempatan berhasil ditambahkan");
      }

      setIsSheetOpen(false);
    } catch (error: any) {
      const fieldErrors = error.response?.data?.errors;
      const errorMessage = fieldErrors ? Object.values(fieldErrors).flat()[0] as string : (error.response?.data?.message || "Gagal menyimpan data");
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsSubmitting(false);
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/placements/${id}`);
        setData(data.filter(item => item.id !== id));
        toast.success("Data berhasil dihapus");
      } catch (error) {
        toast.error("Gagal menghapus data");
      }
    }
  };

  const openSheetForAdd = () => {
    setFormData({});
    setIsSheetOpen(true);
  };

  const openSheetForEdit = (item: DataModel) => {
    setFormData(item);
    setIsSheetOpen(true);
  };


  if (!user) return null;

  const filteredData = data.filter((i: any) => {
    const q = searchQuery.toLowerCase();
    return (i.unit && String(i.unit).toLowerCase().includes(q)) || (i.universitas && String(i.universitas).toLowerCase().includes(q)) || (i.status && String(i.status).toLowerCase().includes(q)) || false;
  });

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
        <span className="text-brand-navy font-medium">Profil</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-brand-navy/80 font-medium">Penempatan</span>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Data Penempatan</h2>
              <p className="text-xs text-gray-500 mt-0.5">{data.length} data ditemukan</p>
            </div>
            <div className="flex items-center gap-2">

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Cari..." className="pl-9 h-9 text-sm w-56 border-gray-200" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button size="sm" className="bg-brand-navy text-white hover:bg-brand-navy/90 text-xs gap-1.5" onClick={openSheetForAdd}><Plus className="h-3.5 w-3.5" /> Tambah Data</Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-12">No.</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Ikatan Kerja</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Perguruan Tinggi</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">TMT</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item: any, idx: number) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-4 text-gray-500 align-top">{idx + 1}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.status || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.ikatan_kerja || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.unit || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.universitas || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-700">{item.tanggal_mulai || "-"}</td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openSheetForEdit(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
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

      {isSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="bg-brand-navy p-6 pt-8 text-white relative flex-shrink-0">
              <button onClick={() => setIsSheetOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <FileText className="h-6 w-6 text-brand-gold" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-semibold m-0">{formData.id ? "Edit Data Penempatan" : "Tambah Data Penempatan"}</h2>
                  <p className="text-gray-300 mt-1 text-sm">Lengkapi detail penempatan atau riwayat unit kerja Anda.</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Status <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
                    value={formData.status || "AKTIF"}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="AKTIF">AKTIF</option>
                    <option value="TIDAK AKTIF">TIDAK AKTIF</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Ikatan Kerja <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
                    value={formData.ikatan_kerja || "DOSEN TETAP"}
                    onChange={(e) => setFormData({...formData, ikatan_kerja: e.target.value})}
                  >
                    <option value="DOSEN TETAP">DOSEN TETAP</option>
                    <option value="DOSEN TIDAK TETAP">DOSEN TIDAK TETAP</option>
                    <option value="PEGAWAI TETAP">PEGAWAI TETAP</option>
                    <option value="PEGAWAI KONTRAK">PEGAWAI KONTRAK</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Unit Kerja <span className="text-red-500">*</span></label>
                <Input 
                  placeholder="Contoh: Fakultas Ilmu Komputer" 
                  value={formData.unit || ""}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="h-10 bg-white border border-gray-300 text-gray-900 focus-visible:ring-brand-navy/20 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Perguruan Tinggi <span className="text-red-500">*</span></label>
                  <Input 
                    placeholder="Contoh: Universitas Udayana" 
                    value={formData.universitas || ""}
                    onChange={(e) => setFormData({...formData, universitas: e.target.value})}
                    className="h-10 bg-white border border-gray-300 text-gray-900 focus-visible:ring-brand-navy/20 shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Terhitung Mulai Tanggal (TMT) <span className="text-red-500">*</span></label>
                  <Input 
                    type="date"
                    value={formData.tanggal_mulai || ""}
                    onChange={(e) => setFormData({...formData, tanggal_mulai: e.target.value})}
                    className="h-10 bg-white border border-gray-300 text-gray-900 focus-visible:ring-brand-navy/20 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 flex items-center justify-end gap-3 flex-shrink-0 border-t border-gray-100">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)} className="h-10 bg-white" disabled={isSubmitting}>Batal</Button>
              <Button onClick={handleSave} disabled={isSubmitting} className="h-10 bg-brand-navy hover:bg-brand-navy/90 text-white px-8">
                {isSubmitting ? "Menyimpan..." : "Simpan Data"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
