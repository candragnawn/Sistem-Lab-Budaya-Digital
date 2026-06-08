import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface HKIData {
  id: number;
  judul_hki: string;
  kategori_kegiatan: string;
  jenis_hki: string;
  nomor_pendaftaran: string;
  nomor_paten_sertifikat: string;
  tanggal_terbit: string;
  status_hki: string;
}

const mockData: HKIData[] = [
  {
    id: 1,
    judul_hki: 'Sistem Deteksi Dini Penyakit Berbasis AI',
    kategori_kegiatan: 'Hak Cipta',
    jenis_hki: 'Program Komputer',
    nomor_pendaftaran: 'EC00202312345',
    nomor_paten_sertifikat: '000234567',
    tanggal_terbit: '20 Desember 2023',
    status_hki: 'Granted',
  },
  {
    id: 2,
    judul_hki: 'Metode Pemrosesan Citra Medis Menggunakan Deep Learning',
    kategori_kegiatan: 'Paten',
    jenis_hki: 'Paten Sederhana',
    nomor_pendaftaran: 'P00202345678',
    nomor_paten_sertifikat: 'IDS000045678',
    tanggal_terbit: '15 Juni 2024',
    status_hki: 'Granted',
  },
];

export function HKI() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-brand-card">Data Paten/HKI</h2>
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
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Judul HKI</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Kategori</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Jenis</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">No. Pendaftaran</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">No. Paten/Sertifikat</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Status</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-border-dark' : ''}`}>
                  <td className="px-3.5 text-[11px] text-brand-card max-w-[250px] truncate">{item.judul_hki}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.kategori_kegiatan}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.jenis_hki}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.nomor_pendaftaran}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.nomor_paten_sertifikat}</td>
                  <td className="px-3.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[11px] font-medium rounded-[4px] border bg-green-900/20 text-green-400 border-green-900/30">
                      {item.status_hki}
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
