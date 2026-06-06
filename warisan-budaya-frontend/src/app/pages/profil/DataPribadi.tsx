import { CheckCircle, Upload, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { buildApiUrl } from '@/app/config/navigation';

interface Biodata {
  nidn?: string;
  nuptk?: string;
  nama?: string;
  jenis_kelamin?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  gelar_depan?: string;
  gelar_belakang?: string;
  foto_url?: string;
  status_verifikasi?: boolean;
}

interface Kependudukan {
  nik?: string;
  nama_terdaftar_dukcapil?: string;
  agama?: string;
  status_perkawinan?: string;
  kewarganegaraan?: string;
  golongan_darah?: string;
}

interface Kepegawaian {
  nip?: string;
  nidn?: string;
  status_kepegawaian?: string;
  jenis_pegawai?: string;
  nomor_sk_cpns?: string;
  tmt_cpns?: string;
  nomor_sk_pns?: string;
  tmt_pns?: string;
  nomor_sk_pengangkatan?: string;
  tmt_pengangkatan?: string;
  status_aktif?: string;
  jenis_dosen?: string;
}

interface AlamatKontak {
  email_institusi?: string;
  email_pribadi?: string;
  alamat_jalan?: string;
  rt?: string;
  rw?: string;
  kelurahan_desa?: string;
  kecamatan?: string;
  kota_kabupaten?: string;
  provinsi?: string;
  kode_pos?: string;
  telepon_rumah?: string;
  telepon_seluler?: string;
}

interface Keluarga {
  id: number;
  nama_lengkap?: string;
  hubungan_keluarga?: string;
  tanggal_lahir?: string;
  jenjang_pendidikan?: string;
  pekerjaan?: string;
  status_hidup?: string;
}

interface BidangKeilmuan {
  program_studi?: string;
  fakultas?: string;
  homebase?: string;
  bidang_ilmu?: string;
  sinta_id?: string;
  scopus_id?: string;
  google_scholar_id?: string;
  orcid_id?: string;
}

interface DataPribadiResponse {
  biodata?: Biodata;
  kependudukan?: Kependudukan;
  kepegawaian?: Kepegawaian;
  alamat_kontak?: AlamatKontak;
  keluarga?: Keluarga[];
  bidang_keilmuan?: BidangKeilmuan;
}

async function fetchDataPribadi(): Promise<DataPribadiResponse> {
  const response = await fetch(buildApiUrl('identities'));
  if (!response.ok) throw new Error('Failed to fetch data pribadi');
  const result = await response.json();
  return result.data || {};
}

// Layout A: Multi-Card Dashboard Pattern (SISTER Style)
export function DataPribadi() {
  const { data, isLoading } = useQuery({
    queryKey: ['data-pribadi'],
    queryFn: fetchDataPribadi,
  });

  const biodata = data?.biodata;
  const kependudukan = data?.kependudukan;
  const kepegawaian = data?.kepegawaian;
  const alamatKontak = data?.alamat_kontak;
  const keluarga = data?.keluarga || [];
  const bidangKeilmuan = data?.bidang_keilmuan;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 border-[#06B6D4] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Tab Navigation */}
      <div className="bg-[#1F2937] border-b border-gray-700 -mx-4 -mt-4 mb-4 px-4">
        <div className="flex gap-6">
          {['Data Pribadi', 'Jabatan Fungsional', 'Kepangkatan', 'Riwayat Pendidikan'].map((tab, i) => (
            <button
              key={tab}
              className={`px-1 py-3 text-xs relative ${
                i === 0
                  ? 'text-white font-medium'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab}
              {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#06B6D4]" />}
            </button>
          ))}
        </div>
      </div>

      {/* 12-column asymmetric grid: 5 + 7 */}
      <div className="grid grid-cols-12 gap-3.5">
        {/* LEFT PANEL (col-span-5) - Profil Identity Card */}
        <div className="col-span-5">
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px]">
            {/* Card Header */}
            <div className="px-3.5 py-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-white">Profil</h3>
              {biodata?.status_verifikasi && (
                <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-[4px]">
                  <CheckCircle className="w-3 h-3 text-[#16A34A]" strokeWidth={1.5} />
                  <span className="text-[11px] font-medium text-[#16A34A]">Data Terverifikasi</span>
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-3.5">
              {/* Portrait Photo */}
              <div className="aspect-[3/4] bg-[#111827] border border-gray-700 rounded-[4px] flex items-center justify-center mb-3 overflow-hidden">
                {biodata?.foto_url ? (
                  <img src={biodata.foto_url} alt={biodata.nama} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>

              {/* Upload Button */}
              <button className="w-full h-[30px] bg-[#06B6D4] text-white text-[11px] font-medium rounded-[4px] flex items-center justify-center gap-1.5 hover:bg-[#0891B2] transition-colors mb-3">
                <Upload className="w-3.5 h-3.5" strokeWidth={1.5} />
                Unggah Foto
              </button>

              {/* Metadata List - Biodata */}
              <div className="space-y-0">
                {[
                  ['NIDN', biodata?.nidn || kepegawaian?.nidn || '-'],
                  ['NUPTK', biodata?.nuptk || '-'],
                  ['Nama', biodata?.nama || '-'],
                  ['Gelar', `${biodata?.gelar_depan || ''} ${biodata?.gelar_belakang || ''}`.trim() || '-'],
                  ['Jenis Kelamin', biodata?.jenis_kelamin || '-'],
                  ['Tempat Lahir', biodata?.tempat_lahir || '-'],
                  ['Tanggal Lahir', biodata?.tanggal_lahir || '-'],
                ].map(([label, value], i, arr) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between py-2 ${
                      i < arr.length - 1 ? 'border-b border-gray-700' : ''
                    }`}
                  >
                    <span className="text-[11px] text-gray-400">{label}</span>
                    <span className="text-[11px] text-white text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (col-span-7) - Stacked Cards */}
        <div className="col-span-7 space-y-3">
          {/* Card 1: Kependudukan */}
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px]">
            <div className="px-3.5 py-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-white">Data Kependudukan</h3>
              <button className="text-[11px] text-[#06B6D4] hover:underline">Ajukan Perubahan</button>
            </div>
            <div className="p-3.5 space-y-0">
              {[
                ['NIK', kependudukan?.nik || '-'],
                ['Nama Terdaftar Dukcapil', kependudukan?.nama_terdaftar_dukcapil || '-'],
                ['Agama', kependudukan?.agama || '-'],
                ['Status Perkawinan', kependudukan?.status_perkawinan || '-'],
                ['Kewarganegaraan', kependudukan?.kewarganegaraan || '-'],
                ['Golongan Darah', kependudukan?.golongan_darah || '-'],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between py-2 ${
                    i < arr.length - 1 ? 'border-b border-gray-700' : ''
                  }`}
                >
                  <span className="text-[11px] text-gray-400">{label}</span>
                  <span className="text-[11px] text-white text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Alamat dan Kontak */}
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px]">
            <div className="px-3.5 py-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-white">Alamat dan Kontak</h3>
              <button className="text-[11px] text-[#06B6D4] hover:underline">Ajukan Perubahan</button>
            </div>
            <div className="p-3.5 space-y-0">
              {[
                ['Email Institusi', alamatKontak?.email_institusi || '(Tidak ada data)'],
                ['Email Pribadi', alamatKontak?.email_pribadi || '(Tidak ada data)'],
                ['Alamat', alamatKontak?.alamat_jalan || '(Tidak ada data)'],
                ['RT', alamatKontak?.rt || '-'],
                ['RW', alamatKontak?.rw || '-'],
                ['Kelurahan/Desa', alamatKontak?.kelurahan_desa || '-'],
                ['Kecamatan', alamatKontak?.kecamatan || '-'],
                ['Kota/Kabupaten', alamatKontak?.kota_kabupaten || '-'],
                ['Provinsi', alamatKontak?.provinsi || '-'],
                ['Kode Pos', alamatKontak?.kode_pos || '-'],
                ['Telepon Rumah', alamatKontak?.telepon_rumah || '(Tidak ada data)'],
                ['Telepon Seluler', alamatKontak?.telepon_seluler || '(Tidak ada data)'],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between py-2 ${
                    i < arr.length - 1 ? 'border-b border-gray-700' : ''
                  }`}
                >
                  <span className="text-[11px] text-gray-400">{label}</span>
                  <span className={`text-[11px] text-right max-w-[60%] ${
                    value.includes('Tidak ada') ? 'italic text-gray-400' : 'text-white'
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Kepegawaian */}
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px]">
            <div className="px-3.5 py-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-white">Kepegawaian</h3>
              <button className="text-[11px] text-[#06B6D4] hover:underline">Ajukan Perubahan</button>
            </div>

            {/* Sub-header band */}
            <div className="px-3.5 py-1.5 bg-[#111827] border-y border-gray-700">
              <p className="text-[11px] font-medium text-gray-400">Data dari SIASN</p>
            </div>

            <div className="p-3.5 space-y-0">
              {[
                ['NIP', kepegawaian?.nip || '-'],
                ['NIDN', kepegawaian?.nidn || '-'],
                ['Status Kepegawaian', kepegawaian?.status_kepegawaian || '-'],
                ['Jenis Pegawai', kepegawaian?.jenis_pegawai || '-'],
                ['Jenis Dosen', kepegawaian?.jenis_dosen || '-'],
                ['Nomor SK CPNS', kepegawaian?.nomor_sk_cpns || '-'],
                ['TMT CPNS', kepegawaian?.tmt_cpns || '-'],
                ['Nomor SK PNS', kepegawaian?.nomor_sk_pns || '-'],
                ['TMT PNS', kepegawaian?.tmt_pns || '-'],
                ['Nomor SK Pengangkatan', kepegawaian?.nomor_sk_pengangkatan || '-'],
                ['TMT Pengangkatan', kepegawaian?.tmt_pengangkatan || '-'],
                ['Status Aktif', kepegawaian?.status_aktif || '-'],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between py-2 ${
                    i < arr.length - 1 ? 'border-b border-gray-700' : ''
                  }`}
                >
                  <span className="text-[11px] text-gray-400">{label}</span>
                  <span className="text-[11px] text-white text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Bidang Keilmuan */}
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px]">
            <div className="px-3.5 py-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-white">Bidang Keilmuan</h3>
              <button className="text-[11px] text-[#06B6D4] hover:underline">Ajukan Perubahan</button>
            </div>
            <div className="p-3.5 space-y-0">
              {[
                ['Program Studi', bidangKeilmuan?.program_studi || '-'],
                ['Fakultas', bidangKeilmuan?.fakultas || '-'],
                ['Homebase', bidangKeilmuan?.homebase || '-'],
                ['Bidang Ilmu', bidangKeilmuan?.bidang_ilmu || '-'],
                ['SINTA ID', bidangKeilmuan?.sinta_id || '(Tidak ada data)'],
                ['Scopus ID', bidangKeilmuan?.scopus_id || '(Tidak ada data)'],
                ['Google Scholar ID', bidangKeilmuan?.google_scholar_id || '(Tidak ada data)'],
                ['ORCID ID', bidangKeilmuan?.orcid_id || '(Tidak ada data)'],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between py-2 ${
                    i < arr.length - 1 ? 'border-b border-gray-700' : ''
                  }`}
                >
                  <span className="text-[11px] text-gray-400">{label}</span>
                  <span className={`text-[11px] text-right max-w-[60%] ${
                    value.includes('Tidak ada') ? 'italic text-gray-400' : 'text-white'
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Data Keluarga */}
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px]">
            <div className="px-3.5 py-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-[13px] font-medium text-white">Data Keluarga</h3>
              <button className="text-[11px] text-[#06B6D4] hover:underline">Ajukan Perubahan</button>
            </div>

            {keluarga && keluarga.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#111827]">
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-medium text-gray-400">Nama Lengkap</th>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-medium text-gray-400">Hubungan Keluarga</th>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-medium text-gray-400">Tanggal Lahir</th>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-medium text-gray-400">Jenjang Pendidikan</th>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-medium text-gray-400">Pekerjaan</th>
                      <th className="px-3.5 py-2.5 text-left text-[11px] font-medium text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keluarga.map((family, i) => (
                      <tr key={family.id} className={i < keluarga.length - 1 ? 'border-b border-gray-700' : ''}>
                        <td className="px-3.5 py-2.5 text-[11px] text-white">{family.nama_lengkap || '-'}</td>
                        <td className="px-3.5 py-2.5 text-[11px] text-white">{family.hubungan_keluarga || '-'}</td>
                        <td className="px-3.5 py-2.5 text-[11px] text-white">{family.tanggal_lahir || '-'}</td>
                        <td className="px-3.5 py-2.5 text-[11px] text-white">{family.jenjang_pendidikan || '-'}</td>
                        <td className="px-3.5 py-2.5 text-[11px] text-white">{family.pekerjaan || '-'}</td>
                        <td className="px-3.5 py-2.5 text-[11px] text-white">{family.status_hidup || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-3.5 text-center">
                <p className="text-[11px] italic text-gray-400">(Tidak ada data keluarga)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
