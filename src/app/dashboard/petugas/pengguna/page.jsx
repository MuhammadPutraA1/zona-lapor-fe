import UserManagement from "@/components/admin/UserManagement";

export const metadata = {
  title: "Data Pengguna - Petugas Panel",
};

export default function PetugasPenggunaPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <UserManagement roleTarget="user" viewerRole="petugas" />
    </div>
  );
}
