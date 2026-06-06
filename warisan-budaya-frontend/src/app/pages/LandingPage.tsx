import { Link } from 'react-router';
import { FileText, User, Database, ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Navbar */}
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

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl text-white mb-3 text-center">
            Sistem Informasi Penelitian dan Publikasi Dosen
          </h1>
          <p className="text-xs text-gray-300 text-center mb-8 max-w-2xl mx-auto leading-relaxed">
            Portal terpadu untuk mengakses profil, penelitian, publikasi, dan prestasi akademik dosen secara transparan dan terstruktur
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/dosen"
              className="flex items-center gap-2 px-3 py-2 bg-[#06B6D4] text-white rounded-[4px] text-xs hover:bg-[#0891B2] transition-colors"
            >
              Lihat Daftar Dosen
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3 text-center">
            <div className="text-xl text-white mb-1">150+</div>
            <div className="text-[10px] text-gray-400">Dosen Aktif</div>
          </div>
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3 text-center">
            <div className="text-xl text-white mb-1">1,200+</div>
            <div className="text-[10px] text-gray-400">Publikasi</div>
          </div>
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3 text-center">
            <div className="text-xl text-white mb-1">500+</div>
            <div className="text-[10px] text-gray-400">Penelitian</div>
          </div>
          <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3 text-center">
            <div className="text-xl text-white mb-1">300+</div>
            <div className="text-[10px] text-gray-400">Pengabdian</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm text-white mb-4 text-center">
            Fitur Utama
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3">
              <div className="w-8 h-8 bg-[#06B6D4]/20 rounded-[4px] flex items-center justify-center mb-2">
                <FileText className="w-4 h-4 text-[#06B6D4]" strokeWidth={2} />
              </div>
              <h3 className="text-xs text-white mb-1.5">Publikasi Ilmiah</h3>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Akses lengkap publikasi jurnal, prosiding, dan karya ilmiah dari dosen
              </p>
            </div>

            <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3">
              <div className="w-8 h-8 bg-[#06B6D4]/20 rounded-[4px] flex items-center justify-center mb-2">
                <User className="w-4 h-4 text-[#06B6D4]" strokeWidth={2} />
              </div>
              <h3 className="text-xs text-white mb-1.5">Profil Dosen</h3>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Informasi lengkap profil, kualifikasi, dan kompetensi dosen
              </p>
            </div>

            <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3">
              <div className="w-8 h-8 bg-[#06B6D4]/20 rounded-[4px] flex items-center justify-center mb-2">
                <Database className="w-4 h-4 text-[#06B6D4]" strokeWidth={2} />
              </div>
              <h3 className="text-xs text-white mb-1.5">Data Akademik</h3>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Penelitian, pengabdian, pengajaran, dan prestasi akademik lengkap
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#1F2937] border-t border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-sm text-white mb-2">
              Jelajahi Profil Dosen
            </h2>
            <p className="text-xs text-gray-300 mb-6 leading-relaxed">
              Lihat daftar lengkap dosen beserta publikasi dan prestasi akademik mereka
            </p>
            <Link
              to="/dosen"
              className="inline-flex items-center gap-2 px-3 py-2 bg-[#06B6D4] text-white rounded-[4px] text-xs hover:bg-[#0891B2] transition-colors"
            >
              Lihat Daftar Dosen
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0F172A] border-t border-gray-700">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-[10px] text-gray-400">
            © 2026 Digital Cultural Heritage - Sistem Informasi Penelitian dan Publikasi Dosen
          </p>
        </div>
      </div>
    </div>
  );
}
