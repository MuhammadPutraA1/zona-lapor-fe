"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const name = e.target.username.value;
    const phoneNumber = e.target.notelp.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name, phoneNumber }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || result.message || 'Gagal mendaftar, silakan coba lagi.');
      }

      if (result.success) {
        setSuccess(true);
        // Otomatis pindah ke login setelah 2 detik
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative">
      <Link href="/" className="absolute top-6 left-6 p-2 -ml-2 -mt-2 text-gray-400 hover:bg-gray-50 hover:text-[#33D6A6] rounded-full transition-all" title="Kembali ke Beranda">
        <ArrowLeft size={20} />
      </Link>
      
      <div className="text-center mb-8 mt-2">
        <h2 className="text-2xl font-bold text-gray-900">Buat Akun</h2>
        <p className="text-gray-500 text-sm mt-2">
          Daftarkan diri Anda untuk menggunakan layanan pengaduan.
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
          <p className="text-sm text-emerald-700">Pendaftaran berhasil! Mengarahkan ke halaman login...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Username" id="username" name="username" type="text" maxLength={16} placeholder="Contoh: budiyanto123" required />
        <Input label="No Telepon" id="notelp" name="notelp" type="text" placeholder="Contoh: 0858.." required />
        <Input label="Email" id="email" name="email" type="email" placeholder="contoh: contoh@email.com" required />
        <Input label="Password" id="password" name="password" type="password" placeholder="Minimal 6 karakter" required />

        <div className="pt-4">
          <Button type="submit" className="w-full bg-[#33D6A6]" disabled={loading || success}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
              </span>
            ) : (
              'Daftar Akun'
            )}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-[#33D6A6] hover:text-black hover:underline font-semibold transition">
          Masuk di sini
        </Link>
      </div>
    </div>
  );
}