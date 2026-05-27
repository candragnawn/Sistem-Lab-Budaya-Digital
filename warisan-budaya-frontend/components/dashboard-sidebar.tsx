"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  HandHeart,
  Puzzle,
  Trophy,
  FileText,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  children?: { title: string; href: string; badge?: string }[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Profil",
    href: "/dashboard/profil",
    icon: <User className="h-4 w-4" />,
    badge: "3.0",
    children: [
      { title: "Data Pribadi", href: "/dashboard/profil" },
      { title: "Inpassing", href: "/dashboard/profil/inpassing", badge: "SISTER" },
      { title: "Jabatan Fungsional", href: "/dashboard/profil/jabatan", badge: "DATA" },
      { title: "Kepangkatan", href: "/dashboard/profil/kepangkatan", badge: "SISTER" },
      { title: "Penempatan", href: "/dashboard/profil/penempatan", badge: "SISTER" },
      { title: "Pejabat Struktural", href: "/dashboard/profil/pejabat", badge: "SISTER" },
    ],
  },
  {
    title: "Kualifikasi",
    href: "/dashboard/kualifikasi",
    icon: <GraduationCap className="h-4 w-4" />,
    badge: "3.0",
    children: [
      { title: "Pendidikan Formal", href: "/dashboard/kualifikasi/pendidikan-formal" },
      { title: "Diklat", href: "/dashboard/kualifikasi/diklat" },
      { title: "Riwayat Pekerjaan", href: "/dashboard/kualifikasi/riwayat-pekerjaan" },
    ],
  },
  {
    title: "Kompetensi",
    href: "/dashboard/kompetensi",
    icon: <Award className="h-4 w-4" />,
  },
  {
    title: "Pelaksanaan Pendidikan",
    href: "/dashboard/pelaksanaan-pendidikan",
    icon: <BookOpen className="h-4 w-4" />,
    badge: "0.0",
  },
  {
    title: "Pelaksanaan Pengabdian",
    href: "/dashboard/pelaksanaan-pengabdian",
    icon: <HandHeart className="h-4 w-4" />,
  },
  {
    title: "Penunjang",
    href: "/dashboard/penunjang",
    icon: <Puzzle className="h-4 w-4" />,
  },
  {
    title: "Reward",
    href: "/dashboard/reward",
    icon: <Trophy className="h-4 w-4" />,
    badge: "0.0",
  },
  {
    title: "Data Dokumen",
    href: "/dashboard/data-dokumen",
    icon: <FileText className="h-4 w-4" />,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Profil"]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-expand parent items when navigating to a child route
  useEffect(() => {
    sidebarItems.forEach((item) => {
      if (item.children && item.children.some((child) => pathname.startsWith(child.href))) {
        setExpandedItems((prev) =>
          prev.includes(item.title) ? prev : [...prev, item.title]
        );
      }
    });
  }, [pathname]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: SidebarItem) =>
    pathname.startsWith(item.href) ||
    item.children?.some((child) => pathname === child.href);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-[65px] z-50 flex h-10 w-10 items-center justify-center rounded-r-lg bg-[#1E3A5F] text-white shadow-lg transition-all duration-300 hover:bg-[#2a4f7a] lg:top-[65px]",
          isOpen ? "left-[259px]" : "left-0",
        )}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-[57px] z-40 flex h-[calc(100vh-57px)] w-[260px] flex-col border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="border-b border-gray-100 bg-gradient-to-r from-[#1E3A5F] to-[#2a5a8f] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-yellow-400/20">
              <Menu className="h-3.5 w-3.5 text-yellow-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Menu Navigasi
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isParentActive(item)
                          ? "bg-[#1E3A5F] text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#1E3A5F]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                          isParentActive(item)
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-500 group-hover:bg-[#1E3A5F]/10 group-hover:text-[#1E3A5F]",
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold",
                            isParentActive(item)
                              ? "bg-yellow-400 text-[#1E3A5F]"
                              : "bg-gray-200 text-gray-600",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {expandedItems.includes(item.title) ? (
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            isParentActive(item)
                              ? "text-white/70"
                              : "text-gray-400",
                          )}
                        />
                      ) : (
                        <ChevronRight
                          className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            isParentActive(item)
                              ? "text-white/70"
                              : "text-gray-400",
                          )}
                        />
                      )}
                    </button>

                    {/* Children */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        expandedItems.includes(item.title)
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      <ul className="ml-5 mt-1 space-y-0.5 border-l-2 border-gray-200 pl-4">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <Link
                              href={child.href}
                              className={cn(
                                "flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-all duration-200",
                                isActive(child.href)
                                  ? "bg-[#E8F0FE] text-[#1E3A5F] font-semibold"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
                              )}
                              onClick={() => isMobile && setIsOpen(false)}
                            >
                              <span>{child.title}</span>
                              {child.badge && (
                                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-600">
                                  {child.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "bg-[#1E3A5F] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#1E3A5F]",
                    )}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                        isActive(item.href)
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-[#1E3A5F]/10 group-hover:text-[#1E3A5F]",
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold",
                          isActive(item.href)
                            ? "bg-yellow-400 text-[#1E3A5F]"
                            : "bg-gray-200 text-gray-600",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 px-4 py-3">
          <p className="text-center text-[10px] text-gray-400">
            © 2026 SIWADA v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
