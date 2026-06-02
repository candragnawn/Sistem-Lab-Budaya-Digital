import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      
      <div className="w-full bg-white px-6 py-3 border-b shadow-sm">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-brand-navy">Universitas Udayana </span> / Digital Cultural katalog Heritage
          </p>
        </div>
      </div>
      <section className="relative w-full h-[350px] md:h-[450px] bg-[url('/section.svg')] flex flex-col justify-center px-10 bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div> 
        <div className="relative z-10 max-w-5xl mx-auto w-full text-white">
          <div className="w-16 h-1 bg-brand-gold mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Repositori Digital <br /> Arsip Jurnal
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light">
            Platform akademik terpusat untuk arsip jurnal
          </p>
        </div>
      </section>

      <section className="w-full bg-brand-navy py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h2 className="text-4xl font-bold text-brand-gold">1.247</h2>
            <p className="text-white/90 text-sm font-light">Total Arsip Digital</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h2 className="text-4xl font-bold text-brand-gold">67</h2>
            <p className="text-white/90 text-sm font-light">Dosen Aktif</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h2 className="text-4xl font-bold text-brand-gold">67</h2>
            <p className="text-white/90 text-sm font-light">Publikasi Akademik</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h2 className="text-4xl font-bold text-brand-gold">69</h2>
            <p className="text-white/90 text-sm font-light">Bahan ajar</p>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <p className="text-brand-gold font-bold text-xs tracking-[0.2em] uppercase mb-3">Kategori Koleksi</p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">Jelajahi Berdasarkan Jenis Arsip</h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Card className="hover:shadow-lg transition-all duration-300 bg-white rounded-xl border-none shadow-sm cursor-pointer hover:-translate-y-1">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="text-5xl mb-2">
               <img src="pengabdian.png" alt="Icon Buku" className="w-12 h-12 object-contain" />
                </div> 
                  <div>
                <h3 className="font-bold text-black text-lg">Pengabdian</h3>
                <p className="text-gray-500 text-sm mt-1">Pengabdian Author</p>
              </div>
              <p className="text-brand-navy font-bold mt-2"><span className="text-xl">487</span> <span className="text-xs font-normal text-gray-500">arsip</span></p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-white rounded-xl border-none shadow-sm cursor-pointer hover:-translate-y-1">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="text-5xl mb-2">
               <img src="adri.png" alt="Icon Buku" className="w-12 h-12 object-contain" />
                </div> 
                  <div>
                <h3 className="font-bold text-black text-lg">Publikasi Karya</h3>
                <p className="text-gray-500 text-sm mt-1">Jurnal dan Penelitian Akademik</p>
              </div>
              <p className="text-brand-green font-bold mt-2"><span className="text-xl">298</span> <span className="text-xs font-normal text-gray-500">arsip</span></p>
            </CardContent>
          </Card>


          <Card className="hover:shadow-lg transition-all duration-300 bg-white rounded-xl border-none shadow-sm cursor-pointer hover:-translate-y-1">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="text-5xl mb-2">
               <img src="book.png" alt="Icon Buku" className="w-12 h-12 object-contain" />
                </div> 
                  <div>
                <h3 className="font-bold text-brand-navy text-lg">Bahan Ajar</h3>
                <p className="text-gray-500 text-sm mt-1">Bahan ajar akademik</p>
              </div>
              <p className="text-brand-green font-bold mt-2"><span className="text-xl">274</span> <span className="text-xs font-normal text-gray-500">arsip</span></p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-white rounded-xl border-none shadow-sm cursor-pointer hover:-translate-y-1">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="text-5xl mb-2">
               <img src="hki.png" alt="Icon Buku" className="w-12 h-12 object-contain" />
                </div> 
                  <div>
                <h3 className="font-bold text-brand-navy text-lg">HKI</h3>
                <p className="text-gray-500 text-sm mt-1">Hak Paten</p>
              </div>
              <p className="text-brand-green font-bold mt-2"><span className="text-xl">500</span> <span className="text-xs font-normal text-gray-500">arsip</span></p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-white rounded-xl border-none shadow-sm cursor-pointer hover:-translate-y-1">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="text-5xl mb-2">
               <img src="book.png" alt="Icon Buku" className="w-12 h-12 object-contain" />
                </div> 
                  <div>
                <h3 className="font-bold text-brand-navy text-lg">Sapta</h3>
                <p className="text-gray-500 text-sm mt-1">Bahan ajar akademik</p>
              </div>
              <p className="text-brand-green font-bold mt-2"><span className="text-xl">274</span> <span className="text-xs font-normal text-gray-500">arsip</span></p>
            </CardContent>
          </Card>

        </div>
      </section>

    </div>
  )
}
