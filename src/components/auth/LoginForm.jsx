"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || result.message || 'Gagal login, periksa kembali email dan password Anda.');
      }

      if (result.success) {
        setSuccess(true);
        // Cookie sudah otomatis di-set oleh backend (httpOnly cookie)
        // Ambil data user untuk cek role, lalu redirect sesuai role
        try {
          const meRes = await fetch('/api/auth/me', { credentials: 'include' });
          const meData = await meRes.json();
          const role = meData?.user?.role;
          
          if (meData?.success && meData?.user) {
            sessionStorage.setItem('user_session', JSON.stringify(meData.user));
          }

          setTimeout(() => {
            if (role === 'admin' || role === 'petugas') {
              router.push('/dashboard');
            } else {
              router.push('/users');
            }
          }, 1000);
        } catch {
          // Fallback ke /users jika gagal fetch role
          setTimeout(() => {
            router.push('/users');
          }, 1000);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black">Masuk</h2>
        <p className="text-gray-500 text-sm mt-2">
          Silakan masuk untuk mulai menggunakan layanan kami.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-700">Login berhasil! Mengarahkan ke dashboard...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" id="email" name="email" type="email" placeholder="masukkan email..." required />
        <Input label="Password" id="password" name="password" type="password" placeholder="contoh: saya123" required />

        <div className="pt-2">
          <Button type="submit" className="w-full bg-[#33D6A6]" disabled={loading || success}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
              </span>
            ) : (
              'Masuk'
            )}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link href="/auth/register" className="text-[#33D6A6] hover:text-black hover:underline font-semibold transition">
          Daftar sekarang
        </Link>
      </div>
    </div>
  );
}