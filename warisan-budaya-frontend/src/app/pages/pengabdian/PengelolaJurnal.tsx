import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface PengelolaJurnalData {
  id: number;
  nama_jurnal: string;
  nomor_sk: string;
  tanggal_berlaku: string;
  tanggal_selesai: string;
  status_aktif: boolean;
  peran: string;
}

const mockData: PengelolaJurnalData[] = [
  {
    id: 1,
    nama_jurnal: 'Jurnal Pendidikan dan Teknologi Indonesia (JPTI)',
    nomor_sk: 'SK-JOURNAL-2023-99',
    tanggal_berlaku: '2023-01-01',
    tanggal_selesai: '2025-12-31',
    status_aktif: true,
    peran: 'Editor in Chief',
  },
];

export function PengelolaJurnal() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-brand-card">Data Pengelola Jurnal</h2>
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
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Nama Jurnal</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Peran</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Nomor SK</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Periode</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Status</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-border-dark' : ''}`}>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.nama_jurnal}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.peran}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.nomor_sk}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">
                    {item.tanggal_berlaku} - {item.tanggal_selesai}
                  </td>
                  <td className="px-3.5">
                    <span className={`inline-flex items-center px-1.5 py-0.5 text-[11px] font-medium rounded-[4px] border ${
                      item.status_aktif
                        ? 'bg-green-900/20 text-green-400 border-green-900/30'
                        : 'bg-gray-800 text-text-placeholder border-border-dark'
                    }`}>
                      {item.status_aktif ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
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
