import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface BimbinganData {
  id: number;
  semester: string;
  kategori_kegiatan: string;
  jenis_bimbingan: string;
  bidang_ilmu: string;
  program_studi: string;
}

const mockData: BimbinganData[] = [
  {
    id: 1,
    semester: '2023 GANJIL',
    kategori_kegiatan: 'Bimbingan Skripsi',
    jenis_bimbingan: 'Pembimbing Utama',
    bidang_ilmu: 'Sistem Informasi',
    program_studi: 'Teknik Informatika',
  },
];

export function BimbinganMahasiswa() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-brand-card">Data Bimbingan Mahasiswa</h2>
        <div className="flex gap-2">
          {canWrite && (
            <>
              <button className="h-[32px] px-3 text-xs border border-border-dark rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors">
                Riwayat Ajuan
              </button>
              <button className="h-[32px] px-3 text-xs bg-info text-brand-card rounded-[4px] hover:bg-info-hover transition-colors flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Tambah Data
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-surface-dark border border-border-dark rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-darker h-[36px]">
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Semester</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Kategori</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Jenis Bimbingan</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Bidang Ilmu</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Prodi</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-border-dark' : ''}`}>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.semester}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.kategori_kegiatan}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.jenis_bimbingan}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.bidang_ilmu}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.program_studi}</td>
                  <td className="px-3.5">
                    <div className="flex items-center gap-2">
                      {canWrite && (
                        <button className="text-[11px] text-red-600 hover:text-red-700">Hapus</button>
                      )}
                      <button className="h-[26px] px-2 text-[11px] border border-border-dark rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors flex items-center gap-1">
                        <Eye className="w-3 h-3" strokeWidth={2} />
                        Lihat Rincian
                      </button>
                      {canWrite && (
                        <button className="h-[26px] px-2 text-[11px] border border-border-dark rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors flex items-center gap-1">
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
