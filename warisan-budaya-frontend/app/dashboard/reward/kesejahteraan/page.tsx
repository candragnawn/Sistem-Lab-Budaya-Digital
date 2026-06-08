"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function KesejahteraanPage() {
  return (
    <EmptySubPage
      parentTitle="Reward"
      parentHref="/dashboard/reward"
      title="Kesejahteraan"
      description="Data tunjangan dan fasilitas kesejahteraan."
      section="REWARD"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
