"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KompetensiPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/kompetensi/sertifikasi");
  }, [router]);
  return null;
}
