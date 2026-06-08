"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Download,
  RefreshCw,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Home,
  ChevronRight,
} from "lucide-react";

interface UserData {
  name: string;
  role: string;
  photo: string;
}

const pendidikanData = [
  {
    id: 1,
    jenjang: "S1",
    programStudi: "Seni Mengokang",
    institusi: "UGMakima",
    thLulus: 1991,
    ipk: 3.45,
  },
  {
    id: 2,
    jenjang: "S2",
    programStudi: "Teknik Robot",
    institusi: "UGMakima",
    thLulus: 1998,
    ipk: 3.72,
  },
  {
    id: 3,
    jenjang: "S3",
    programStudi: "Ilmu Yapping",
    institusi: "UGMakima",
    thLulus: 2010,
    ipk: 3.88,
  },
];

export default function PendidikanFormalPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  const filteredData = pendidikanData.filter(
    (item) =>
      item.programStudi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institusi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jenjang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalData = filteredData.length;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="text-[#1E3A5F] font-medium">Universitas Ivan</span>
        <span className="mx-2">/</span>
        <span>Laboratorium Warisan Budaya Digital</span>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-3 border-[#C9A84C]">
              <img
                src={user.photo}
                alt={user.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-700">Kadek Pasek Divandra Kusuma</h1>
              <p className="text-sm text-[#C9A84C] font-medium">Guru Besar</p>
              <p className="text-xs text-gray-400">
                Prodi DIK · Fakultas Nomor 3 · Universitas Ganteng
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                  NIDN: 0001196801
                </span>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-medium text-indigo-600">
                  NIP: 196809311993162660
                </span>
                <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-medium text-teal-600">
                  SISTERID: 5678991
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            
            <Button
              size="sm"
              variant="outline"
              className="text-xs gap-1.5 border-gray-300"
            >
              <Download className="h-3 w-3" />
              Unduh CV
            </Button>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-gray-400" />
        <span className="text-gray-400">Ikhtisar</span>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-[#1E3A5F] font-medium">Kualifikasi</span>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-[#1E3A5F] font-semibold">Pendidikan Formal</span>
      </div>

      {/* Title Section */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#1E3A5F]/5 to-transparent p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-1">
                KUALIFIKASI
              </p>
              <h2 className="text-2xl font-medium text-gray-600">Pendidikan Formal</h2>
              <p className="mt-1.5 text-sm text-gray-500">
                Riwayat jenjang pendidikan formal yang telah ditempuh.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-medium text-emerald-700">Lengkap</span>
              </div>
              <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5">
                <span className="text-xs font-medium text-gray-500">{totalData} data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Cari data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-sm border-gray-200 rounded-lg focus:border-[#1E3A5F] focus:ring-[#1E3A5F]/20"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs gap-1.5 border-gray-300 hover:bg-gray-50"
              >
                <Download className="h-3.5 w-3.5" />
                Ekspor
              </Button>
              <Button
                size="sm"
                className="bg-[#1E3A5F] text-white hover:bg-[#2a4f7a] text-xs gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Tambah Data
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm" id="pendidikan-formal-table">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-16">
                    No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Jenjang
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Program Studi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Institusi
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                    Th. Lulus
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                    IPK
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 w-28">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-gray-50/50 group"
                  >
                    <td className="px-4 py-4 text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full bg-[#1E3A5F]/10 px-2.5 py-0.5 text-xs font-semibold text-[#1E3A5F]">
                        {item.jenjang}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-800">
                      {item.programStudi}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {item.institusi}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      {item.thLulus}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="font-semibold text-gray-800">
                        {item.ipk.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                          title="Lihat"
                          id={`view-pendidikan-${item.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-yellow-50 hover:text-yellow-600"
                          title="Edit"
                          id={`edit-pendidikan-${item.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-red-50 hover:text-red-600"
                          title="Hapus"
                          id={`delete-pendidikan-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p className="text-sm text-gray-400">Tidak ada data ditemukan</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Menampilkan {filteredData.length} dari {pendidikanData.length} data
            </p>
            <div className="flex items-center gap-1">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:opacity-40"
                disabled={currentPage === 1}
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E3A5F] text-xs font-bold text-white shadow-sm">
                {currentPage}
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:opacity-40"
                disabled
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
