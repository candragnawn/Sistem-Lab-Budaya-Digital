"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditKependudukanModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecturerId: number | string;
  initialData: any;
  identityId?: number;
  familyId?: number;
  onSuccess: () => void;
}

export default function EditKependudukanModal({
  isOpen,
  onClose,
  lecturerId,
  initialData,
  identityId,
  familyId,
  onSuccess,
}: EditKependudukanModalProps) {
  const [formData, setFormData] = useState({
    nik: "",
    npwp: "",
    religion: "",
    citizenship: "",
    marital_status: "",
    spouse_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        nik: initialData.nik !== "-" ? initialData.nik : "",
        npwp: initialData.npwp !== "-" ? initialData.npwp : "",
        religion: initialData.agama !== "-" ? initialData.agama : "",
        citizenship: initialData.kewarganegaraan !== "-" ? initialData.kewarganegaraan : "",
        marital_status: initialData.statusPerkawinan !== "-" ? initialData.statusPerkawinan : "",
        spouse_name: initialData.namaPasangan !== "-" ? initialData.namaPasangan : "",
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
      // 1. Simpan Identitas (nik, npwp, religion, citizenship)
      const identityPayload = {
        lecturer_id: lecturerId,
        nik: formData.nik,
        npwp: formData.npwp,
        religion: formData.religion,
        citizenship: formData.citizenship,
      };

      if (identityId) {
        await api.put(`/identities/${identityId}`, identityPayload);
      } else {
        await api.post(`/identities`, identityPayload);
      }

      // 2. Simpan Keluarga (marital_status, spouse_name)
      const familyPayload = {
        lecturer_id: lecturerId,
        marital_status: formData.marital_status,
        spouse_name: formData.spouse_name,
      };

      if (familyId) {
        await api.put(`/lecturer-families/${familyId}`, familyPayload);
      } else {
        await api.post(`/lecturer-families`, familyPayload);
      }

      toast.success("Data Kependudukan berhasil diperbarui!");
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal memperbarui kependudukan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Kependudukan</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4">
          <form id="edit-kependudukan-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">NIK</label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                placeholder="Masukkan NIK 16 digit"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">NPWP</label>
              <input
                type="text"
                name="npwp"
                value={formData.npwp}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                placeholder="Masukkan NPWP"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Agama</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  <option value="">-- Pilih Agama --</option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Kewarganegaraan</label>
                <select
                  name="citizenship"
                  value={formData.citizenship}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  <option value="">-- Pilih --</option>
                  <option value="WNI">WNI</option>
                  <option value="WNA">WNA</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status Perkawinan</label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
                <option value="">-- Pilih Status --</option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Kawin">Kawin</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </select>
            </div>
            {formData.marital_status === "Kawin" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nama Pasangan</label>
                <input
                  type="text"
                  name="spouse_name"
                  value={formData.spouse_name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  placeholder="Nama suami / istri"
                />
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 border-t p-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" form="edit-kependudukan-form" disabled={isLoading} className="bg-[#DAA520] hover:bg-[#B8860B] text-white border-none shadow-sm">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
