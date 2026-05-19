"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar1 } from "@/components/navbar1";
import { Footer } from "@/components/footer";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <header>
        <Navbar1 />
      </header>
      <div className="relative min-h-screen bg-[#F0F2F5]">
        <DashboardSidebar />
        <main className="min-h-screen transition-all duration-300 pt-4 pb-8 px-4 lg:pl-[280px]">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
