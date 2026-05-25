import { LoginForm } from '@/components/auth/LoginForm';

// Meta tag khusus untuk halaman ini (Opsional tapi best practice)
export const metadata = {
  title: 'Login - Pengaduan Masyarakat',
  description: 'Masuk ke akun Anda',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <LoginForm />
    </div>
  );
}