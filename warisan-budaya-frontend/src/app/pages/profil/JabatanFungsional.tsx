import { Plus, Clock } from 'lucide-react';
import { PublicBanner } from '../../components/UI/PublicBanner';
import { useRole } from '../../hooks/useAuth';

// Layout B: Full-Width Table View Pattern (SISTER Style)
export function JabatanFungsional() {
  const { canWrite } = useRole();
  const data = [
    { id: 1, jabatan: 'Lektor Kepala', sk_number: 'SK/2022/056/KUM', tmt: '01 April 2022', status: 'PNS' },
    { id: 2, jabatan: 'Lektor', sk_number: 'SK/2018/023/KUM', tmt: '01 Juli 2018', status: 'PNS' },
    { id: 3, jabatan: 'Asisten Ahli', sk_number: 'SK/2012/008/KUM', tmt: '01 Maret 2012', status: 'PNS' },
  ];

  return (
    <div className="space-y-3">
      <PublicBanner />

      <div className="space-y-0">
        {/* Tab Navigation */}
        <div className="bg-[#1F2937] border-b border-gray-700 -mx-4 -mt-4 mb-4 px-4">
          <div className="flex gap-6">
            {['Data Pribadi', 'Jabatan Fungsional', 'Kepangkatan', 'Riwayat Pendidikan'].map((tab, i) => (
              <button
                key={tab}
                className={`px-1 py-3 text-xs relative ${
                  i === 1
                    ? 'text-white font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab}
                {i === 1 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#06B6D4]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Full-Width Table Card */}
        <div className="bg-[#1F2937] border border-gray-700 rounded-[4px]">
          {/* Card Header with Actions */}
          <div className="px-3.5 py-3 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-[14px] font-medium text-white">Jabatan Fungsional</h3>
            {canWrite && (
              <div className="flex items-center gap-2">
                {/* Riwayat Ajuan - Ghost Button */}
                <button className="flex items-center gap-1.5 px-1.5 py-1 rounded-[4px] hover:bg-gray-800 transition-colors">
                  <Clock className="w-3.5 h-3.5 text-gray-200" strokeWidth={2} />
                  <span className="text-[11px] text-gray-200">Riwayat Ajuan</span>
                </button>

                {/* Tambah Jabatan - Primary Button */}
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#06B6D4] text-white text-[11px] font-medium rounded-[4px] hover:bg-[#0891B2] transition-colors">
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  Tambah Jabatan
                </button>
              </div>
            )}
          </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-[#111827]">
              <tr className="h-9">
                <th className="px-3 text-left text-[11px] font-medium text-gray-400">
                  Jabatan Fungsional
                </th>
                <th className="px-3 text-left text-[11px] font-medium text-gray-400">
                  Nomor SK
                </th>
                <th className="px-3 text-left text-[11px] font-medium text-gray-400">
                  Terhitung Mulai Tanggal
                </th>
                <th className="px-3 text-left text-[11px] font-medium text-gray-400">
                  Status Pegawai
                </th>
                <th className="px-3 text-right text-[11px] font-medium text-gray-400">
                  Aksi
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.id}
                  className={`h-11 hover:bg-gray-800 ${i < data.length - 1 ? 'border-b border-gray-700' : ''}`}
                >
                  <td className="px-3 text-[12px] text-white">{row.jabatan}</td>
                  <td className="px-3 text-[12px] text-white">{row.sk_number}</td>
                  <td className="px-3 text-[12px] text-white">{row.tmt}</td>
                  <td className="px-3 text-[12px] text-white">{row.status}</td>
                  <td className="px-3">
                    <div className="flex items-center justify-end gap-2">
                      {/* Lihat Rincian - Ghost Button */}
                      <button className="px-1.5 py-0.5 bg-[#1F2937] border border-gray-700 rounded-[2px] text-[11px] text-gray-200 hover:bg-gray-800 transition-colors">
                        Lihat Rincian
                      </button>

                      {canWrite && (
                        <>
                          {/* Ubah - Ghost Button */}
                          <button className="px-1.5 py-0.5 bg-[#1F2937] border border-gray-700 rounded-[2px] text-[11px] text-gray-200 hover:bg-gray-800 transition-colors">
                            Ubah
                          </button>

                          {/* Hapus - Text Link */}
                          <button className="text-[11px] text-red-600 hover:underline">
                            Hapus
                          </button>
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
    </div>
  );
}
