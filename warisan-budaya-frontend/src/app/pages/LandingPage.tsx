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

      {/* Hero Section - Menaikkan tinggi sedikit ke 440px agar proporsi gedung lebih lega */}
      <section 
        className="min-h-[440px] relative bg-cover bg-[center_top_20%] bg-no-repeat w-full flex flex-col justify-center"
        style={{ backgroundImage: `url('/fmipa.jpg')` }}
      >
        {/* TRANSISI GRADIENT: Atas agak transparan (80%) agar gedung terlihat, bawah 100% pekat menyatu ke bg-page-dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-page-dark/85 via-page-dark/90 to-page-dark pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl text-brand-card mb-3 text-center font-semibold">
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
      </section>

      {/* Stats Cards - Menggunakan -mt-8 (minus margin) agar kartu sedikit naik menumpuk di atas area gradasi pudar */}
      <div className="-mt-8 container relative z-20 mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-surface-dark/95 backdrop-blur-sm border border-border-dark rounded-[4px] p-3 text-center shadow-lg">
            <div className="text-xl text-brand-card mb-1 font-semibold">150+</div>
            <div className="text-[10px] text-text-placeholder">Dosen Aktif</div>
          </div>
          <div className="bg-surface-dark/95 backdrop-blur-sm border border-border-dark rounded-[4px] p-3 text-center shadow-lg">
            <div className="text-xl text-brand-card mb-1 font-semibold">1,200+</div>
            <div className="text-[10px] text-text-placeholder">Publikasi</div>
          </div>
          <div className="bg-surface-dark/95 backdrop-blur-sm border border-border-dark rounded-[4px] p-3 text-center shadow-lg">
            <div className="text-xl text-brand-card mb-1 font-semibold">500+</div>
            <div className="text-[10px] text-text-placeholder">Penelitian</div>
          </div>
          <div className="bg-surface-dark/95 backdrop-blur-sm border border-border-dark rounded-[4px] p-3 text-center shadow-lg">
            <div className="text-xl text-brand-card mb-1 font-semibold">300+</div>
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