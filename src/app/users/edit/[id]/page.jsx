import { UserNavbar } from "@/components/layout/UserNavbar";
import { EditReportSection } from "@/components/users/EditReportSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: 'Edit Laporan - Zona Lapor',
  description: 'Ubah detail laporan Anda yang masih berstatus pending.',
};

export default async function EditReportPage({ params }) {
  const resolvedParams = await params;
  const reportId = resolvedParams.id;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <div className="bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <UserNavbar />
        </div>
      </div>

      <div className="flex-1 bg-white">
        <EditReportSection reportId={reportId} />
      </div>

      <Footer />
    </div>
  );
}
