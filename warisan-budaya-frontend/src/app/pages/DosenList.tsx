import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Database, ArrowRight } from 'lucide-react';
import { mockDosens, type Dosen } from '../contexts/DosenContext';

export function DosenList() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'sinta' | 'recent'>('recent');

  // Filter and sort
  const filtered = mockDosens.filter(dosen => {
    const searchLower = search.toLowerCase();
    return (
      dosen.name.toLowerCase().includes(searchLower) ||
      dosen.study_program.toLowerCase().includes(searchLower) ||
      dosen.faculty.toLowerCase().includes(searchLower) ||
      dosen.nidn.includes(searchLower)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'sinta') return (b.sinta_score || 0) - (a.sinta_score || 0);
    if (sortBy === 'recent') return (b.tahun_upload || 0) - (a.tahun_upload || 0);
    return 0;
  });

  const getFullName = (dosen: Dosen) => {
    return `${dosen.title_prefix ? dosen.title_prefix + ' ' : ''}${dosen.name}${dosen.title_suffix ? ', ' + dosen.title_suffix : ''}`;
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header Navbar */}
      <nav className="bg-[#1F2937] border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#06B6D4] rounded-[4px] flex items-center justify-center">
              <Database className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm text-white">Digital Cultural Heritage</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/dosen"
              className="text-xs text-gray-400 hover:text-[#06B6D4] transition-colors"
            >
              Daftar Dosen
            </Link>
            <Link
              to="/login"
              className="px-3 py-1.5 bg-[#06B6D4] text-white rounded-[4px] text-xs hover:bg-[#0891B2] transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-base text-white">Daftar Dosen</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Daftar seluruh dosen kontributor arsip
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3 mb-4">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={2} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau ID kontributor..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#111827] border border-gray-700 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] placeholder:text-gray-400 text-white"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-[#111827] border border-gray-700 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] text-white"
            >
              <option value="recent">Urutan: Tahun Upload (Terbaru)</option>
              <option value="name">Urutan: Nama (A-Z)</option>
              <option value="sinta">Urutan: SINTA Score (Tertinggi)</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3">
          <p className="text-xs text-gray-400">
            Halaman <span className="font-medium text-white">1 dari 1</span> | Total Dosen <span className="font-medium text-white">{sorted.length}</span>
          </p>
        </div>

        {/* Dosen Cards */}
        <div className="space-y-3">
          {sorted.map((dosen) => (
            <Link
              key={dosen.id}
              to={`/dosen/${dosen.id}`}
              className="block bg-[#1F2937] border border-gray-700 rounded-[4px] p-4 hover:border-[#06B6D4] hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Photo */}
                <div className="w-14 h-14 rounded-[4px] bg-[#06B6D4] text-white flex items-center justify-center text-sm shrink-0">
                  {dosen.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <h3 className="text-xs text-white mb-2">
                    {getFullName(dosen)}
                  </h3>

                  {/* Meta Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mb-2">
                    <div className="text-[11px] text-gray-300">
                      <span className="text-gray-400">Prodi:</span> {dosen.study_program}
                    </div>
                    <div className="text-[11px] text-gray-300">
                      <span className="text-gray-400">Fakultas:</span> {dosen.faculty}
                    </div>
                    <div className="text-[11px] text-gray-300">
                      <span className="text-gray-400">SINTA ID:</span> <span className="font-mono">{dosen.nidn}</span>
                    </div>
                    <div className="text-[11px] text-gray-300">
                      <span className="text-gray-400">Tahun Upload:</span> {dosen.tahun_upload}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="text-[11px] text-gray-300 mb-2">
                    <span className="text-gray-400">Metrics:</span>{' '}
                    Scopus H-Index: <span className="text-white">{dosen.scopus_h_index}</span>, {' '}
                    Google Scholar H-Index: <span className="text-white">{dosen.google_scholar_h_index}</span>, {' '}
                    Publikasi: <span className="text-white">{dosen.total_publications}</span>
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center gap-1 text-[11px] text-[#06B6D4]">
                    <span>Lihat Detail Profil</span>
                    <ArrowRight className="w-3 h-3" strokeWidth={2} />
                  </div>
                </div>

                {/* Scores */}
                <div className="text-right shrink-0">
                  <div className="mb-2">
                    <div className="text-xl text-white">{dosen.sinta_score}</div>
                    <div className="text-[9px] text-gray-400">SINTA 3Yrs</div>
                  </div>
                  <div>
                    <div className="text-base text-gray-300">{Math.round((dosen.sinta_score || 0) * 1.5)}</div>
                    <div className="text-[9px] text-gray-400">Overall</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {sorted.length === 0 && (
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-12 text-center">
            <div className="w-12 h-12 bg-[#06B6D4]/20 rounded-[4px] flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5 text-[#06B6D4]" strokeWidth={2} />
            </div>
            <h3 className="text-xs text-white mb-1">Tidak ada dosen ditemukan</h3>
            <p className="text-[11px] text-gray-400">
              Coba gunakan kata kunci pencarian yang berbeda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
