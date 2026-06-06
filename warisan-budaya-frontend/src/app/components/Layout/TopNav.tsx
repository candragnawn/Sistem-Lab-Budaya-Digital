import { Bell, Search, ChevronDown, Home, ChevronRight, LogOut, User, Settings, ArrowLeft } from 'lucide-react';
import { useLocation, Link, useNavigate, useParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useDosen } from '../../hooks/useDosen';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface TopNavProps {
  breadcrumbs?: { label: string; path?: string }[];
}

function buildBreadcrumb(pathname: string, dosenId?: string): { label: string; path?: string }[] {
  const map: Record<string, string> = {
    [`/dosen/${dosenId}`]: 'Dashboard',
    // Profil
    [`/dosen/${dosenId}/profil/data-pribadi`]: 'Data pribadi',
    [`/dosen/${dosenId}/profil/inpassing`]: 'Inpassing',
    [`/dosen/${dosenId}/profil/jabatan-fungsional`]: 'Jabatan fungsional',
    [`/dosen/${dosenId}/profil/kepangkatan`]: 'Kepangkatan',
    [`/dosen/${dosenId}/profil/penempatan`]: 'Penempatan',
    [`/dosen/${dosenId}/profil/profesor-emeritus`]: 'Profesor Emeritus',
    // Kualifikasi
    [`/dosen/${dosenId}/kualifikasi/pendidikan-formal`]: 'Pendidikan formal',
    [`/dosen/${dosenId}/kualifikasi/diklat`]: 'Diklat',
    [`/dosen/${dosenId}/kualifikasi/riwayat-pekerjaan`]: 'Riwayat Pekerjaan',
    // Kompetensi
    [`/dosen/${dosenId}/kompetensi/sertifikasi`]: 'Sertifikasi',
    [`/dosen/${dosenId}/kompetensi/tes`]: 'Tes',
    // Pelaksanaan Pendidikan
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/pengajaran`]: 'Pengajaran',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/bimbingan-mahasiswa`]: 'Bimbingan Mahasiswa',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/pengujian-mahasiswa`]: 'Pengujian mahasiswa',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/bahan-ajar`]: 'Bahan Ajar',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/pembinaan-mahasiswa`]: 'Pembinaan Mahasiswa',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/visiting-scientist`]: 'Visiting Scientist',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/detasering`]: 'Detasering',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/orasi-ilmiah`]: 'Orasi Ilmiah',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/pembimbing-dosen`]: 'Pembimbing dosen',
    [`/dosen/${dosenId}/pelaksanaan-pendidikan/tugas-tambahan`]: 'Tugas tambahan',
    // Pelaksanaan Penelitian
    [`/dosen/${dosenId}/pelaksanaan-penelitian/penelitian`]: 'Penelitian',
    [`/dosen/${dosenId}/pelaksanaan-penelitian/publikasi-karya`]: 'Publikasi karya',
    [`/dosen/${dosenId}/pelaksanaan-penelitian/paten-hki`]: 'Paten/HKI',
    // Pelaksanaan Pengabdian
    [`/dosen/${dosenId}/pelaksanaan-pengabdian/pengabdian`]: 'Pengabdian',
    [`/dosen/${dosenId}/pelaksanaan-pengabdian/pembicara`]: 'Pembicara',
    [`/dosen/${dosenId}/pelaksanaan-pengabdian/pengelola-jurnal`]: 'Pengelola jurnal',
    [`/dosen/${dosenId}/pelaksanaan-pengabdian/jabatan-struktural`]: 'Jabatan struktural',
    // Penunjang
    [`/dosen/${dosenId}/penunjang/anggota-profesi`]: 'Anggota profesi',
    [`/dosen/${dosenId}/penunjang/penghargaan`]: 'Penghargaan',
    [`/dosen/${dosenId}/penunjang/penunjang-lain`]: 'Penunjang lain',
    // Reward
    [`/dosen/${dosenId}/reward/beasiswa`]: 'Beasiswa',
    [`/dosen/${dosenId}/reward/kesejahteraan`]: 'Kesejahteraan',
    [`/dosen/${dosenId}/reward/tunjangan`]: 'Tunjangan',
  };

  const sectionMap: Record<string, string> = {
    '/profil': 'Profil',
    '/kualifikasi': 'Kualifikasi',
    '/kompetensi': 'Kompetensi',
    '/pelaksanaan-pendidikan': 'Pelaks. pendidikan',
    '/pelaksanaan-penelitian': 'Pelaks. penelitian',
    '/pelaksanaan-pengabdian': 'Pelaks. pengabdian',
    '/penunjang': 'Penunjang',
    '/reward': 'Reward',
  };

  if (pathname === `/dosen/${dosenId}`) return [{ label: 'Dashboard' }];

  // Remove dosenId from path for section matching
  const pathWithoutDosen = pathname.replace(`/dosen/${dosenId}`, '');
  const section = Object.keys(sectionMap).find(k => pathWithoutDosen.startsWith(k));

  const crumbs: { label: string; path?: string }[] = [{ label: 'Dashboard', path: `/dosen/${dosenId}` }];
  if (section) crumbs.push({ label: sectionMap[section] });
  if (map[pathname]) crumbs.push({ label: map[pathname] });
  return crumbs;
}

export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ dosenId: string }>();
  const { currentDosen } = useDosen();
  const breadcrumbs = buildBreadcrumb(location.pathname, params.dosenId);
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logout berhasil');
    navigate('/login');
    setShowDropdown(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-12 bg-[#1F2937] border-b border-gray-700 flex items-center justify-between px-4 fixed top-0 left-60 right-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Back to Dosen List */}
        <Link
          to="/dosen"
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-[#06B6D4] hover:bg-gray-800 rounded transition-colors"
          title="Kembali ke Daftar Dosen"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="hidden md:inline">Daftar Dosen</span>
        </Link>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Home className="w-3.5 h-3.5" strokeWidth={2} />
        {breadcrumbs.map((crumb, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="w-3 h-3" strokeWidth={2} />}
            {crumb.path && i < breadcrumbs.length - 1 ? (
              <Link to={crumb.path} className="hover:text-[#06B6D4] transition-colors">{crumb.label}</Link>
            ) : (
              <span className={i === breadcrumbs.length - 1 ? 'text-white font-medium' : ''}>
                {crumb.label}
              </span>
            )}
          </div>
        ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="Cari data..."
            className="w-56 pl-8 pr-3 py-1.5 text-xs bg-[#111827] border border-gray-700 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] placeholder:text-gray-400 text-white"
          />
        </div>

        {isAuthenticated && (
          <button className="relative p-1.5 hover:bg-gray-800 rounded transition-colors">
            <Bell className="w-4 h-4 text-gray-400" strokeWidth={2} />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
        )}

        <div className="pl-3 border-l border-gray-700">
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 hover:bg-gray-800 rounded-[6px] px-2 py-1 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#06B6D4] text-white flex items-center justify-center text-[10px] font-medium shrink-0">
                  {getInitials(user.name)}
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs text-white">{user.name}</p>
                  <p className="text-[10px] text-gray-400">
                    <span className="bg-gray-800 text-[#06B6D4] px-1.5 py-0.5 rounded">
                      {user.role === 'dosen' ? 'Dosen' : 'Admin'}
                    </span>
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-[#1F2937] border border-gray-700 rounded-[6px] shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      navigate('/profil/data-pribadi');
                      setShowDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-xs text-left hover:bg-gray-800 flex items-center gap-2 text-white"
                  >
                    <User className="w-3.5 h-3.5" strokeWidth={2} />
                    Profile Saya
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-xs text-left hover:bg-gray-800 flex items-center gap-2 text-white"
                  >
                    <Settings className="w-3.5 h-3.5" strokeWidth={2} />
                    Pengaturan
                  </button>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-xs text-left hover:bg-red-900/20 flex items-center gap-2 text-red-400"
                  >
                    <LogOut className="w-3.5 h-3.5" strokeWidth={2} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#06B6D4] text-white rounded-[4px] hover:bg-[#0891B2] transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
