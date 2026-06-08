"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function KegiatanLainPage() {
  return (
    <EmptySubPage
      parentTitle="Penunjang"
      parentHref="/dashboard/penunjang"
      title="Kegiatan Penunjang Lain"
      description="Data kegiatan penunjang lainnya."
      section="PENUNJANG"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
