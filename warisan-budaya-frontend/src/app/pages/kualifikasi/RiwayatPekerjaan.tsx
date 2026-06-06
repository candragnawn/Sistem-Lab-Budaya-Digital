import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface RiwayatPekerjaanData {
  id: number;
  perusahaan_organisasi: string;
  jabatan_posisi: string;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  deskripsi_tugas: string;
}

const mockData: RiwayatPekerjaanData[] = [
  {
    id: 1,
    perusahaan_organisasi: 'PT. Teknologi Nusantara',
    jabatan_posisi: 'Senior Software Engineer',
    tanggal_mulai: '01 Januari 2008',
    tanggal_selesai: '31 Desember 2010',
    deskripsi_tugas: 'Pengembangan sistem informasi manajemen perusahaan',
  },
  {
    id: 2,
    perusahaan_organisasi: 'CV. Digital Indonesia',
    jabatan_posisi: 'Programmer',
    tanggal_mulai: '15 Maret 2005',
    tanggal_selesai: '30 November 2007',
    deskripsi_tugas: 'Pengembangan aplikasi web dan mobile',
  },
];

export function RiwayatPekerjaan() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-white">Riwayat Pekerjaan</h2>
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

      {/* Table */}
      <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#111827] h-[36px]">
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Perusahaan/Organisasi</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Jabatan/Posisi</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Periode</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Deskripsi Tugas</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-gray-700' : ''}`}>
                  <td className="px-3.5 text-[11px] text-white">{item.perusahaan_organisasi}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.jabatan_posisi}</td>
                  <td className="px-3.5 text-[11px] text-white">
                    {item.tanggal_mulai} - {item.tanggal_selesai || 'Sekarang'}
                  </td>
                  <td className="px-3.5 text-[11px] text-white max-w-[300px] truncate">
                    {item.deskripsi_tugas}
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
