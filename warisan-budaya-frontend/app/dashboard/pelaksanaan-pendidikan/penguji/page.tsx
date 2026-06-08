"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function PengujiPage() {
  return (
    <EmptySubPage
      parentTitle="Pelaksanaan Pendidikan"
      parentHref="/dashboard/pelaksanaan-pendidikan"
      title="Penguji"
      description="Data kegiatan sebagai penguji ujian mahasiswa."
      section="PELAKSANAAN PENDIDIKAN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
