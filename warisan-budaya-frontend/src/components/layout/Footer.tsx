import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer 
      className="text-[#ffffff] relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg-footer.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-[#1b3252]/90 p-[50px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-[30px] mb-[40px]">
          <div>
            <Link href="/" className="flex items-center gap-[10px] mb-[10px] cursor-pointer inline-flex">
              <div className="w-[30px] h-[30px] relative">
                <Image src="/logo-buku-footer.png" alt="Footer Logo" fill className="object-contain" />
              </div>
              <h4 className="m-0 text-lg font-bold hover:text-white transition-colors">SIWADA</h4>
            </Link>
            <p className="text-[12px] text-[#94a3b8]">Sistem Informasi Warisan Budaya</p>
          </div>
          
          <div>
            <h4 className="text-[#ceaa56] text-[14px] mb-[20px] font-medium">Navigasi</h4>
            <ul className="list-none text-[12px] text-[#cbd5e1] leading-[2]">
              <li>
                <Link href="/dosen" className="hover:text-white cursor-pointer transition-colors">Dosen</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">Publikasi</li>
              <li className="hover:text-white cursor-pointer transition-colors">Arsip Digital</li>
              <li className="hover:text-white cursor-pointer transition-colors">Dashboard</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#ceaa56] text-[14px] mb-[20px] font-medium">Kontak</h4>
            <p className="text-[12px] text-[#cbd5e1] leading-[1.8]">
              Fakultas IvanGanteng, Unud<br/>
              JL. Sading kori<br/>
              kadekpasek@gmail.com
            </p>
          </div>
        </div>
        
        <div className="flex justify-between border-t border-white/10 pt-[20px] text-[11px] text-[#94a3b8]">
          <p>© 2026 Sistem Informasi Warisan Budaya</p>
          <div>
            <span className="ml-[15px] hover:text-white cursor-pointer transition-colors">Kebijakan Privasi</span>
            <span className="ml-[15px] hover:text-white cursor-pointer transition-colors">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
