import { Eye, Pencil, Plus } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

interface TesData {
  id: number;
  jenis_tes: string;
  nama_tes: string;
  penyelenggara: string;
  tanggal_tes: string;
  skor_nilai: string;
}

const mockData: TesData[] = [
  {
    id: 1,
    jenis_tes: 'TOEFL ITP',
    nama_tes: 'Test of English as a Foreign Language',
    penyelenggara: 'ETS',
    tanggal_tes: '15 Mei 2023',
    skor_nilai: '587',
  },
  {
    id: 2,
    jenis_tes: 'IELTS Academic',
    nama_tes: 'International English Language Testing System',
    penyelenggara: 'British Council',
    tanggal_tes: '20 Maret 2022',
    skor_nilai: '7.5',
  },
];

export function Tes() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-white">Data Tes Kompetensi</h2>
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
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Jenis Tes</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Nama Tes</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Penyelenggara</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Tanggal</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Skor/Nilai</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-gray-700' : ''}`}>
                  <td className="px-3.5 text-[11px] text-white">{item.jenis_tes}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.nama_tes}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.penyelenggara}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.tanggal_tes}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.skor_nilai}</td>
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
