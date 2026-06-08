import { Link } from 'react-router';
import { FileText, User, Database, ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-page-dark">
      {/* Navbar */}
      <nav className="bg-surface-dark border-b border-border-dark">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-info rounded-[4px] flex items-center justify-center">
              <Database className="w-4 h-4 text-brand-card" strokeWidth={2} />
            </div>
            <span className="text-sm text-brand-card">Digital Cultural Heritage</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/dosen"
              className="text-xs text-text-placeholder hover:text-info transition-colors"
            >
              Daftar Dosen
            </Link>
            <Link
              to="/login"
              className="px-3 py-1.5 bg-info text-brand-card rounded-[4px] text-xs hover:bg-info-hover transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl text-brand-card mb-3 text-center">
            Sistem Informasi Penelitian dan Publikasi Dosen
          </h1>
          <p className="text-xs text-gray-300 text-center mb-8 max-w-2xl mx-auto leading-relaxed">
            Portal terpadu untuk mengakses profil, penelitian, publikasi, dan prestasi akademik dosen secara transparan dan terstruktur
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/dosen"
              className="flex items-center gap-2 px-3 py-2 bg-info text-brand-card rounded-[4px] text-xs hover:bg-info-hover transition-colors"
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
          <div className="bg-surface-dark border border-border-dark rounded-[4px] p-3 text-center">
            <div className="text-xl text-brand-card mb-1">150+</div>
            <div className="text-[10px] text-text-placeholder">Dosen Aktif</div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-[4px] p-3 text-center">
            <div className="text-xl text-brand-card mb-1">1,200+</div>
            <div className="text-[10px] text-text-placeholder">Publikasi</div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-[4px] p-3 text-center">
            <div className="text-xl text-brand-card mb-1">500+</div>
            <div className="text-[10px] text-text-placeholder">Penelitian</div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-[4px] p-3 text-center">
            <div className="text-xl text-brand-card mb-1">300+</div>
            <div className="text-[10px] text-text-placeholder">Pengabdian</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm text-brand-card mb-4 text-center">
            Fitur Utama
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-surface-dark border border-border-dark rounded-[4px] p-3">
              <div className="w-8 h-8 bg-info/20 rounded-[4px] flex items-center justify-center mb-2">
                <FileText className="w-4 h-4 text-info" strokeWidth={2} />
              </div>
              <h3 className="text-xs text-brand-card mb-1.5">Publikasi Ilmiah</h3>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Akses lengkap publikasi jurnal, prosiding, dan karya ilmiah dari dosen
              </p>
            </div>

            <div className="bg-surface-dark border border-border-dark rounded-[4px] p-3">
              <div className="w-8 h-8 bg-info/20 rounded-[4px] flex items-center justify-center mb-2">
                <User className="w-4 h-4 text-info" strokeWidth={2} />
              </div>
              <h3 className="text-xs text-brand-card mb-1.5">Profil Dosen</h3>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Informasi lengkap profil, kualifikasi, dan kompetensi dosen
              </p>
            </div>

            <div className="bg-surface-dark border border-border-dark rounded-[4px] p-3">
              <div className="w-8 h-8 bg-info/20 rounded-[4px] flex items-center justify-center mb-2">
                <Database className="w-4 h-4 text-info" strokeWidth={2} />
              </div>
              <h3 className="text-xs text-brand-card mb-1.5">Data Akademik</h3>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Penelitian, pengabdian, pengajaran, dan prestasi akademik lengkap
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-surface-dark border-t border-border-dark">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-sm text-brand-card mb-2">
              Jelajahi Profil Dosen
            </h2>
            <p className="text-xs text-gray-300 mb-6 leading-relaxed">
              Lihat daftar lengkap dosen beserta publikasi dan prestasi akademik mereka
            </p>
            <Link
              to="/dosen"
              className="inline-flex items-center gap-2 px-3 py-2 bg-info text-brand-card rounded-[4px] text-xs hover:bg-info-hover transition-colors"
            >
              Lihat Daftar Dosen
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-page-dark border-t border-border-dark">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-[10px] text-text-placeholder">
            © 2026 Digital Cultural Heritage - Sistem Informasi Penelitian dan Publikasi Dosen
          </p>
        </div>
      </div>
    </div>
  );
}
