"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function PublikasiPage() {
  return (
    <EmptySubPage
      parentTitle="Pelaksanaan Pengabdian"
      parentHref="/dashboard/pelaksanaan-pengabdian"
      title="Publikasi Karya"
      description="Data publikasi karya ilmiah pada jurnal dan prosiding."
      section="PELAKSANAAN PENGABDIAN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
