import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import {
  User, ChevronRight, ChevronDown,
  Database, FileText, Award, Gift,
  Briefcase, FlaskConical, Users, Star
} from 'lucide-react';
import { useDosen } from '../../hooks/useDosen';

interface NavChild {
  title: string;
  path: string;
  resource?: string | string[];
}

interface NavGroup {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  children?: NavChild[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Profil',
    icon: User,
    path: '/profil',
    children: [
      { title: 'Data pribadi', path: '/profil/data-pribadi', resource: ['identities', 'lecturer-addresses', 'lecturer-families', 'lecturer-academics', 'lecturer-employments', 'positions', 'work-contracts'] },
      { title: 'Inpassing', path: '/profil/inpassing', resource: 'inpassings' },
      { title: 'Jabatan fungsional', path: '/profil/jabatan-fungsional', resource: 'functional-positions' },
      { title: 'Kepangkatan', path: '/profil/kepangkatan', resource: 'ranks' },
      { title: 'Penempatan', path: '/profil/penempatan', resource: 'placements' },
      { title: 'Profesor Emeritus', path: '/profil/profesor-emeritus', resource: 'professor-emerituses' },
    ],
  },
  {
    title: 'Kualifikasi',
    icon: Star,
    path: '/kualifikasi',
    children: [
      { title: 'Pendidikan formal', path: '/kualifikasi/pendidikan-formal', resource: 'lecturer-educations' },
      { title: 'Diklat', path: '/kualifikasi/diklat', resource: 'diklats' },
      { title: 'Riwayat Pekerjaan', path: '/kualifikasi/riwayat-pekerjaan', resource: 'jobs' },
    ],
  },
  {
    title: 'Kompetensi',
    icon: Award,
    path: '/kompetensi',
    children: [
      { title: 'Sertifikasi', path: '/kompetensi/sertifikasi', resource: 'certifications' },
      { title: 'Tes', path: '/kompetensi/tes', resource: 'tests' },
    ],
  },
  {
    title: 'Pelaks. pendidikan',
    icon: FileText,
    path: '/pelaksanaan-pendidikan',
    children: [
      { title: 'Pengajaran', path: '/pelaksanaan-pendidikan/pengajaran', resource: 'teachings' },
      { title: 'Bimbingan Mahasiswa', path: '/pelaksanaan-pendidikan/bimbingan-mahasiswa', resource: 'student-supervisions' },
      { title: 'Pengujian mahasiswa', path: '/pelaksanaan-pendidikan/pengujian-mahasiswa', resource: 'student-examinations' },
      { title: 'Bahan Ajar', path: '/pelaksanaan-pendidikan/bahan-ajar', resource: 'teaching-materials' },
      { title: 'Pembinaan Mahasiswa', path: '/pelaksanaan-pendidikan/pembinaan-mahasiswa', resource: 'student-developments' },
      { title: 'Visiting Scientist', path: '/pelaksanaan-pendidikan/visiting-scientist', resource: 'visiting-scientists' },
      { title: 'Detasering', path: '/pelaksanaan-pendidikan/detasering', resource: 'detaserings' },
      { title: 'Orasi Ilmiah', path: '/pelaksanaan-pendidikan/orasi-ilmiah', resource: 'academic-orations' },
      { title: 'Pembimbing dosen', path: '/pelaksanaan-pendidikan/pembimbing-dosen', resource: 'lecturer-mentorings' },
      { title: 'Tugas tambahan', path: '/pelaksanaan-pendidikan/tugas-tambahan', resource: 'additional-tasks' },
    ],
  },
  {
    title: 'Pelaks. penelitian',
    icon: FlaskConical,
    path: '/pelaksanaan-penelitian',
    children: [
      { title: 'Penelitian', path: '/pelaksanaan-penelitian/penelitian', resource: 'research' },
      { title: 'Publikasi karya', path: '/pelaksanaan-penelitian/publikasi-karya', resource: ['publications', 'publication-authors'] },
      { title: 'Paten/HKI', path: '/pelaksanaan-penelitian/paten-hki', resource: 'hkis' },
    ],
  },
  {
    title: 'Pelaks. pengabdian',
    icon: Users,
    path: '/pelaksanaan-pengabdian',
    children: [
      { title: 'Pengabdian', path: '/pelaksanaan-pengabdian/pengabdian', resource: 'community-services' },
      { title: 'Pembicara', path: '/pelaksanaan-pengabdian/pembicara', resource: 'speakers' },
      { title: 'Pengelola jurnal', path: '/pelaksanaan-pengabdian/pengelola-jurnal', resource: 'journal-managers' },
      { title: 'Jabatan struktural', path: '/pelaksanaan-pengabdian/jabatan-struktural', resource: 'structural-positions' },
    ],
  },
  {
    title: 'Penunjang',
    icon: Briefcase,
    path: '/penunjang',
    children: [
      { title: 'Anggota profesi', path: '/penunjang/anggota-profesi', resource: 'professional-memberships' },
      { title: 'Penghargaan', path: '/penunjang/penghargaan', resource: 'awards' },
      { title: 'Penunjang lain', path: '/penunjang/penunjang-lain', resource: 'other-supporting-activities' },
    ],
  },
  {
    title: 'Reward',
    icon: Gift,
    path: '/reward',
    children: [
      { title: 'Beasiswa', path: '/reward/beasiswa', resource: 'scholarships' },
      { title: 'Kesejahteraan', path: '/reward/kesejahteraan', resource: 'welfares' },
      { title: 'Tunjangan', path: '/reward/tunjangan', resource: 'allowances' },
    ],
  },
];

