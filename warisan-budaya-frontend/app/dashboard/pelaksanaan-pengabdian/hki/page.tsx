"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function HKIPage() {
  return (
    <EmptySubPage
      parentTitle="Pelaksanaan Pengabdian"
      parentHref="/dashboard/pelaksanaan-pengabdian"
      title="HKI"
      description="Data Hak Kekayaan Intelektual yang dimiliki."
      section="PELAKSANAAN PENGABDIAN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
