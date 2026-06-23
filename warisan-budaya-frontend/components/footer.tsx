import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mt-auto border-t-2 border-yellow-400 bg-transparent">
      {/* Top thin gradient */}
      <div className="h-2 w-full bg-gradient-to-b from-yellow-400 to-transparent" />

      <div className="bg-[#123456] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/SIWADA.svg"
                alt="SIWADA Logo"
                width={40}
                height={40}
                className="shrink-0"
              />
              <span className="text-lg font-bold tracking-tight text-white">SIWADA</span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed mt-1">Digital Cultural katalog Heritage</p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="flex flex-col gap-2">
            <h3 className="text-yellow-300 font-semibold text-base">Navigasi</h3>
            <nav className="flex flex-col gap-2 mt-2">
              <Link href="#" className="text-sm text-white/80 hover:text-white transition-colors">Dosen</Link>
              <Link href="#" className="text-sm text-white/80 hover:text-white transition-colors">Publikasi</Link>
              <Link href="#" className="text-sm text-white/80 hover:text-white transition-colors">Arsip Digital</Link>
            </nav>
          </div>

          {/* Column 3: Kontak */}
          <div className="flex flex-col gap-2">
            <h3 className="text-yellow-300 font-semibold text-base">Kontak</h3>
            <div className="flex flex-col gap-1 text-sm text-white/80 mt-2">
              <p>Fakultas Teknik, Universitas Udayana</p>
              <p>Jl. Raya Kampus Unud, Bukit Jimbaran</p>
              <a href="mailto:labbudayadigital@unud.ac.id" className="hover:text-white transition-colors">labbudayadigital@unud.ac.id</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-[#0F172A] text-white/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© 2026 Digital Cultural katalog Heritage</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <span className="text-white/30">·</span>
            <Link href="#" className="hover:text-white transition-colors">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
