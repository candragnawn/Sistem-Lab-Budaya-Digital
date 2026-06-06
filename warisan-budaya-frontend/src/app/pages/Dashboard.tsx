import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { CheckCircle, ExternalLink, TrendingUp, FileText, Users, Award, Database, FlaskConical } from 'lucide-react';
import { PublicBanner } from '../components/UI/PublicBanner';
import { useAuth } from '../hooks/useAuth';
import { useDosen } from '../hooks/useDosen';
import { Link } from 'react-router';

const pubTrend = [
  { year: '2020', publikasi: 3, sitasi: 12 },
  { year: '2021', publikasi: 5, sitasi: 24 },
  { year: '2022', publikasi: 4, sitasi: 31 },
  { year: '2023', publikasi: 7, sitasi: 45 },
  { year: '2024', publikasi: 6, sitasi: 58 },
];

const researchTrend = [
  { year: '2020', penelitian: 2, pengabdian: 1 },
  { year: '2021', penelitian: 3, pengabdian: 2 },
  { year: '2022', penelitian: 2, pengabdian: 3 },
  { year: '2023', penelitian: 4, pengabdian: 2 },
  { year: '2024', penelitian: 3, pengabdian: 4 },
];

const stats = [
  { label: 'Total Publikasi', value: '25', icon: FileText, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.2)' },
  { label: 'Total Sitasi', value: '170', icon: TrendingUp, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.2)' },
  { label: 'Bimbingan Mhs', value: '48', icon: Users, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.2)' },
  { label: 'Skor SINTA 3Thn', value: '1.24', icon: Award, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.2)' },
  { label: 'Skor SINTA Total', value: '3.87', icon: Award, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.2)' },
  { label: 'Penelitian', value: '14', icon: FlaskConical, color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.2)' },
];

const recentPublications = [
  { id: 1, title: 'Deep Learning for Medical Image Analysis: A Systematic Review', journal: 'Nature Medicine', year: 2024, quartile: 'Q1', verified: true },
  { id: 2, title: 'Optimization of Renewable Energy Systems using Metaheuristic Algorithms', journal: 'IEEE Transactions on Energy', year: 2024, quartile: 'Q2', verified: true },
  { id: 3, title: 'Machine Learning Applications in Educational Technology', journal: 'Computers & Education', year: 2023, quartile: 'Q1', verified: false },
];

