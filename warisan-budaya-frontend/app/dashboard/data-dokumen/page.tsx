"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Download, RefreshCw, Plus, Search, Eye, Pencil, Trash2, Home, ChevronRight, FileText, File, FileImage, Archive } from "lucide-react";

interface UserData { name: string; role: string; photo: string; }

const dokumenData = [
  { id: 1, nama: "SK Jabatan Guru Besar", kategori: "Kepegawaian", format: "PDF", ukuran: "2.3 MB", tanggal: "15 Jan 2018", status: "Valid" },
  { id: 2, nama: "Ijazah S3 - UGM", kategori: "Pendidikan", format: "PDF", ukuran: "1.8 MB", tanggal: "20 Mar 2010", status: "Valid" },
  { id: 3, nama: "Sertifikat SERDOS", kategori: "Kompetensi", format: "PDF", ukuran: "0.9 MB", tanggal: "10 Jun 2008", status: "Valid" },
  { id: 4, nama: "KTP", kategori: "Identitas", format: "JPG", ukuran: "0.5 MB", tanggal: "01 Jan 2024", status: "Valid" },
  { id: 5, nama: "NPWP", kategori: "Identitas", format: "PDF", ukuran: "0.3 MB", tanggal: "15 Feb 2005", status: "Valid" },
  { id: 6, nama: "Laporan Penelitian 2024", kategori: "Penelitian", format: "PDF", ukuran: "5.2 MB", tanggal: "31 Des 2024", status: "Terbit" },
  { id: 7, nama: "Sertifikat Best Paper 2021", kategori: "Penghargaan", format: "PDF", ukuran: "1.1 MB", tanggal: "18 Nov 2021", status: "Valid" },
  { id: 8, nama: "HKI – Aksara Bali Digital", kategori: "HKI", format: "PDF", ukuran: "0.7 MB", tanggal: "05 Sep 2022", status: "Valid" },
];

const kategoris = ["Semua", "Kepegawaian", "Pendidikan", "Kompetensi", "Identitas", "Penelitian", "Penghargaan", "HKI"];

const formatIcon = (format: string) => {
  if (format === "PDF") return <FileText className="h-5 w-5 text-red-500" />;
  if (format === "JPG" || format === "PNG") return <FileImage className="h-5 w-5 text-blue-500" />;
  if (format === "ZIP" || format === "RAR") return <Archive className="h-5 w-5 text-yellow-500" />;
  return <File className="h-5 w-5 text-gray-500" />;
};

export default function DataDokumenPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeKategori, setActiveKategori] = useState("Semua");
  const [currentPage] = useState(1);
  useEffect(() => { const s = localStorage.getItem("user"); if (s) setUser(JSON.parse(s)); }, []);
  if (!user) return null;
  const filteredData = dokumenData.filter(i => {
    const matchSearch = i.nama.toLowerCase().includes(searchQuery.toLowerCase()) || i.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori = activeKategori === "Semua" || i.kategori === activeKategori;
    return matchSearch && matchKategori;
  });

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
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500"><FileText className="h-3 w-3" /> {dokumenData.length} dokumen tersimpan</div>
            </div>
          </div>
          <div className="flex gap-2">
            
            <Button size="sm" variant="outline" className="text-xs gap-1.5 border-gray-300"><Download className="h-3 w-3" /> Unduh CV</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-gray-400" /><span className="text-gray-400">Ikhtisar</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-brand-navy/80 font-medium">Data Dokumen</span>
      </div>
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-navy/5 to-transparent p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div><p className="text-xs font-medium uppercase tracking-wider text-amber-600/70 mb-1">REPOSITORI DOKUMEN</p><h2 className="text-2xl font-medium text-gray-600">Data Dokumen</h2><p className="mt-1.5 text-sm text-gray-500">Manajemen seluruh dokumen pendukung keperluan akademis dan administrasi.</p></div>
            <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5"><span className="text-xs font-medium text-gray-500">{filteredData.length} file</span></div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="relative max-w-xs"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="Cari dokumen..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-10 text-sm border-gray-200 rounded-lg" /></div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs gap-1.5 border-gray-300"><Download className="h-3.5 w-3.5" /> Ekspor</Button>
              <Button size="sm" className="bg-brand-navy text-white text-xs gap-1.5"><Plus className="h-3.5 w-3.5" /> Upload Dokumen</Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {kategoris.map(k => (
              <button key={k} onClick={() => setActiveKategori(k)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeKategori === k ? "bg-brand-navy text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{k}</button>
            ))}
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm" id="dokumen-table">
              <thead><tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-12">No.</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Nama Dokumen</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Kategori</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Format</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Ukuran</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Tanggal</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 w-28">Aksi</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {formatIcon(item.format)}
                        <span className="font-medium text-gray-800">{item.nama}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4"><span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-700">{item.kategori}</span></td>
                    <td className="px-4 py-4 text-center font-mono text-xs text-gray-600">{item.format}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{item.ukuran}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{item.tanggal}</td>
                    <td className="px-4 py-4 text-center"><span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">{item.status}</span></td>
                    <td className="px-4 py-4"><div className="flex items-center justify-center gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600" id={`view-dokumen-${item.id}`}><Eye className="h-4 w-4" /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-green-50 hover:text-green-600" id={`download-dokumen-${item.id}`}><Download className="h-4 w-4" /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600" id={`edit-dokumen-${item.id}`}><Pencil className="h-4 w-4" /></button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600" id={`delete-dokumen-${item.id}`}><Trash2 className="h-4 w-4" /></button>
                    </div></td>
                  </tr>
                ))}
                {filteredData.length === 0 && <tr><td colSpan={8} className="px-4 py-12 text-center"><div className="flex flex-col items-center gap-2"><Search className="h-8 w-8 text-gray-300" /><p className="text-sm text-gray-400">Tidak ada dokumen ditemukan</p></div></td></tr>}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">Menampilkan {filteredData.length} dari {dokumenData.length} dokumen</p>
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
