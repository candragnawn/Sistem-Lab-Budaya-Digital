"use client";

import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";
import CanvaTemplate, { CVDynamicData } from "@/components/cv-templates/CanvaTemplate";

export default function CvGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [cvData, setCvData] = useState<CVDynamicData | null>(null);
  
  const printRef = useRef<HTMLDivElement>(null);

  // Hook untuk mencetak PDF
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: cvData ? `CV_${cvData.profile.name.replace(/\s+/g, '_')}` : 'CV_Dosen',
    onAfterPrint: () => {
      toast.success("PDF berhasil dibuat!");
      setIsLoading(false);
    },
  });

  // Jika cvData berubah (baru digenerate), otomatis trigger print
  useEffect(() => {
    if (cvData && printRef.current && !isLoading) {
      
      setTimeout(() => {
        handlePrint();
      }, 500);
    }
  }, [cvData, handlePrint, isLoading]);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      toast.info("AI sedang merangkum profil Anda...", { duration: 4000 });

      const response = await api.post("/cv/generate");
      
      if (response.data.success) {
        setCvData(response.data.data);
        setIsLoading(false); 
      } else {
        toast.error(response.data.message || "Gagal meng-generate CV");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat memanggil AI.");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-gray-600 text-2xl font-bold tracking-tight">AI CV Generator</h1>
          <p className="text-gray-500 text-sm mt-1">
            Satu klik untuk merangkum seluruh pengalaman Anda menjadi CV profesional.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          
          <h2 className="text-xl text-gray-600 font-semibold mb-2">Siap Mencetak CV Anda?</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Sistem akan otomatis mengambil data Profil, Pendidikan, Publikasi, dan Pengalaman Anda, lalu 
            menggunakan AI untuk menuliskan narasi profesional secara cerdas.
          </p>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading}
            className="bg-brand-navy text-white hover:bg-brand-navy/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sedang Memproses CV Anda...
              </>
            ) : (
              <>
                <FileText className="text-white" />
                Generate CV with AI
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="hidden">
        {cvData && (
          <CanvaTemplate ref={printRef} data={cvData} />
        )}
      </div>
    </div>
  );
}
