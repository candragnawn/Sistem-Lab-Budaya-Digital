'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import api from '@/lib/axios';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Sedang memverifikasi email Anda...');

  useEffect(() => {
    const id = searchParams.get('id');
    const hash = searchParams.get('hash');
    const signature = searchParams.get('signature');
    const expires = searchParams.get('expires');

    if (!id || !hash) {
      setStatus('error');
      setMessage('Link verifikasi tidak valid.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await api.get(`/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`);
        if (response.data.status === 'success') {
          setStatus('success');
          setMessage('Anda Berhasil Terdaftar, Silakan Login');
        } else {
          setStatus('error');
          setMessage(response.data.message || 'Gagal memverifikasi email.');
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Link verifikasi tidak valid atau sudah kadaluarsa.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <Card className="w-full max-w-md shadow-lg border-0 bg-white">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          {status === 'loading' && <Loader2 className="h-16 w-16 text-[#1A4B8F] animate-spin" />}
          {status === 'success' && <CheckCircle2 className="h-16 w-16 text-green-600" />}
          {status === 'error' && <XCircle className="h-16 w-16 text-red-600" />}
        </div>
        <CardTitle className="text-2xl font-bold text-[#1A4B8F]">
          {status === 'loading' ? 'Memverifikasi...' : status === 'success' ? 'Berhasil' : 'Verifikasi Gagal'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-center pt-4">
        <p className="text-gray-600 text-lg">{message}</p>
      </CardContent>
      
      {status !== 'loading' && (
        <CardFooter className="flex justify-center pt-4">
          <Button 
            className="w-full py-6 text-lg font-semibold rounded-md shadow-md transition-all bg-[#1A4B8F] text-white hover:bg-[#13386b]"
            onClick={() => router.push('/login')}
          >
            Menuju Halaman Login
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="relative z-10 w-full flex justify-center">
        <Suspense fallback={
          <Card className="w-full max-w-md shadow-lg border-0 bg-white p-12 flex justify-center items-center">
            <Loader2 className="h-12 w-12 text-[#1A4B8F] animate-spin" />
          </Card>
        }>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}

