'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/axios';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/forgot-password', { email });
      setIsSuccess(true);
    } catch (err: any) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.email?.[0]
        || 'Terjadi kesalahan. Silakan coba lagi.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {/* Card Utama */}
      <div className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Panel Kiri — Form (Putih) */}
        <div className="flex-1 bg-white p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img src="/logo-siwada.png" alt="logo" className="h-16 object-contain" />
            <h1 className="mt-3 text-2xl font-bold text-[#1A4B8F]">Lupa Password?</h1>
            <p className="mt-1 text-xs text-gray-500 text-center">
              Masukkan email Anda untuk menerima link reset password
            </p>
          </div>

          {/* State: Sukses */}
          {isSuccess ? (
            <div className="text-center">
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-6 py-5">
                <svg className="mx-auto mb-3 h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-semibold text-green-800">Email berhasil dikirim!</p>
                <p className="mt-1 text-xs text-green-700">
                  Silakan cek kotak masuk (atau folder Spam) email{' '}
                  <span className="font-medium">{email}</span> dan klik link yang kami kirimkan.
                </p>
              </div>
              <button
                onClick={() => router.push('/login')}
                className="mt-2 w-full rounded-md bg-[#1A4B8F] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#13386b] transition-colors"
              >
                Kembali ke Login
              </button>
            </div>
          ) : (
            /* State: Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              <input
                type="email"
                placeholder="Email terdaftar Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-[#1A4B8F] px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A4B8F]/30"
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-[#1A4B8F] py-3 font-semibold text-white shadow-md hover:bg-[#13386b] disabled:opacity-70 transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                    </svg>
                    Mengirim...
                  </div>
                ) : (
                  'Kirim Link Reset Password'
                )}
              </button>

              <div className="text-center pt-1">
                <button type="button" onClick={() => router.push('/login')} className="text-xs text-blue-600 hover:underline">
                  ← Kembali ke Login
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Panel Kanan — Info (Biru) */}
        <div className="flex-1 bg-[#1A4B8F] p-10 flex flex-col items-center justify-center text-white text-center">
          <img src="/logo-siwada.png" alt="SIWADA" className="h-16 mb-6 opacity-90" />
          <h2 className="text-2xl font-bold mb-3">Belum Punya Akun?</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            Hubungi administrator untuk mendaftarkan akun dosen Anda ke dalam Sistem Informasi Warisan Budaya Digital UNUD.
          </p>
          <div className="text-[10px] text-blue-300 mt-auto pt-6">
            Sistem Informasi Warisan Budaya Digital<br />Universitas Udayana
          </div>
        </div>

      </div>
    </div>
  );
}

