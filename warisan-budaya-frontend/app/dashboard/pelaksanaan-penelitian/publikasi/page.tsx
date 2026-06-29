"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, RefreshCw, Plus, Search, Pencil, Trash2, Home, ChevronRight, FileText, X } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface Publication {
  id?: number;
  kategori: string;
  tipe: string;
  judul: string;
  sumber: string;
  kuartil: string;
  nama_jurnal: string;
  issn: string;
  doi: string;
  tahun: string;
  status_verifikasi: boolean;
  url?: string | null;
}

export default function PublikasiPage() {
  const [user, setUser] = useState<{ name: string; role: string; photo: string } | null>(null);
  const [data, setData] = useState<Publication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Publication>>({});

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) setUser(JSON.parse(s));
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/publications");
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
      // Map nama field Indonesia ke nama kolom database untuk dikirim ke backend
      const payload = {
        title: formData.judul,
        category: formData.kategori,
        type: formData.tipe,
        source: formData.sumber,
        quartile: formData.kuartil,
        journal_name: formData.nama_jurnal,
        issn: formData.issn,
        doi: formData.doi,
        year: formData.tahun,
        is_verified: formData.status_verifikasi,
      };

      if (formData.id) {
        await api.put(`/publications/${formData.id}`, payload);
        toast.success("Data Publikasi berhasil diubah");
      } else {
        await api.post("/publications", payload);
        toast.success("Data Publikasi berhasil ditambahkan");
      }

      setIsSheetOpen(false);

    } catch (error) {
      toast.error("Gagal menyimpan data");
      console.error(error);
    } finally {
      // Selalu refresh data dari server agar UI sinkron dengan database
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/publications/${id}`);
        setData(data.filter(item => item.id !== id));
        toast.success("Data berhasil dihapus");
      } catch (error) {
        toast.error("Gagal menghapus data");
      }
    }
  };

  const openSheetForAdd = () => {
    setFormData({ kategori: "PENELITIAN", tipe: "JURNAL", status_verifikasi: false });
    setIsSheetOpen(true);
  };

  const openSheetForEdit = (item: Publication) => {
    setFormData(item);
    setIsSheetOpen(true);
  };

  if (!user) return null;

  const filteredData = data.filter(i =>
    (i.judul && i.judul.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (i.nama_jurnal && i.nama_jurnal.toLowerCase().includes(searchQuery.toLowerCase()))
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Data Publikasi</h2>
            <p className="text-xs text-gray-500 mt-0.5">{data.length} publikasi ditemukan</p>
          </div>
          <div className="flex items-center gap-2">
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Cari judul atau jurnal..." className="pl-9 h-9 text-sm w-56 border-gray-200" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Button size="sm" onClick={openSheetForAdd} className="bg-brand-navy text-white hover:bg-brand-navy/90 text-xs gap-1.5"><Plus className="h-3.5 w-3.5" /> Tambah Data</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 bg-gray-50/80">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-12">No.</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 min-w-[450px] w-1/3">Publikasi</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Sumber</th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Kuartil</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 min-w-[340px] w-1/3">Nama Jurnal</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">ISSN</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">DOI</th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Tahun</th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Status</th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">URL</th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 w-28">Aksi</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-4 text-gray-500 align-top">{idx + 1}</td>
                  <td className="px-4 py-4 align-top">
                    <div className="font-medium text-gray-800 leading-relaxed">{item.judul}</div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[10px] font-bold tracking-wider text-brand-navy uppercase bg-brand-navy/10 px-2 py-0.5 rounded">{item.kategori}</span>
                      <span className="text-[10px] font-medium text-gray-500 uppercase border border-gray-200 px-2 py-0.5 rounded">{item.tipe}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-gray-600">{item.sumber || "-"}</td>
                  <td className="px-4 py-4 text-center align-top text-gray-600 font-bold text-brand-navy">{item.kuartil || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-800">{item.nama_jurnal || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-600 text-xs">{item.issn || "-"}</td>
                  <td className="px-4 py-4 align-top text-gray-600 text-xs">{item.doi || "-"}</td>
                  <td className="px-4 py-4 text-center align-top font-mono text-gray-600">{item.tahun}</td>
                  <td className="px-4 py-4 text-center align-top">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${item.status_verifikasi ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                      {item.status_verifikasi ? "Terverifikasi" : "Belum"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center align-top">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noreferrer" className="text-brand-navy hover:underline text-xs font-medium">Lihat</a>
                    ) : "-"}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openSheetForEdit(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(item.id!)} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && <tr><td colSpan={11} className="px-4 py-12 text-center text-gray-500">{isLoading ? "Memuat data..." : "Tidak ada data Publikasi ditemukan."}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {isSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="bg-brand-navy p-6 pt-8 text-white relative flex-shrink-0">
              <button onClick={() => setIsSheetOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <FileText className="h-6 w-6 text-brand-gold" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-semibold m-0">{formData.id ? "Edit Data Publikasi" : "Tambah Data Publikasi"}</h2>
                  <p className="text-gray-300 mt-1 text-sm">Lengkapi detail jurnal/buku/prosiding.</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Kategori <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
                      value={formData.kategori || "PENELITIAN"}
                      onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                    >
                      <option value="PENELITIAN">PENELITIAN</option>
                      <option value="PENGABDIAN">PENGABDIAN</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tipe <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
                      value={formData.tipe || "ARTIKEL"}
                      onChange={(e) => setFormData({...formData, tipe: e.target.value})}
                    >
                      <option value="ARTIKEL">ARTIKEL</option>
                      <option value="JURNAL">JURNAL</option>
                      <option value="PROSIDING">PROSIDING</option>
                      <option value="BUKU">BUKU</option>
                      <option value="HKI">HKI</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Judul Publikasi <span className="text-red-500">*</span></label>
                <Input value={formData.judul || ""} onChange={(e) => setFormData({...formData, judul: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Masukkan judul..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nama Jurnal</label>
                  <Input value={formData.nama_jurnal || ""} onChange={(e) => setFormData({...formData, nama_jurnal: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Nama jurnal/prosiding..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Sumber</label>
                  <Input value={formData.sumber || ""} onChange={(e) => setFormData({...formData, sumber: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Cth: Scopus, Sinta..." />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Quartile</label>
                  <Input value={formData.kuartil || ""} onChange={(e) => setFormData({...formData, kuartil: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Cth: Q1, S1" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tahun <span className="text-red-500">*</span></label>
                  <Input type="number" value={formData.tahun || ""} onChange={(e) => setFormData({...formData, tahun: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="2026" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Verifikasi <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
                      value={formData.status_verifikasi ? "true" : "false"}
                      onChange={(e) => setFormData({...formData, status_verifikasi: e.target.value === "true"})}
                    >
                      <option value="true">Terverifikasi</option>
                      <option value="false">Belum</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">ISSN</label>
                  <Input value={formData.issn || ""} onChange={(e) => setFormData({...formData, issn: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Cth: 1234-5678" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">DOI</label>
                  <Input value={formData.doi || ""} onChange={(e) => setFormData({...formData, doi: e.target.value})} className="bg-white border-gray-200 text-gray-900 focus-visible:ring-brand-navy/20" placeholder="Cth: 10.123/abcd" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl flex-shrink-0">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)} className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">Batal</Button>
              <Button onClick={handleSave} className="bg-brand-navy hover:bg-brand-navy/90 text-white">Simpan Data</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
