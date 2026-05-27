import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mt-auto border-t-2 border-yellow-400">
      <div className="relative w-full h-[90px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30, 58, 95, 0.4) 0%, var(--color-brand-navy) 100%)",
          }}
        />
      </div>

      <div className="bg-brand-navy text-white border-b-2 ">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 vorde">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/SIWADA.svg"
                alt="SIWADA Logo"
                width={36}
                height={36}
                className="shrink-0"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                SIWADA
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mt-1">
              Laboratorium Warisan Budaya Digital
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="flex flex-col gap-3">
            <h3 className="text-brand-gold font-semibold text-base mb-1">
              Navigasi
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="#"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Dosen
              </Link>
              <Link
                href="#"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Publikasi
              </Link>
              <Link
                href="#"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Arsip Digital
              </Link>
              <Link
                href="#"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
              </Link>
            </nav>
          </div>

          {/* Column 3: Kontak */}
          <div className="flex flex-col gap-3">
            <h3 className="text-brand-gold font-semibold text-base mb-1">
              Kontak
            </h3>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <p>Fakultas Teknik, Universitas Udayana</p>
              <p>Jl. Raya Kampus Unud, Bukit Jimbaran</p>
              <a
                href="mailto:labbudayadigital@unud.ac.id"
                className="hover:text-white transition-colors duration-200"
              >
                labbudayadigital@unud.ac.id
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-brand-navy/95 text-white/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© 2026 Laboratorium Warisan Budaya Digital</p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Kebijakan Privasi
            </Link>
            <span className="text-white/30">·</span>
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Syarat &amp; Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
