"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function DetaseringPage() {
  return (
    <EmptySubPage
      parentTitle="Pelaksanaan Pendidikan"
      parentHref="/dashboard/pelaksanaan-pendidikan"
      title="Detasering"
      description="Data kegiatan detasering ke instansi lain."
      section="PELAKSANAAN PENDIDIKAN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
