"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditProfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecturerId: number | string;
  initialData: any;
  onSuccess: () => void;
}

export default function EditProfilModal({
  isOpen,
  onClose,
  lecturerId,
  initialData,
  onSuccess,
}: EditProfilModalProps) {
  const [formData, setFormData] = useState({
    nidn: "",
    name: "",
    gender: "",
    birth_place: "",
    birth_date: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        nidn: initialData.nidn !== "-" ? initialData.nidn : "",
        name: initialData.nama !== "-" ? initialData.nama : "",
        gender: initialData.jenisKelamin === "Laki-laki" ? "Laki-laki" : (initialData.jenisKelamin === "Perempuan" ? "Perempuan" : ""),
        birth_place: initialData.tempatLahir !== "-" ? initialData.tempatLahir : "",
        birth_date: initialData.tanggalLahir !== "-" ? initialData.tanggalLahir : "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put(`/lecturers/${lecturerId}`, formData);
      toast.success("Profil berhasil diperbarui!");
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal memperbarui profil.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Profil Dasar</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4">
          <form id="edit-profil-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">NIDN</label>
              <input
                type="text"
                name="nidn"
                value={formData.nidn}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                placeholder="Masukkan NIDN"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                placeholder="Masukkan nama dengan gelar"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Jenis Kelamin</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
                <option value="">-- Pilih Jenis Kelamin --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tempat Lahir</label>
              <input
                type="text"
                name="birth_place"
                value={formData.birth_place}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                placeholder="Contoh: Denpasar"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tanggal Lahir (YYYY-MM-DD)</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 border-t p-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" form="edit-profil-form" disabled={isLoading} className="bg-[#DAA520] hover:bg-[#B8860B] text-white border-none shadow-sm">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
