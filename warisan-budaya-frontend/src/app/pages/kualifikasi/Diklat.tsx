import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface DiklatData {
  id: number;
  nama_diklat: string;
  jenis_diklat: string;
  penyelenggara: string;
  tahun_pelaksanaan: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  nomor_sertifikat: string;
}

const mockData: DiklatData[] = [
  {
    id: 1,
    nama_diklat: 'Pelatihan Metodologi Penelitian',
    jenis_diklat: 'Pelatihan Teknis',
    penyelenggara: 'Kementerian Pendidikan dan Kebudayaan',
    tahun_pelaksanaan: 2023,
    tanggal_mulai: '10 Maret 2023',
    tanggal_selesai: '15 Maret 2023',
    nomor_sertifikat: 'DIKLAT/2023/0045',
  },
  {
    id: 2,
    nama_diklat: 'Workshop Machine Learning',
    jenis_diklat: 'Workshop',
    penyelenggara: 'IEEE Indonesia Chapter',
    tahun_pelaksanaan: 2022,
    tanggal_mulai: '05 Oktober 2022',
    tanggal_selesai: '07 Oktober 2022',
    nomor_sertifikat: 'WS/IEEE/2022/123',
  },
];

export function Diklat() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-brand-card">Riwayat Diklat</h2>
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

      {/* Table */}
      <div className="bg-surface-dark border border-border-dark rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-darker h-[36px]">
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Nama Diklat</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Jenis</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Penyelenggara</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Tahun</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Periode</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">No. Sertifikat</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-border-dark' : ''}`}>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.nama_diklat}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.jenis_diklat}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.penyelenggara}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.tahun_pelaksanaan}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">
                    {item.tanggal_mulai} - {item.tanggal_selesai}
                  </td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.nomor_sertifikat}</td>
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