export function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { currentDosen, isLoading } = useDosen();
  const dosenId = currentDosen?.id;

  // Use current dosen data from context
  const displayName = currentDosen
    ? `${currentDosen.title_prefix ? currentDosen.title_prefix + ' ' : ''}${currentDosen.name}${currentDosen.title_suffix ? ', ' + currentDosen.title_suffix : ''}`
    : 'Dr. Rudi Hartono, S.Kom., M.T.';
  const displayEmail = currentDosen?.email || 'rudi.h@university.ac.id';
  const displayFaculty = currentDosen?.faculty || 'Teknik Informatika';
  const displayProgram = currentDosen?.study_program || 'Sistem Informasi';
  const displayNIDN = currentDosen?.nidn || '0012345678';
  const displayNIP = currentDosen?.nip || '198501012010011001';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PublicBanner />

      {/* Profile + IDs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-[#1F2937] border border-gray-700 rounded-[4px] p-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-[4px] bg-[#06B6D4] text-white flex items-center justify-center text-xl shrink-0">
              {currentDosen?.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'RH'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm text-white">{displayName}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">NIDN: {displayNIDN} · NIP: {displayNIP}</p>
                </div>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-[#06B6D4]/20 border border-[#06B6D4]/30 rounded text-[10px] text-[#06B6D4] shrink-0">
                  <CheckCircle className="w-3 h-3" strokeWidth={2} />
                  Terverifikasi
                </span>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1">
                {[
                  ['Fakultas', displayFaculty],
                  ['Program Studi', displayProgram],
                  ['Status', currentDosen?.status || 'Dosen Tetap PNS'],
                  ['Email', displayEmail],
                  ['Telepon', currentDosen?.phone || '+62 812 3456 7890'],
                  ['Jabatan', 'Lektor Kepala'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[10px] text-gray-400">{k}</p>
                    <p className="text-xs text-gray-200 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-300 mt-3 leading-relaxed border-t border-gray-700 pt-3">
            {currentDosen?.bio || 'Dosen tetap dengan keahlian di bidang kecerdasan buatan dan machine learning. Aktif dalam penelitian lintas bidang ilmu komputer dan teknologi informasi. Telah menghasilkan lebih dari 25 publikasi ilmiah di jurnal internasional bereputasi.'}
          </p>
        </div>

        {/* External IDs */}
        <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-4">
          <p className="text-xs text-white mb-3">ID Akademik Eksternal</p>
          <div className="space-y-2.5">
            {[
              { label: 'SINTA ID', value: currentDosen?.sinta_id || 'S-12345678', url: '#' },
              { label: 'Scopus ID', value: currentDosen?.scopus_id || '57234567890', url: '#' },
              { label: 'SISTER ID', value: displayNIDN, url: '#' },
              { label: 'Google Scholar', value: currentDosen?.google_scholar_id || 'abc123XYZ', url: '#' },
              { label: 'ORCID', value: currentDosen?.orcid_id || '0000-0001-2345-6789', url: '#' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400">{item.label}</p>
                  <p className="text-xs text-gray-200 font-medium">{item.value}</p>
                </div>
                <a href={item.url} className="p-1 hover:bg-gray-800 rounded transition-colors">
                  <ExternalLink className="w-3 h-3 text-gray-400 hover:text-[#06B6D4]" strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-gray-400 leading-tight">{s.label}</p>
                <div className="w-6 h-6 rounded-[4px] flex items-center justify-center shrink-0" style={{ backgroundColor: s.bg }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: s.color }} strokeWidth={2} />
                </div>
              </div>
              <p className="text-xl text-white">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white">Tren Publikasi & Sitasi</p>
            <span className="text-[10px] text-gray-400">2020 – 2024</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={pubTrend}>
              <defs>
                <linearGradient id="pubGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0891B2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #374151', borderRadius: 6, backgroundColor: '#1F2937', color: '#fff' }} />
              <Area type="monotone" dataKey="publikasi" stroke="#06B6D4" fill="url(#pubGrad)" strokeWidth={2} name="Publikasi" />
              <Area type="monotone" dataKey="sitasi" stroke="#0891B2" fill="url(#sitGrad)" strokeWidth={2} name="Sitasi" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white">Penelitian & Pengabdian</p>
            <span className="text-[10px] text-gray-400">2020 – 2024</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={researchTrend} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #374151', borderRadius: 6, backgroundColor: '#1F2937', color: '#fff' }} />
              <Bar dataKey="penelitian" fill="#06B6D4" radius={[3, 3, 0, 0]} name="Penelitian" />
              <Bar dataKey="pengabdian" fill="#0891B2" radius={[3, 3, 0, 0]} name="Pengabdian" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Publications */}
      <div className="bg-[#1F2937] border border-gray-700 rounded-[4px]">
        <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <p className="text-xs text-white">Publikasi Terbaru</p>
          <Link to={`/dosen/${dosenId}/pelaksanaan-penelitian/publikasi-karya`} className="text-[10px] text-[#06B6D4] hover:underline">Lihat semua</Link>
        </div>
        <div className="divide-y divide-gray-700">
          {recentPublications.map(pub => (
            <div key={pub.id} className="px-4 py-3 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white leading-snug">{pub.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{pub.journal} · {pub.year}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="px-1.5 py-0.5 bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 rounded text-[10px]">
                  {pub.quartile}
                </span>
                {pub.verified ? (
                  <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-[10px]">
                    Verified
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[10px]">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
