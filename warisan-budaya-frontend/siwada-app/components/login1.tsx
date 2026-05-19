"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Login1Props {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Login1 = ({
  heading = "Login",
  logo = {
    url: "/",
    src: "/SIWADA.svg",
    alt: "logo",
    title: "SIWADA",
  },
  buttonText = "Login",
  className,
}: Login1Props) => {

  const router = useRouter();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const mockUser = {
      name: "Ivan Ganteng",
      role: "Dosen",
      photo: "/SIWADA.svg"
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    router.push("/");
  };

  return (
    <section className={cn("min-h-screen w-full bg-[#eef2f6] flex items-center justify-center p-4 md:p-8", className)}>
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2">

        <div className="hidden flex-col items-center justify-center bg-[#1A4B8F] p-8 md:p-12 text-white md:flex">
          <div className="mb-6 flex flex-col items-center">
            <img
              src="/logofmipa.svg"
              alt="Logo FMIPA"
              className="h-35 w-auto object-contain"
            />
          </div>

          <h2 className="mb-4 text-xl font-bold tracking-wide">Visi FMIPA UDAYANA</h2>
          <p className="mb-8 text-justify text-base leading-relaxed max-w-sm font-medium">
            Terwujudnya FMIPA-UNUD sebagai institusi pengembang IPTEKS melalui pendalaman ilmu-ilmu dasar dan terapan, yang unggul, mandiri,
            dan berbudaya mendukung pembangunan yang berkelanjutan dan memiliki daya saing global
          </p>

          <h2 className="mb-4 text-xl font-bold tracking-wide">Misi FMIPA UDAYANA</h2>
          <ol className="list-decimal space-y-1 px-4 text-sm leading-relaxed max-w-sm text-justify">
            <li>Mengembangkan Tridharma Perguruan Tinggi di bidang ilmu-ilmu dasar berkualitas, unggul serta responsif dan adaptif terhadap kebutuhan pembangunan daerah dan nasional</li>
            <li>Meningkatkan kerjasama penelitian di bidang ilmu-ilmu dasar di tingkat nasional dan internasional</li>
            <li>Menciptakan lulusan yang unggul, mandiri, bermoral, kompetitif di tingkat nasional dan internasional serta berwawasan kerakyatan</li>
            <li>Mengoptimalkan potensi lokal dalam mengembangkan ilmu pengetahuan dan teknologi dalam rangka meningkatkan kesejahteraan masyarakat</li>
          </ol>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-8 md:p-12 relative min-h-[600px]">

          <div className="mb-8 flex flex-col items-center">
            <img src={logo.src} alt={logo.alt} className="h-20 object-contain" />
            <h1 className="mt-4 text-2xl font-bold text-[#1A4B8F]">Login SIWADA</h1>
            <p className="mt-2 text-xs text-gray-500">Silakan masukkan kredensial Anda</p>
          </div>

          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
            <Input
              type="email"
              placeholder="Email"
              className="px-4 py-5 text-sm rounded-md border-[#1A4B8F] focus:border-[#1A4B8F] text-black"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              className="px-4 py-5 text-sm rounded-md border-[#1A4B8F] focus:border-[#1A4B8F] text-black"
              required
            />

            <div className="flex justify-end mt-1">
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Lupa Password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-[#1A4B8F] hover:bg-[#13386b] py-5 text-white-600 font-semibold rounded-md shadow-md mt-4">
              Login
            </Button>
          </form>

          <div className="absolute bottom-6 flex items-center justify-center">
            <div className="px-3 py-2 bg-blue-50/50 border border-blue-100 rounded-md flex items-center justify-center text-[10px] text-blue-700 font-bold tracking-wide">
              Sistem Informasi Warisan Budaya Digital
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export { Login1 };
