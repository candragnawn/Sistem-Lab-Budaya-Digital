"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Home, ChevronRight, CheckCircle, Download } from "lucide-react";
import Link from "next/link";

interface EmptySubPageProps {
  parentTitle: string;
  parentHref: string;
  title: string;
  description: string;
  section: string;
  icon: React.ReactNode;
}

interface UserData {
  name: string;
  role: string;
  photo: string;
}

export default function EmptySubPage({ parentTitle, parentHref, title, description, section, icon }: EmptySubPageProps) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) setUser(JSON.parse(s));
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <span className="text-brand-navy font-medium">Universitas Udayana</span>
        <span className="mx-2">/</span>
        <span>Laboratorium Warisan Budaya Digital</span>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-brand-gold/40">
              <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-700">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.role}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-brand-navy/8 px-2.5 py-0.5 text-[10px] font-medium text-brand-navy/70">
                  {section}
                </span>
                <span className="inline-flex items-center rounded-full bg-brand-navy/5 px-2.5 py-0.5 text-[10px] font-medium text-brand-navy/60">
                  {title}
                </span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-1.5 border-gray-300 self-start"
          >
            <Download className="h-3 w-3" />
            Unduh CV
          </Button>
        </div>
      </div>

      {/* Breadcrumb nav */}
      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-gray-400" />
        <span className="text-gray-400">Ikhtisar</span>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <Link href={parentHref} className="text-gray-500 hover:text-brand-navy transition-colors">{parentTitle}</Link>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-brand-navy/80 font-medium">{title}</span>
      </div>

      {/* Content card */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-navy/4 to-transparent p-6 border-b border-gray-100">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-brand-navy/40 mb-1">{section}</p>
            <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
            <p className="mt-1.5 text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="text-gray-200">{icon}</div>
          <p className="text-gray-500 font-medium">Belum ada data {title}</p>
          <p className="text-sm text-gray-400">Data untuk kategori ini belum tersedia.</p>
          <Button size="sm" className="mt-2 bg-brand-navy text-white text-xs gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Tambah Data
          </Button>
        </div>
      </div>
    </div>
  );
}
