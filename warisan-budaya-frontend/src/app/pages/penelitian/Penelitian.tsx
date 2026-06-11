import { Eye, Pencil, Plus } from 'lucide-react';
import { useRole } from '../../hooks/useAuth';
import { PublicBanner } from '../../components/UI/PublicBanner';

interface PenelitianData {
  id: number;
  judul_penelitian: string;
  kategori_kegiatan: string;
  peran_peneliti: string;
  lembaga_sumber_dana: string;
  tahun_pelaksanaan: number;
  lama_kegiatan_bulan: number;
}

const mockData: PenelitianData[] = [
  {
    id: 1,
    judul_penelitian: 'Implementasi Machine Learning untuk Deteksi Dini Penyakit Diabetes',
    kategori_kegiatan: 'Penelitian Unggulan Perguruan Tinggi',
    peran_peneliti: 'Ketua',
    lembaga_sumber_dana: 'Kementerian Riset dan Teknologi',
    tahun_pelaksanaan: 2024,
    lama_kegiatan_bulan: 12,
  },
  {
    id: 2,
    judul_penelitian: 'Analisis Sentiment Menggunakan Deep Learning pada Media Sosial',
    kategori_kegiatan: 'Penelitian Dosen Pemula',
    peran_peneliti: 'Anggota',
    lembaga_sumber_dana: 'DIKTI',
    tahun_pelaksanaan: 2023,
    lama_kegiatan_bulan: 8,
  },
];

export function Penelitian() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />

      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-brand-card">Data Penelitian</h2>
        <div className="flex gap-2">
          {canWrite && (
            <>
              <button className="h-[32px] px-3 text-xs border border-border-dark rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors">
                Riwayat Ajuan
              </button>
              <button className="h-[32px] px-3 text-xs bg-info text-brand-card rounded-[4px] hover:bg-info-hover transition-colors flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
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
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Judul Penelitian</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Kategori</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Peran</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Sumber Dana</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Tahun</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Durasi</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-border-dark' : ''}`}>
                  <td className="px-3.5 text-[11px] text-brand-card max-w-[300px] truncate">{item.judul_penelitian}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.kategori_kegiatan}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.peran_peneliti}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.lembaga_sumber_dana}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.tahun_pelaksanaan}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.lama_kegiatan_bulan} bulan</td>
                  <td className="px-3.5">
                    <div className="flex items-center gap-2">
                      <button className="h-[26px] px-2 text-[11px] border border-border-dark rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors flex items-center gap-1">
                        <Eye className="w-3 h-3" strokeWidth={1.5} />
                        Lihat Rincian
                      </button>
                      {canWrite && (
                        <>
                          <button className="h-[26px] px-2 text-[11px] border border-border-dark rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors flex items-center gap-1">
                            <Pencil className="w-3 h-3" strokeWidth={1.5} />
                            Ubah
                          </button>
                          <button className="text-[11px] text-red-600 hover:text-red-700">Hapus</button>
                        </>
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
