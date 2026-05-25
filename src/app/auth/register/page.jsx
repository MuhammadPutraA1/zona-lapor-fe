import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Register - Pengaduan Masyarakat',
  description: 'Buat akun baru',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <RegisterForm />
    </div>
  );
}