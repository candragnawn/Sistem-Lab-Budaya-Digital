"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Kelola Pengguna",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function AdminSidebar({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }: AdminSidebarProps = {}) {
  const pathname = usePathname();
  const [internalIsOpen, setInternalIsOpen] = useState(true);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledSetIsOpen !== undefined ? controlledSetIsOpen : setInternalIsOpen;
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Toggle Button — hanya tampil saat sidebar TUTUP */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-[57px] left-0 z-50 flex h-10 w-10 items-center justify-center rounded-r-lg bg-brand-navy text-white shadow-lg transition-all duration-300 hover:bg-brand-navy/90"
          aria-label="Buka sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>
      )}

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
        <div className="border-b border-gray-100 bg-brand-navy px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-white/20">
                <Users className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Admin Panel
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20 hover:text-white transition-colors"
              aria-label="Tutup sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                    isActive(item.href)
                      ? "bg-brand-navy text-white shadow-sm"
                      : "text-gray-600 hover:bg-slate-100 hover:text-brand-navy",
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md transition-colors",
                      isActive(item.href)
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-400 group-hover:bg-slate-200 group-hover:text-brand-navy",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
