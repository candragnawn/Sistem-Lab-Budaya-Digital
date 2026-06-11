import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface ProfesorEmeritusData {
  id: number;
  nama_gelar: string;
  perguruan_tinggi: string;
  tmt: string;
  tst: string | null;
}

const mockData: ProfesorEmeritusData[] = [
  {
    id: 1,
    nama_gelar: 'Prof. Dr. Rudi Hartono, M.Kom',
    perguruan_tinggi: 'Universitas Indonesia',
    tmt: '01 Januari 2024',
    tst: null,
  },
];

export function ProfesorEmeritus() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      {/* Header with action buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-brand-card">Data Profesor Emeritus</h2>
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
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Nama & Gelar</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Perguruan Tinggi</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">TMT</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">TST</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.length > 0 ? (
                mockData.map((item, i) => (
                  <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-border-dark' : ''}`}>
                    <td className="px-3.5 text-[11px] text-brand-card">{item.nama_gelar}</td>
                    <td className="px-3.5 text-[11px] text-brand-card">{item.perguruan_tinggi}</td>
                    <td className="px-3.5 text-[11px] text-brand-card">{item.tmt}</td>
                    <td className="px-3.5 text-[11px] text-brand-card">{item.tst || '-'}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-3.5 py-8 text-center">
                    <p className="text-[11px] italic text-text-muted">(Tidak ada data profesor emeritus)</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
