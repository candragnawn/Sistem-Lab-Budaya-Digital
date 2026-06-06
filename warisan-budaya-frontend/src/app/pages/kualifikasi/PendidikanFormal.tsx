import { Eye, Pencil, Plus } from 'lucide-react';
import { useRole } from '../../hooks/useAuth';
import { PublicBanner } from '../../components/UI/PublicBanner';

interface PendidikanData {
  id: number;
  jenjang_pendidikan: string;
  nama_perguruan_tinggi: string;
  fakultas: string;
  program_studi: string;
  tahun_masuk: number;
  tahun_lulus: number;
  gelar_akademik: string;
  nomor_ijazah: string;
}

const mockData: PendidikanData[] = [
  {
    id: 1,
    jenjang_pendidikan: 'S3',
    nama_perguruan_tinggi: 'Institut Teknologi Bandung',
    fakultas: 'Fakultas Teknik Informatika',
    program_studi: 'Ilmu Komputer',
    tahun_masuk: 2015,
    tahun_lulus: 2019,
    gelar_akademik: 'Dr.',
    nomor_ijazah: 'ITB/S3/2019/001',
  },
  {
    id: 2,
    jenjang_pendidikan: 'S2',
    nama_perguruan_tinggi: 'Universitas Indonesia',
    fakultas: 'Fakultas Ilmu Komputer',
    program_studi: 'Teknologi Informasi',
    tahun_masuk: 2010,
    tahun_lulus: 2012,
    gelar_akademik: 'M.T.',
    nomor_ijazah: 'UI/S2/2012/045',
  },
  {
    id: 3,
    jenjang_pendidikan: 'S1',
    nama_perguruan_tinggi: 'Universitas Gadjah Mada',
    fakultas: 'Fakultas Teknik',
    program_studi: 'Teknik Informatika',
    tahun_masuk: 2003,
    tahun_lulus: 2007,
    gelar_akademik: 'S.Kom',
    nomor_ijazah: 'UGM/S1/2007/123',
  },
];

export function PendidikanFormal() {
  const { canWrite } = useRole();

  return (
    <div className="space-y-3">
      <PublicBanner />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-white">Riwayat Pendidikan Formal</h2>
        <div className="flex gap-2">
          {canWrite && (
            <>
              <button className="h-[32px] px-3 text-xs border border-gray-700 rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors">
                Riwayat Ajuan
              </button>
              <button className="h-[32px] px-3 text-xs bg-[#06B6D4] text-white rounded-[4px] hover:bg-[#0891B2] transition-colors flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
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
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Jenjang</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Perguruan Tinggi</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Fakultas</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Program Studi</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Tahun</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Gelar</th>
                <th className="px-3.5 text-left text-[11px] font-medium text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, i) => (
                <tr key={item.id} className={`h-[44px] hover:bg-gray-800 ${i < mockData.length - 1 ? 'border-b border-gray-700' : ''}`}>
                  <td className="px-3.5 text-[11px] text-white">{item.jenjang_pendidikan}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.nama_perguruan_tinggi}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.fakultas}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.program_studi}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.tahun_masuk} - {item.tahun_lulus}</td>
                  <td className="px-3.5 text-[11px] text-white">{item.gelar_akademik}</td>
                  <td className="px-3.5">
                    <div className="flex items-center gap-2">
                      <button className="h-[26px] px-2 text-[11px] border border-gray-700 rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors flex items-center gap-1">
                        <Eye className="w-3 h-3" strokeWidth={1.5} />
                        Lihat Rincian
                      </button>
                      {canWrite && (
                        <>
                          <button className="h-[26px] px-2 text-[11px] border border-gray-700 rounded-[4px] text-gray-200 hover:bg-gray-800 transition-colors flex items-center gap-1">
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
