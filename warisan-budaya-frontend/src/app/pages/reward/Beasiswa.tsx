import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface BeasiswaData {
  id: number;
  jenis_beasiswa: string;
  nama_beasiswa: string;
  tahun_mulai: number;
  tahun_selesai: number;
  status_aktif: boolean;
}

const mockData: BeasiswaData[] = [
  {
    id: 1,
    jenis_beasiswa: 'Beasiswa Studi Lanjut (Doktoral)',
    nama_beasiswa: 'Beasiswa Unggulan Dosen Indonesia (BUDI-DN)',
    tahun_mulai: 2019,
    tahun_selesai: 2023,
    status_aktif: false,
  },
];

export function Beasiswa() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-white">Data Beasiswa</h2>
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
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Jenis Beasiswa</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Nama Beasiswa</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Tahun Mulai</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Tahun Selesai</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Status</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-gray-700' : ''}`}>
                  <td className="px-3.5 text-[11px] text-white">{item.jenis_beasiswa}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.nama_beasiswa}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.tahun_mulai}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.tahun_selesai}</td>
                  <td className="px-3.5">
                    <span className={`inline-flex items-center px-1.5 py-0.5 text-[11px] font-medium rounded-[4px] border ${
                      item.status_aktif
                        ? 'bg-green-900/20 text-green-400 border-green-900/30'
                        : 'bg-gray-800 text-gray-400 border-gray-700'
                    }`}>
                      {item.status_aktif ? 'Aktif' : 'Selesai'}
                    </span>
                  </td>
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
