import { Navbar1 } from "@/components/navbar1";
import { Footer } from "@/components/footer";
import { Login1 } from "@/components/login1";

export default function LoginPage() {
  return (
    <>
      <header>
        <Navbar1 />
      </header>
      <main>
        <Login1
          logo={{
            url: "/",
            src: "/SIWADA.svg",
            alt: "logo",
            title: "SIWADA",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
