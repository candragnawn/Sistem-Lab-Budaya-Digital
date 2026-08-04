'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (!tokenParam || !emailParam) {
      setError('Link reset password tidak valid. Silakan minta link baru.');
      return;
    }

    setToken(tokenParam);
    setEmail(emailParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== passwordConfirmation) {
      setError('Konfirmasi password tidak cocok.');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/reset-password', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setIsSuccess(true);

      // Redirect ke /login frontend setelah 2 detik
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.password?.[0] ||
        'Link tidak valid atau sudah kadaluarsa. Silakan minta link baru.';
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
          <div className="flex flex-col items-center mb-6">
            <img src="/logo-siwada.png" alt="logo" className="h-16 object-contain" />
            <h1 className="mt-3 text-2xl font-bold text-[#1A4B8F]">Password Baru</h1>
            <p className="mt-1 text-xs text-gray-500 text-center">
              Masukkan password baru untuk akun Anda
            </p>
          </div>

          {/* State: Sukses */}
          {isSuccess ? (
            <div className="text-center">
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-6 py-5">
                <svg className="mx-auto mb-3 h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-semibold text-green-800">Password berhasil diubah!</p>
                <p className="mt-1 text-xs text-green-700">
                  Anda akan dialihkan ke halaman Login dalam beberapa detik...
                </p>
              </div>
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

              {/* Email readonly */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Password Baru */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Password Baru</label>
                <input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-[#1A4B8F] px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A4B8F]/30"
                  required
                  minLength={8}
                />
              </div>

              {/* Konfirmasi */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  placeholder="Ulangi password baru"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full rounded-md border border-[#1A4B8F] px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A4B8F]/30"
                  required
                  minLength={8}
                />
              </div>

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
                    Menyimpan...
                  </div>
                ) : (
                  'Simpan Password Baru'
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
          <h2 className="text-2xl font-bold mb-3">Atur Ulang Password</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            Buat password baru yang kuat dan mudah Anda ingat. Password minimal 8 karakter untuk keamanan akun SIWADA Anda.
          </p>
          <div className="text-[10px] text-blue-300 mt-auto pt-6">
            Sistem Informasi Warisan Budaya Digital<br />Universitas Udayana
          </div>
        </div>

      </div>
    </div>
  );
}


export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3">
            <svg className="h-8 w-8 animate-spin text-[#1A4B8F]" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
            </svg>
            <p className="text-sm text-gray-500">Memuat halaman...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
