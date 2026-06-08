import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface PublikasiData {
  id: number;
  judul_artikel: string;
  nama_jurnal_penerbit: string;
  kategori_kegiatan: string;
  jenis_publikasi: string;
  tanggal_terbit: string;
  volume: string;
  nomor_jurnal: string;
  doi: string;
  issn: string;
  peran_penulis: string;
}

const mockData: PublikasiData[] = [
  {
    id: 1,
    judul_artikel: 'Deep Learning Approach for COVID-19 Detection from Chest X-Ray Images',
    nama_jurnal_penerbit: 'IEEE Transactions on Medical Imaging',
    kategori_kegiatan: 'Jurnal Internasional Bereputasi',
    jenis_publikasi: 'Jurnal',
    tanggal_terbit: '15 Januari 2024',
    volume: '43',
    nomor_jurnal: '1',
    doi: '10.1109/TMI.2024.123456',
    issn: '0278-0062',
    peran_penulis: 'Penulis Pertama',
  },
  {
    id: 2,
    judul_artikel: 'Sentiment Analysis on Indonesian Social Media Using BERT',
    nama_jurnal_penerbit: 'Journal of Big Data',
    kategori_kegiatan: 'Jurnal Internasional',
    jenis_publikasi: 'Jurnal',
    tanggal_terbit: '20 Maret 2023',
    volume: '10',
    nomor_jurnal: '1',
    doi: '10.1186/s40537-023-00456-1',
    issn: '2196-1115',
    peran_penulis: 'Penulis Korespondensi',
  },
];

export function PublikasiKarya() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-brand-card">Data Publikasi Karya</h2>
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
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Judul Artikel</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Jurnal/Penerbit</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Kategori</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Tanggal Terbit</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Vol/No</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Peran</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-text-placeholder">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-border-dark' : ''}`}>
                  <td className="px-3.5 text-[11px] text-brand-card max-w-[300px] truncate">{item.judul_artikel}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.nama_jurnal_penerbit}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.kategori_kegiatan}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.tanggal_terbit}</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.volume}({item.nomor_jurnal})</td>
                  <td className="px-3.5 text-[11px] text-brand-card">{item.peran_penulis}</td>
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
