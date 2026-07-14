"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== "admin") {
        router.push("/dashboard"); // Redirect dosen ke dashboard dosen
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="relative min-h-[calc(100vh-57px)] bg-[#F0F2F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-57px)] bg-[#F0F2F5]">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={cn("min-h-screen transition-all duration-300 pt-4 pb-8 px-4", isSidebarOpen ? "lg:pl-[280px]" : "lg:pl-4")}>
        {children}
      </main>
    </div>
  );
}
