"use client";
import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <>
        <header>
          <Navbar1 />
        </header>
        <div className="relative min-h-screen bg-[#F0F2F5] flex">
          <aside className="fixed left-0 top-[57px] z-40 hidden h-[calc(100vh-57px)] w-[260px] flex-col border-r border-gray-200 bg-white px-4 py-6 shadow-xl lg:flex animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-7 w-7 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-7 w-7 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-7 w-7 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-7 w-7 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-7 w-7 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </aside>
          <main className="flex-1 min-h-screen transition-all duration-300 pt-4 pb-8 px-4 lg:pl-[280px] animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

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
