"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function BimbinganPage() {
  return (
    <EmptySubPage
      parentTitle="Pelaksanaan Pendidikan"
      parentHref="/dashboard/pelaksanaan-pendidikan"
      title="Bimbingan Mahasiswa"
      description="Data bimbingan akademik dan tugas akhir mahasiswa."
      section="PELAKSANAAN PENDIDIKAN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
