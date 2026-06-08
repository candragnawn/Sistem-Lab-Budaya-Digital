"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Pencil,
  Download,
  RefreshCw,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

interface UserData {
  name: string;
  role: string;
  photo: string;
}

const profilData = {
  nidn: "0001196801",
  nama: "Ivan Ganteng",
  namaLengkap: "Prof. Dr. Ivan Ganteng, S.cin",
  namaSebutan: "Prof. Dr. Ivan Ganteng, S.cin",
  jenisKelamin: "Laki-laki",
  tempatLahir: "Gianyar, Bali",
  tanggalLahir: "1 September 1988",
  bidangKeahlian: ["Arsitektur Kol", "Sejarah", "Model Generatif"],
  nip: "196809311993162660",
  nomorSKCPNS: "P27.3/345/KPB/7/993",
  tmtSK: "1 Maret 1993",
  pangkat: "Pembina Utama /",
  golongan: "IV-e",
  statusPegawai: "PNS",
  statusKeaktifan: "Aktif",
  sumberGaji: "APBN",
  ikatanKerja: "Pegawai Tetap",
  unitKerja: "Fakultas Informatika",
  programStudi: "Prodi J7",
  perguruanTinggi: "Universitas Udayana",
  homebasePenugasan: "Jimbaran",
  masaKerja: "32 Tahun 8 Bulan",
  email: "ivan@gmail.com",
  noHP: "083456789012",
  noTelepon: "(0361) 445678",
  rtRw: "RT 04 / RW 08",
  desa: "Jimbaran",
  kecamatan: "Kuta Selatan",
  kabupaten: "Kab. Badung",
  provinsi: "Bali",
  kodePOS: "80361",
  nik: "51 71 013258800003",
  nikAlamat: "51 71 013258800003",
  npwp: "34..187.985.1-963.000",
  agama: "Hindu",
  kewarganegaraan: "WNI",
  statusPerkawinan: "Kawin",
  namaPasangan: "List nomor 3",
  jabatanAkademik: "Guru Besar",
  rumpunIlmu: "Sejarah dan Arkeologi",
  pangkatGol: "Pembina Utama / IV-e",
  sintaID: "5678991",
  sintaScore3yr: "1.124",
  sintaScoreOverall: "3.456",
  hIndexScopus: 23,
  hIndexScholar: 31,
  bergabungSejak: "1 November 2019",
};

