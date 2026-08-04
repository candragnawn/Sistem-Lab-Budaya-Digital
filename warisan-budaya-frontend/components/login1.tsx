"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

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

const DUMMY_ACCOUNT = {
  email: "ivan@gmail.com",
  password: "123456",
  user: {
    name: "Ivan Ganteng",
    role: "Dosen",
    photo: "/ivan-profile.png",
  },
};

const Login1 = ({
  heading = "Login",
  logo = {
    url: "/",
    src: "/logo-siwada.png",
    alt: "logo",
    title: "SIWADA",
  },
  buttonText = "Login",
  className,
}: Login1Props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.data) {
        // Handle jika dibungkus 'data' atau jika langsung berwujud object
        const userData = response.data.data || response.data;
        
        const userRole = userData.role || "dosen";

        // Simpan data dari UserResource
        localStorage.setItem("user", JSON.stringify({
          id: userData.id || userData.nama, // fallback
          name: userData.nama || userData.name,
          email: userData.email,
          role: userRole,
          photo: userData.avatar_url || userData.avatar_path || "/default-avatar.png",
          avatar_url: userData.avatar_url || userData.avatar_path || null,
          access_token: userData.access_token || userData.token,
          lecturer_id: userData.lecturer_id,
        }));
        
        // Simpan token ke localStorage untuk authorization header
        if (userData.access_token || userData.token) {
          localStorage.setItem("token", userData.access_token || userData.token);
        }
        
        document.documentElement.classList.add("is-logged-in");
        window.dispatchEvent(new Event("auth-change"));

        if (userRole === "admin") {
          router.push("/admin/users");
        } else {
          router.push("/dashboard/profil");
        }
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Email atau password salah.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={cn(
        "flex min-h-[calc(100vh-120px)] w-full items-center justify-center bg-[#eef2f6] p-4 md:p-8",
        className,
      )}
    >
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden flex-col items-center justify-center bg-[#1A4B8F] p-8 text-white md:flex md:p-12">
          <div className="mb-6 flex flex-col items-center">
            <img
              src="/logofmipa.svg"
              alt="Logo FMIPA"
              className="h-35 w-auto object-contain"
            />
          </div>

          <h2 className="mb-4 text-xl font-bold tracking-wide">
            Visi FMIPA UDAYANA
          </h2>
          <p className="mb-8 max-w-sm text-justify text-base font-medium leading-relaxed">
            Terwujudnya FMIPA-UNUD sebagai institusi pengembang IPTEKS melalui
            pendalaman ilmu-ilmu dasar dan terapan, yang unggul, mandiri, dan
            berbudaya mendukung pembangunan yang berkelanjutan dan memiliki daya
            saing global
          </p>

          <h2 className="mb-4 text-xl font-bold tracking-wide">
            Misi FMIPA UDAYANA
          </h2>
          <ol className="list-decimal space-y-1 px-4 text-justify text-sm leading-relaxed max-w-sm">
            <li>
              Mengembangkan Tridharma Perguruan Tinggi di bidang ilmu-ilmu dasar
              berkualitas, unggul serta responsif dan adaptif terhadap kebutuhan
              pembangunan daerah dan nasional
            </li>
            <li>
              Meningkatkan kerjasama penelitian di bidang ilmu-ilmu dasar di
              tingkat nasional dan internasional
            </li>
            <li>
              Menciptakan lulusan yang unggul, mandiri, bermoral, kompetitif di
              tingkat nasional dan internasional serta berwawasan kerakyatan
            </li>
            <li>
              Mengoptimalkan potensi lokal dalam mengembangkan ilmu pengetahuan
              dan teknologi dalam rangka meningkatkan kesejahteraan masyarakat
            </li>
          </ol>
        </div>

        <div className="relative flex min-h-[600px] flex-col items-center justify-center bg-white p-8 md:p-12">
          <div className="mb-8 flex flex-col items-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-20 object-contain"
            />
            <h1 className="mt-4 text-2xl font-bold text-[#1A4B8F]">
              Login SIWADA
            </h1>
            <p className="mt-2 text-xs text-gray-500">
              Silakan masukkan kredensial Anda
            </p>
          </div>

          {error && (
            <div className="mb-4 w-full max-w-sm rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border-[#1A4B8F] px-4 py-5 text-sm text-black focus:border-[#1A4B8F]"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border-[#1A4B8F] px-4 py-5 text-sm text-black focus:border-[#1A4B8F]"
              required
            />

            <div className="mt-1 flex justify-end">
              <a href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Lupa Password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="text-white-600 mt-4 w-full rounded-md bg-[#1A4B8F] py-5 font-semibold shadow-md hover:bg-[#13386b] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      className="opacity-75"
                    />
                  </svg>
                  Memproses...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="absolute bottom-6 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-md border border-blue-100 bg-blue-50/50 px-3 py-2 text-[10px] font-bold tracking-wide text-blue-700">
              Sistem Informasi Warisan Budaya Digital
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login1 };
