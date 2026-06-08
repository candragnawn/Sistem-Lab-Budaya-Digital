"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function PengembanganPage() {
  return (
    <EmptySubPage
      parentTitle="Pelaksanaan Pendidikan"
      parentHref="/dashboard/pelaksanaan-pendidikan"
      title="Pengembangan Mahasiswa"
      description="Data kegiatan pengembangan dan pembinaan mahasiswa."
      section="PELAKSANAAN PENDIDIKAN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
