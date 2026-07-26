"use client";
import { useState, useEffect, useRef } from "react";
import api from "@/lib/axios";
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
import EditProfilModal from "@/components/profil/EditProfilModal";
import EditKependudukanModal from "@/components/profil/EditKependudukanModal";
import EditAlamatModal from "@/components/profil/EditAlamatModal";
import EditJabatanModal from "@/components/profil/EditJabatanModal";
import EditKepegawaianModal from "@/components/profil/EditKepegawaianModal";

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
  const [profilData, setProfilData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Modal States
  const [isEditProfilOpen, setIsEditProfilOpen] = useState(false);
  const [isEditKependudukanOpen, setIsEditKependudukanOpen] = useState(false);
  const [isEditAlamatOpen, setIsEditAlamatOpen] = useState(false);
  const [isEditJabatanOpen, setIsEditJabatanOpen] = useState(false);
  const [isEditKepegawaianOpen, setIsEditKepegawaianOpen] = useState(false);
  
  // Refresh Trigger
  const [refreshKey, setRefreshKey] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSync = async () => {
    // @ts-ignore
    if (!user?.lecturer_id) {
      alert("Lecturer ID tidak ditemukan.");
      return;
    }
    
    setIsSyncing(true);
    try {
      // @ts-ignore
      const res = await api.post(`/sync/${user.lecturer_id}`);
      if (res.data.status === 'success') {
        alert(res.data.message || "Sinkronisasi berhasil!");
        window.location.reload();
      }
    } catch (err: any) {
      console.error("Gagal sinkronisasi:", err);
      alert(err.response?.data?.message || "Terjadi kesalahan saat sinkronisasi.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await api.post('/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newAvatarUrl = res.data?.data?.avatar_url || res.data?.data?.avatar_path;
      if (newAvatarUrl && user) {
        const updatedUser = { ...user, photo: newAvatarUrl, avatar_url: newAvatarUrl };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Trigger navbar untuk update foto
        window.dispatchEvent(new Event('auth-change'));
      }
    } catch (err) {
      console.error('Upload foto gagal:', err);
      alert('Upload foto gagal. Pastikan ukuran file < 5MB.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setAuthError(false);
        // Pastikan token tersimpan dari localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setAuthError(true);
          return;
        }
        // First get the user to ensure we have lecturer_id
        const userRes = await api.get('/me');
        const userData = userRes.data?.data;
        if (userData) {
          // Merge stored data (yang punya access_token) dengan fresh data dari /me
          const storedData = JSON.parse(storedUser);
          const mergedUser = {
            ...storedData,
            ...userData,
            photo: userData.avatar_url || userData.avatar_path || storedData.photo,
            access_token: storedData.access_token
          };
          setUser(mergedUser);
          localStorage.setItem("user", JSON.stringify(mergedUser));
          window.dispatchEvent(new Event('auth-change'));

          if (userData.lecturer_id) {
            const includes = "academic,addresses,families,identities,inpassings,stats,placements,positions,professorEmeritus,ranks,workContracts,hki";
            const lecturerRes = await api.get(`/lecturers/${userData.lecturer_id}?include=${includes}`);
            const lec = lecturerRes.data?.data;

            if (lec) {
              setProfilData({
                raw: lec, // Simpan data mentah untuk referensi ID relasi
                nidn: lec.nidn || "-",
                nama: lec.name || "-",
                namaLengkap: lec.nama_lengkap || lec.name || "-",
                namaSebutan: lec.nama_lengkap || lec.name || "-",
                jenisKelamin: (lec.gender === "Laki-laki" || lec.gender === "L") ? "Laki-laki" : ((lec.gender === "Perempuan" || lec.gender === "P") ? "Perempuan" : "-"),
                tempatLahir: lec.birth_place || lec.identities?.[0]?.place_of_birth || "-",
                tanggalLahir: lec.birth_date || lec.identities?.[0]?.date_of_birth || "-",
                bidangKeahlian: lec.academic?.science_branch ? [lec.academic.science_branch] :
                  (lec.academic?.field_of_study || "").split(",").filter(Boolean),
                nip: lec.nip || "-",
                nomorSKCPNS: lec.workContracts?.[0]?.sk_number || lec.workContracts?.[0]?.sk_cpns || "-",
                tmtSK: lec.workContracts?.[0]?.tmt || "-",
                pangkat: lec.ranks?.[0]?.rank_name || "-",
                golongan: lec.ranks?.[0]?.group_code || lec.ranks?.[0]?.group_name || "-",
                statusPegawai: lec.placements?.[0]?.status || lec.workContracts?.[0]?.work_status || "-",
                statusKeaktifan: lec.status || "-",
                sumberGaji: lec.workContracts?.[0]?.salary_source || "-",
                ikatanKerja: lec.placements?.[0]?.employment_bond || lec.workContracts?.[0]?.work_agreement || "-",
                unitKerja: lec.faculty || lec.placements?.[0]?.unit || "-",
                programStudi: lec.study_program || "-",
                perguruanTinggi: lec.department || lec.placements?.[0]?.university || "Universitas Udayana",
                homebasePenugasan: lec.placements?.[0]?.assignment_homebase || lec.department || "-",
                masaKerja: lec.workContracts?.[0]?.years_of_service || "-",
                email: lec.email || "-",
                noHP: lec.phone || lec.identities?.[0]?.phone_number || "-",
                noTelepon: lec.identities?.[0]?.telephone_number || "-",
                rtRw: `${lec.addresses?.[0]?.rt || "-"} / ${lec.addresses?.[0]?.rw || "-"}`,
                desa: lec.addresses?.[0]?.village || "-",
                kecamatan: lec.addresses?.[0]?.district || "-",
                kabupaten: lec.addresses?.[0]?.city || "-",
                provinsi: lec.addresses?.[0]?.province || "-",
                kodePOS: lec.addresses?.[0]?.postal_code || "-",
                nik: lec.identities?.[0]?.nik || "-",
                nikAlamat: lec.identities?.[0]?.nik || "-",
                npwp: lec.identities?.[0]?.npwp || "-",
                agama: lec.identities?.[0]?.religion || "-",
                kewarganegaraan: lec.identities?.[0]?.citizenship || "-",
                statusPerkawinan: lec.identities?.[0]?.marital_status || "-",
                namaPasangan: lec.families?.[0]?.spouse_name || lec.families?.[0]?.name || "-",
                jabatanAkademik: lec.positions?.[0]?.functional_position || lec.positions?.[0]?.position_name || "-",
                rumpunIlmu: lec.academic?.science_cluster || lec.academic?.science_tree || lec.academic?.scientific_cluster || "-",
                pangkatGol: `${lec.inpassings?.[0]?.rank_name || "-"} / ${lec.inpassings?.[0]?.group_code || lec.inpassings?.[0]?.group_name || "-"}`,
                sintaID: lec.sinta_id || lec.sister_id || "-",
                sintaScore3yr: lec.sinta_score_3yr || 0,
                sintaScoreOverall: lec.sinta_score_total || 0,
                hIndexScopus: lec.stats?.scopus_count || 0,
                hIndexScholar: 0,
                bergabungSejak: lec.created_at || "-",
              });
            }
          }
        }
      } catch (err: any) {
        console.error(err);
        if (err?.response?.status === 401) {
          setAuthError(true);
          localStorage.removeItem("user");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  if (isLoading) return <div className="flex items-center justify-center p-12 text-gray-500">Memuat profil...</div>;

  if (authError || !user || !profilData) return (
    <div className="flex flex-col items-center justify-center p-12 gap-4">
      <p className="text-gray-500 text-center">Sesi Anda telah berakhir. Silakan login kembali.</p>
      <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">Login Ulang</a>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="text-brand-navy font-medium">{profilData.perguruanTinggi !== "-" ? profilData.perguruanTinggi : "Universitas Udayana"}</span>
        <span className="mx-2">/</span>
        <span>Laboratorium Warisan Budaya Digital</span>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div
              className="relative h-16 w-16 shrink-0 cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
              title="Klik untuk ganti foto"
            >
              <div className="h-full w-full overflow-hidden rounded-full border-4 border-brand-gold">
                <img
                  src={user.photo || user.avatar_url || '/default-avatar.png'}
                  alt={user.name}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Pencil className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white z-10">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-700">{profilData.nama}</h1>
              <p className="text-sm text-gray-500">{profilData.jabatanAkademik}</p>
              <p className="text-xs text-gray-400">
                {profilData.programStudi !== "-" ? profilData.programStudi : ""}
                {profilData.programStudi !== "-" && profilData.unitKerja !== "-" ? " · " : ""}
                {profilData.unitKerja !== "-" ? profilData.unitKerja : ""}
                {(profilData.programStudi !== "-" || profilData.unitKerja !== "-") && profilData.perguruanTinggi !== "-" ? " · " : ""}
                {profilData.perguruanTinggi !== "-" ? profilData.perguruanTinggi : ""}
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
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-gray-600">Profil</h2>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                  <CheckCircle className="h-3 w-3" />
                  Data Terverifikasi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditProfilOpen(true)}
                  className="text-[10px] h-7 gap-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Pencil className="h-3 w-3" />
                  Edit Data
                </Button>
                <Button
                  size="sm"
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="text-[10px] h-7 gap-1 bg-[#DAA520] hover:bg-[#B8860B] text-white border-none shadow-sm"
                >
                  <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? "Menyinkronkan..." : "Sinkronisasi Elsevier"}
                </Button>
              </div>
            </div>

            <div className="mb-4 flex flex-col items-center gap-3">
              {/* Input file tersembunyi */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpg,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              {/* Foto yang bisa diklik untuk upload */}
              <div
                className="relative h-40 w-32 overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
                title="Klik untuk ganti foto"
              >
                <img
                  src={user.photo || user.avatar_url || '/default-avatar.png'}
                  alt={user.name}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
                />
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUploading ? (
                    <RefreshCw className="h-6 w-6 text-white animate-spin" />
                  ) : (
                    <div className="text-center">
                      <Pencil className="h-5 w-5 text-white mx-auto mb-1" />
                      <span className="text-white text-[10px] font-medium">Ganti Foto</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-gray-400 text-center">Klik foto untuk menggantinya<br />JPG, PNG, WebP · maks. 5MB</p>
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
                onClick={() => setIsEditKependudukanOpen(true)}
                className="text-[10px] h-7 gap-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Pencil className="h-3 w-3" />
                Edit Data
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
                onClick={() => setIsEditAlamatOpen(true)}
                className="text-[10px] h-7 gap-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Pencil className="h-3 w-3" />
                Edit Data
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
                onClick={() => setIsEditJabatanOpen(true)}
                className="text-[10px] h-7 gap-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Pencil className="h-3 w-3" />
                Edit Data
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
                onClick={() => setIsEditKepegawaianOpen(true)}
                className="text-[10px] h-7 gap-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Pencil className="h-3 w-3" />
                Edit Data
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

      {/* Modals */}
      <EditProfilModal
        isOpen={isEditProfilOpen}
        onClose={() => setIsEditProfilOpen(false)}
        // @ts-ignore
        lecturerId={user?.lecturer_id}
        initialData={profilData}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />
      <EditKependudukanModal
        isOpen={isEditKependudukanOpen}
        onClose={() => setIsEditKependudukanOpen(false)}
        // @ts-ignore
        lecturerId={user?.lecturer_id}
        initialData={profilData}
        identityId={profilData.raw?.identities?.[0]?.id}
        familyId={profilData.raw?.families?.[0]?.id}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />
      <EditAlamatModal
        isOpen={isEditAlamatOpen}
        onClose={() => setIsEditAlamatOpen(false)}
        // @ts-ignore
        lecturerId={user?.lecturer_id}
        initialData={profilData}
        addressId={profilData.raw?.addresses?.[0]?.id}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />
      <EditJabatanModal
        isOpen={isEditJabatanOpen}
        onClose={() => setIsEditJabatanOpen(false)}
        // @ts-ignore
        lecturerId={user?.lecturer_id}
        initialData={profilData}
        positionId={profilData.raw?.positions?.[0]?.id}
        academicId={profilData.raw?.academic?.id}
        inpassingId={profilData.raw?.inpassings?.[0]?.id}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />
      <EditKepegawaianModal
        isOpen={isEditKepegawaianOpen}
        onClose={() => setIsEditKepegawaianOpen(false)}
        // @ts-ignore
        lecturerId={user?.lecturer_id}
        initialData={profilData}
        workContractId={profilData.raw?.workContracts?.[0]?.id}
        rankId={profilData.raw?.ranks?.[0]?.id}
        placementId={profilData.raw?.placements?.[0]?.id}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />
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
