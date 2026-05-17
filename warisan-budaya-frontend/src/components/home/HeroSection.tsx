export function HeroSection() {
  return (
    <section
      className="relative text-[#ffffff] px-[50px] py-[80px] overflow-hidden"
      style={{
        backgroundImage: "url('/bg-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#1b3252]/70 z-10"></div>

      <div className="relative z-20 max-w-[600px]">
        <div className="w-[50px] h-[3px] bg-[#ceaa56] mb-[20px]"></div>

        <h2 className="text-[36px] font-serif mb-[15px] leading-[1.2]">
          Repositori Digital Warisan<br />Budaya Bali
        </h2>
        <p className="text-[14px] text-[#cbd5e1]">
          Platform akademik terpusat untuk arsip jurnal
        </p>
      </div>
    </section>
  );
}
