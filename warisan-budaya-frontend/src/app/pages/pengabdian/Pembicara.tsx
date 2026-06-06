import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface PembicaraData {
  id: number;
  kategori_kegiatan: string;
  judul_makalah: string;
  nama_dosen_tamu: string;
  penyelenggara: string;
  tanggal_kegiatan: string;
}

const mockData: PembicaraData[] = [
  {
    id: 1,
    kategori_kegiatan: 'Narasumber Workshop',
    judul_makalah: 'Pentingnya Metadata Standar Internasional dalam Katalogisasi Lontar',
    nama_dosen_tamu: 'Dr. Anak Agung Candra Gunawan',
    penyelenggara: 'Dinas Kebudayaan Provinsi Bali',
    tanggal_kegiatan: '2024-04-12',
  },
];

export function Pembicara() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-white">Data Pembicara/Narasumber</h2>
        <div className="flex gap-2">
          {canWrite && (
            <>
              <button className="h-[32px] px-3 text-xs border border-gray-700 rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors">
                Riwayat Ajuan
              </button>
              <button className="h-[32px] px-3 text-xs bg-[#06B6D4] text-white rounded-[4px] hover:bg-[#0891B2] transition-colors flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Tambah Data
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#111827] h-[36px]">
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Kategori</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Judul Makalah</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Nama</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Penyelenggara</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Tanggal</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-gray-700' : ''}`}>
                  <td className="px-3.5 text-[11px] text-white">{item.kategori_kegiatan}</td>
                  <td className="px-3.5 text-[11px] text-white max-w-[250px] truncate">{item.judul_makalah}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.nama_dosen_tamu}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.penyelenggara}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.tanggal_kegiatan}</td>
                  <td className="px-3.5">
                    <div className="flex items-center gap-2">
                      {canWrite && (
                        <button className="text-[11px] text-red-600 hover:text-red-700">Hapus</button>
                      )}
                      <button className="h-[26px] px-2 text-[11px] border border-gray-700 rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors flex items-center gap-1">
                        <Eye className="w-3 h-3" strokeWidth={2} />
                        Lihat Rincian
                      </button>
                      {canWrite && (
                        <button className="h-[26px] px-2 text-[11px] border border-gray-700 rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors flex items-center gap-1">
                          <Pencil className="w-3 h-3" strokeWidth={2} />
                          Ubah
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