function NavItem({ group }: { group: NavGroup }) {
  const location = useLocation();
  const params = useParams<{ dosenId: string }>();
  const dosenId = params.dosenId;

  const isActive = group.children?.some(c => {
    const fullPath = `/dosen/${dosenId}${c.path}`;
    return location.pathname === fullPath;
  });
  const [open, setOpen] = useState(isActive ?? false);
  const Icon = group.icon;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors text-xs ${
          isActive ? 'bg-gray-700 text-[#06B6D4]' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
          <span>{group.title}</span>
        </div>
        {open ? <ChevronDown className="w-3 h-3" strokeWidth={2} /> : <ChevronRight className="w-3 h-3" strokeWidth={2} />}
      </button>

      {open && group.children && (
        <div className="bg-[#111827]">
          {group.children.map(child => {
            const fullPath = `/dosen/${dosenId}${child.path}`;
            const childActive = location.pathname === fullPath;
            return (
              <Link
                key={child.path}
                to={fullPath}
                className={`block px-3 py-2 pl-9 text-xs text-gray-400 hover:bg-gray-700 hover:text-white transition-colors ${
                  childActive ? 'bg-[#06B6D4]/20 text-[#06B6D4] border-l-2 border-[#06B6D4]' : ''
                }`}
              >
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}.${minutes}.${seconds}`;
  };

  return (
    <div className="bg-[#111827] border border-gray-700 px-3 py-1.5 rounded text-[10px] text-gray-300 font-medium text-center">
      {formatDate(time)}
    </div>
  );
}

export function Sidebar() {
  const { currentDosen } = useDosen();

  const displayName = currentDosen
    ? currentDosen.name.toUpperCase()
    : 'LOADING...';

  const nameParts = currentDosen ? currentDosen.name.split(' ') : [];
  const firstName = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(' ').toUpperCase();
  const lastName = nameParts.slice(Math.ceil(nameParts.length / 2)).join(' ').toUpperCase();

  return (
    <aside
      className="w-60 flex flex-col h-screen fixed left-0 top-0 z-20 text-white bg-[#1F2937]"
    >
      {/* Header with Logo */}
      <div className="p-4 pb-3">
        <Link to="/dosen" className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[#06B6D4] rounded-[4px] flex items-center justify-center shrink-0">
            <Database className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <div className="text-sm tracking-wide">Digital Cultural Heritage</div>
        </Link>

        {/* Clock */}
        <Clock />

        {/* Dosen Name */}
        <div className="mt-3 text-[10px] leading-tight text-gray-300">
          <div>Profil Dosen:</div>
          {currentDosen ? (
            <>
              <div className="font-medium mt-0.5 text-white">{firstName}</div>
              {lastName && <div className="font-medium text-white">{lastName}</div>}
            </>
          ) : (
            <div className="font-medium mt-0.5 text-white">Loading...</div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {navGroups.map(group => (
          <NavItem key={group.path} group={group} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 text-[10px] text-white/60 text-center">
        © 2026 DCH
      </div>
    </aside>
  );
}
