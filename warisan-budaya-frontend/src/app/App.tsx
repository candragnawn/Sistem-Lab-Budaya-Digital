import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './contexts/AuthContext';
import { DosenProvider } from './contexts/DosenContext';
import { Toaster } from 'sonner';
import { MainLayout } from './components/Layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { DosenList } from './pages/DosenList';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

// Profil
import { DataPribadi } from './pages/profil/DataPribadi';
import { Inpassing } from './pages/profil/Inpassing';
import { JabatanFungsional } from './pages/profil/JabatanFungsional';
import { Kepangkatan } from './pages/profil/Kepangkatan';
import { Penempatan } from './pages/profil/Penempatan';
import { ProfesorEmeritus } from './pages/profil/ProfesorEmeritus';

// Kualifikasi
import { PendidikanFormal } from './pages/kualifikasi/PendidikanFormal';
import { Diklat } from './pages/kualifikasi/Diklat';
import { RiwayatPekerjaan } from './pages/kualifikasi/RiwayatPekerjaan';

// Kompetensi
import { Sertifikasi } from './pages/kompetensi/Sertifikasi';
import { Tes } from './pages/kompetensi/Tes';

// Pelaksanaan Penelitian
import { Penelitian } from './pages/penelitian/Penelitian';
import { PublikasiKarya } from './pages/penelitian/PublikasiKarya';
import { HKI } from './pages/penelitian/HKI';

// Pelaksanaan Pendidikan
import { Pengajaran } from './pages/pendidikan/Pengajaran';
import { BimbinganMahasiswa } from './pages/pendidikan/BimbinganMahasiswa';
import { PengujianMahasiswa } from './pages/pendidikan/PengujianMahasiswa';
import { BahanAjar } from './pages/pendidikan/BahanAjar';
import { PembinaanMahasiswa } from './pages/pendidikan/PembinaanMahasiswa';
import { VisitingScientist } from './pages/pendidikan/VisitingScientist';
import { Detasering } from './pages/pendidikan/Detasering';
import { OrasiIlmiah } from './pages/pendidikan/OrasiIlmiah';
import { PembimbingDosen } from './pages/pendidikan/PembimbingDosen';
import { TugasTambahan } from './pages/pendidikan/TugasTambahan';

// Pelaksanaan Pengabdian
import { Pengabdian } from './pages/pengabdian/Pengabdian';
import { Pembicara } from './pages/pengabdian/Pembicara';
import { PengelolaJurnal } from './pages/pengabdian/PengelolaJurnal';
import { JabatanStruktural } from './pages/pengabdian/JabatanStruktural';

// Penunjang
import { AnggotaProfesi } from './pages/penunjang/AnggotaProfesi';
import { Penghargaan } from './pages/penunjang/Penghargaan';
import { PenunjangLain } from './pages/penunjang/PenunjangLain';

// Reward
import { Beasiswa } from './pages/reward/Beasiswa';
import { Kesejahteraan } from './pages/reward/Kesejahteraan';
import { Tunjangan } from './pages/reward/Tunjangan';

// Generic placeholder for pages not yet detailed
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 bg-[#06B6D4]/20 rounded-[6px] flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-[#06B6D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h2 className="text-base font-medium text-white">{title}</h2>
      <p className="text-xs text-gray-400 mt-1.5 max-w-xs">
        Halaman ini akan segera tersedia. Formulir dan tabel data sedang dalam tahap pengembangan.
      </p>
    </div>
  );
}

function wrap(element: React.ReactNode) {
  return (
    <DosenProvider>
      <MainLayout>{element}</MainLayout>
    </DosenProvider>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <BrowserRouter>
          <Routes>
          {/* Public Routes (no sidebar) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dosen" element={<DosenList />} />
          <Route path="/login" element={<Login />} />

          {/* Dosen-specific Routes (with sidebar) */}
          <Route path="/dosen/:dosenId" element={wrap(<Dashboard />)} />

          {/* Profil */}
          <Route path="/dosen/:dosenId/profil/data-pribadi" element={wrap(<DataPribadi />)} />
          <Route path="/dosen/:dosenId/profil/inpassing" element={wrap(<Inpassing />)} />
          <Route path="/dosen/:dosenId/profil/jabatan-fungsional" element={wrap(<JabatanFungsional />)} />
          <Route path="/dosen/:dosenId/profil/kepangkatan" element={wrap(<Kepangkatan />)} />
          <Route path="/dosen/:dosenId/profil/penempatan" element={wrap(<Penempatan />)} />
          <Route path="/dosen/:dosenId/profil/profesor-emeritus" element={wrap(<ProfesorEmeritus />)} />

          {/* Kualifikasi */}
          <Route path="/dosen/:dosenId/kualifikasi/pendidikan-formal" element={wrap(<PendidikanFormal />)} />
          <Route path="/dosen/:dosenId/kualifikasi/diklat" element={wrap(<Diklat />)} />
          <Route path="/dosen/:dosenId/kualifikasi/riwayat-pekerjaan" element={wrap(<RiwayatPekerjaan />)} />

          {/* Kompetensi */}
          <Route path="/dosen/:dosenId/kompetensi/sertifikasi" element={wrap(<Sertifikasi />)} />
          <Route path="/dosen/:dosenId/kompetensi/tes" element={wrap(<Tes />)} />

          {/* Pelaksanaan Pendidikan */}
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/pengajaran" element={wrap(<Pengajaran />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/bimbingan-mahasiswa" element={wrap(<BimbinganMahasiswa />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/pengujian-mahasiswa" element={wrap(<PengujianMahasiswa />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/bahan-ajar" element={wrap(<BahanAjar />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/pembinaan-mahasiswa" element={wrap(<PembinaanMahasiswa />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/visiting-scientist" element={wrap(<VisitingScientist />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/detasering" element={wrap(<Detasering />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/orasi-ilmiah" element={wrap(<OrasiIlmiah />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/pembimbing-dosen" element={wrap(<PembimbingDosen />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pendidikan/tugas-tambahan" element={wrap(<TugasTambahan />)} />

          {/* Pelaksanaan Penelitian */}
          <Route path="/dosen/:dosenId/pelaksanaan-penelitian/penelitian" element={wrap(<Penelitian />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-penelitian/publikasi-karya" element={wrap(<PublikasiKarya />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-penelitian/paten-hki" element={wrap(<HKI />)} />

          {/* Pelaksanaan Pengabdian */}
          <Route path="/dosen/:dosenId/pelaksanaan-pengabdian/pengabdian" element={wrap(<Pengabdian />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pengabdian/pembicara" element={wrap(<Pembicara />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pengabdian/pengelola-jurnal" element={wrap(<PengelolaJurnal />)} />
          <Route path="/dosen/:dosenId/pelaksanaan-pengabdian/jabatan-struktural" element={wrap(<JabatanStruktural />)} />

          {/* Penunjang */}
          <Route path="/dosen/:dosenId/penunjang/anggota-profesi" element={wrap(<AnggotaProfesi />)} />
          <Route path="/dosen/:dosenId/penunjang/penghargaan" element={wrap(<Penghargaan />)} />
          <Route path="/dosen/:dosenId/penunjang/penunjang-lain" element={wrap(<PenunjangLain />)} />

          {/* Reward */}
          <Route path="/dosen/:dosenId/reward/beasiswa" element={wrap(<Beasiswa />)} />
          <Route path="/dosen/:dosenId/reward/kesejahteraan" element={wrap(<Kesejahteraan />)} />
          <Route path="/dosen/:dosenId/reward/tunjangan" element={wrap(<Tunjangan />)} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}
