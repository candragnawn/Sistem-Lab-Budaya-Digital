import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface PenempatanData {
  id: number;
  status_ikatan_kerja: string;
  nomor_sk: string;
  tanggal_sk: string;
  tmt_tugas: string;
  tanggal_keluar: string | null;
  tst_tugas: string | null;
  perguruan_tinggi: string;
  unit_kerja: string;
  homebase_status: string;
}

const mockData: PenempatanData[] = [
  {
    id: 1,
    status_ikatan_kerja: 'Dosen Tetap',
    nomor_sk: '001/SK/REKTOR/2020',
    tanggal_sk: '05 Januari 2020',
    tmt_tugas: '01 Februari 2020',
    tanggal_keluar: null,
    tst_tugas: null,
    perguruan_tinggi: 'Universitas Indonesia',
    unit_kerja: 'Fakultas Ilmu Komputer',
    homebase_status: 'Aktif',
  },
  {
    id: 2,
    status_ikatan_kerja: 'Dosen Kontrak',
    nomor_sk: '045/SK/REKTOR/2015',
    tanggal_sk: '10 Juli 2015',
    tmt_tugas: '01 Agustus 2015',
    tanggal_keluar: '31 Januari 2020',
    tst_tugas: '31 Januari 2020',
    perguruan_tinggi: 'Universitas Indonesia',
    unit_kerja: 'Fakultas Ilmu Komputer',
    homebase_status: 'Selesai',
  },
];

export function Penempatan() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      {/* Header with action buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-brand-card">Riwayat Penempatan</h2>
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
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Status Ikatan Kerja</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Perguruan Tinggi</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Unit Kerja</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">TMT Tugas</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">TST Tugas</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Status</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-border-dark' : ''}`}>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.status_ikatan_kerja}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.perguruan_tinggi}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.unit_kerja}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.tmt_tugas}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.tst_tugas || '-'}</td>
                  <td className="px-3.5">
                    <span className={`inline-flex items-center px-1.5 py-0.5 text-[11px] font-medium rounded-[4px] border ${
                      item.homebase_status === 'Aktif'
                        ? 'bg-gray-900/20 text-white border-green-900/30'
                        : 'bg-gray-800 text-text-placeholder border-border-dark'
                    }`}>
                      {item.homebase_status}
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
