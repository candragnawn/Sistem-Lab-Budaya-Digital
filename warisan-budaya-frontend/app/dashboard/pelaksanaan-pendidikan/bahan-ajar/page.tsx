"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function BahanAjarPage() {
  return (
    <EmptySubPage
      parentTitle="Pelaksanaan Pendidikan"
      parentHref="/dashboard/pelaksanaan-pendidikan"
      title="Bahan Ajar"
      description="Data bahan ajar dan materi pembelajaran yang telah dibuat."
      section="PELAKSANAAN PENDIDIKAN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