export default function ProfilPage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="text-brand-navy font-medium">Universitas Ivan</span>
        <span className="mx-2">/</span>
        <span>Laboratorium Warisan Budaya Digital</span>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-3 border-brand-gold">
              <img
                src={user.photo}
                alt={user.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-700">{profilData.nama}</h1>
              <p className="text-sm text-gray-500">{profilData.jabatanAkademik}</p>
              <p className="text-xs text-gray-400">
                Prodi DIK · Fakultas Nomor 3 · Universitas Ganteng
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                  NIDN: {profilData.nidn}
                </span>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-medium text-indigo-600">
                  NIP: {profilData.nip}
                </span>
                <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-medium text-teal-600">
                  SISTERID: {profilData.sintaID}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            
            <Button
              size="sm"
              variant="outline"
              className="text-xs gap-1.5 border-gray-300"
            >
              <Download className="h-3 w-3" />
              Unduh CV
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Profil */}
        <div className="space-y-6">
          {/* Profil Card */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-600">Profil</h2>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                <CheckCircle className="h-3 w-3" />
                Data Terverifikasi
              </span>
            </div>

            <div className="mb-4 flex justify-center">
              <div className="relative h-40 w-32 overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <Button
                size="sm"
                variant="outline"
                className="text-xs gap-1.5 border-gray-300"
              >
                <Pencil className="h-3 w-3" />
                Ajukan Pembaruan
              </Button>
            </div>

            <div className="flex justify-center gap-2 mb-5">
              <span className="rounded bg-teal-50 px-2 py-0.5 text-[9px] font-medium text-teal-600 border border-teal-100">
                ✉ SISTER
              </span>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-500">
                ✎ Manual
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <InfoRow label="NIDN" value={profilData.nidn} />
              <InfoRow label="Nama" value={profilData.nama} />
              <InfoRow label="Nama Sebutan Dosen" value={profilData.namaSebutan} />
              <InfoRow label="Jenis Kelamin" value={profilData.jenisKelamin} />
              <InfoRow label="Tempat Lahir" value={profilData.tempatLahir} />
              <InfoRow label="Tanggal Lahir" value={profilData.tanggalLahir} />

              <div>
                <p className="text-gray-500 mb-1.5">Bidang Keahlian</p>
                <div className="flex flex-wrap gap-1.5">
                  {profilData.bidangKeahlian.map((keahlian) => (
                    <span
                      key={keahlian}
                      className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-medium text-amber-700"
                    >
                      {keahlian}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kependudukan Card */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-600">Kependudukan</h2>
              <Button
                size="sm"
                variant="outline"
                className="text-[10px] h-7 gap-1 border-gray-300"
              >
                <Pencil className="h-3 w-3" />
                Ajukan Pembaruan
              </Button>
            </div>
            <div className="space-y-3 text-xs">
              <InfoRow label="NIK" value={profilData.nik} />
              <InfoRow label="NPWP" value={profilData.npwp} />
              <InfoRow label="Agama" value={profilData.agama} />
              <InfoRow label="Kewarganegaraan" value={profilData.kewarganegaraan} />
              <InfoRow label="Status Perkawinan" value={profilData.statusPerkawinan} />
              <InfoRow label="Nama Pasangan" value={profilData.namaPasangan} />
            </div>
          </div>
        </div>

        {/* Column 2: Alamat & Jabatan */}
        <div className="space-y-6">
          {/* Alamat dan Kontak */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-600">
                Alamat dan Kontak
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="text-[10px] h-7 gap-1 border-gray-300"
              >
                <Pencil className="h-3 w-3" />
                Ajukan Pembaruan
              </Button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{profilData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-gray-500">No Ponsel</p>
                  <p className="font-medium text-gray-800">{profilData.noHP}</p>
                </div>
              </div>
              <InfoRow label="No. Telepon Rumah" value={profilData.noTelepon} />
              <InfoRow label="RT / RW" value={profilData.rtRw} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500">Desa / Kelurahan</p>
                  <p className="font-medium text-gray-800">{profilData.desa}</p>
                </div>
                <div>
                  <p className="text-gray-500">Kecamatan / Kabupaten</p>
                  <p className="font-medium text-gray-800">
                    {profilData.kecamatan} {profilData.kabupaten}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500">Provinsi</p>
                  <p className="font-medium text-gray-800">{profilData.provinsi}</p>
                </div>
                <div>
                  <p className="text-gray-500">Kode Pos</p>
                  <p className="font-medium text-gray-800">{profilData.kodePOS}</p>
                </div>
              </div>
              <InfoRow label="NIK (Alamat)" value={profilData.nikAlamat} />
            </div>
          </div>

          {/* Jabatan Fungsional & Akademik */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-600">
                Jabatan Fungsional & Akademik
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="text-[10px] h-7 gap-1 border-gray-300"
              >
                <Pencil className="h-3 w-3" />
                Ajukan Pembaruan
              </Button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500">Jabatan Akademik</p>
                  <p className="font-medium text-gray-800">
                    {profilData.jabatanAkademik}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Rumpun Ilmu</p>
                  <p className="font-medium text-gray-800">
                    {profilData.rumpunIlmu}
                  </p>
                </div>
              </div>
              <InfoRow label="Pangkat / Gol. (Inpassing)" value={profilData.pangkatGol} />
            </div>

            {/* Metrik Akademik */}
            <div className="mt-5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                Metrik Akademik
              </h3>
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <InfoRow label="SINTA ID" value={profilData.sintaID} />
                  <InfoRow label="SINTA Score (3 Thn)" value={profilData.sintaScore3yr} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InfoRow
                    label="SINTA Score Overall"
                    value={profilData.sintaScoreOverall}
                  />
                  <InfoRow
                    label="H-Index Scopus"
                    value={String(profilData.hIndexScopus)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InfoRow
                    label="H-Index Google Scholar"
                    value={String(profilData.hIndexScholar)}
                  />
                  <InfoRow label="Bergabung Sejak" value={profilData.bergabungSejak} />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-1.5 text-xs border-gray-300"
              >
                <ExternalLink className="h-3 w-3" />
                Lihat Profil SINTA
              </Button>
            </div>
          </div>
        </div>

        {/* Column 3: Kepegawaian & Identitas */}
        <div className="space-y-6">
          {/* Kepegawaian */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-600">Kepegawaian</h2>
              <Button
                size="sm"
                variant="outline"
                className="text-[10px] h-7 gap-1 border-gray-300"
              >
                <Pencil className="h-3 w-3" />
                Ajukan Pembaruan
              </Button>
            </div>

            {/* DATA DARI SIASN */}
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Data dari SIASN
              </p>
              <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3 space-y-2.5 text-xs">
                <InfoRow label="NIP" value={profilData.nip} />
                <InfoRow label="Nomor SK CPNS / PNS / PPPK" value={profilData.nomorSKCPNS} />
                <div className="grid grid-cols-2 gap-3">
                  <InfoRow label="TMT SK CPNS/PNS/PPPK" value={profilData.tmtSK} />
                  <InfoRow
                    label="Pangkat dan Golongan"
                    value={`${profilData.pangkat} ${profilData.golongan}`}
                  />
                </div>
              </div>
            </div>

            {/* DATA KEPEGAWAIAN */}
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Data Kepegawaian
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <InfoRow label="Status" value={profilData.statusPegawai} />
                  <InfoRow label="Status Keaktifan" value={profilData.statusKeaktifan} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InfoRow label="Sumber Gaji" value={profilData.sumberGaji} />
                  <InfoRow label="Ikatan Kerja" value={profilData.ikatanKerja} />
                </div>
                <InfoRow label="Unit Kerja" value={profilData.unitKerja} />
                <InfoRow label="Program Studi" value={profilData.programStudi} />
                <InfoRow label="Perguruan Tinggi" value={profilData.perguruanTinggi} />
                <InfoRow label="Homebase Penugasan" value={profilData.homebasePenugasan} />
                <InfoRow label="Masa Kerja" value={profilData.masaKerja} />
              </div>
            </div>
          </div>

          {/* Identitas Akademik */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <h2 className="mb-4 text-sm font-semibold text-gray-600">
              Identitas Akademik
            </h2>
            <div className="space-y-2.5 text-xs">
              <InfoRow label="NIP" value={profilData.nip} />
              <InfoRow label="NIDN" value={profilData.nidn} />
              <InfoRow label="NIK" value={profilData.nik} />
              <InfoRow label="NPWP" value={profilData.npwp} />
              <InfoRow label="SINTA ID" value={profilData.sintaID} />
            </div>

            {/* Skor Akademik */}
            <div className="mt-5">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Skor Akademik
              </p>
              <div className="grid grid-cols-2 gap-3">
                <ScoreCard
                  label="SINTA 3yr"
                  value={profilData.sintaScore3yr}
                  color="blue"
                />
                <ScoreCard
                  label="SINTA All"
                  value={profilData.sintaScoreOverall}
                  color="red"
                />
                <ScoreCard
                  label="H-Scopus"
                  value={String(profilData.hIndexScopus)}
                  color="green"
                />
                <ScoreCard
                  label="H-Scholar"
                  value={String(profilData.hIndexScholar)}
                  color="purple"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function ScoreCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "blue" | "red" | "green" | "purple";
}) {
  const colorMap = {
    blue: "bg-brand-navy/5 border-brand-navy/15 text-brand-navy",
    red: "bg-brand-navy/8 border-brand-navy/20 text-brand-navy/80",
    green: "bg-brand-gold/5 border-brand-gold/20 text-amber-800",
    purple: "bg-brand-navy/5 border-brand-navy/15 text-brand-navy/70",
  };

  return (
    <div
      className={`flex flex-col items-center rounded-lg border p-3 ${colorMap[color]}`}
    >
      <span className="text-2xl font-semibold">{value}</span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-wider opacity-60">
        {label}
      </span>
    </div>
  );
}
