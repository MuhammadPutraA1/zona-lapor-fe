import {
  ShieldCheck,
  MapPinned,
  BellRing,
} from "lucide-react"

export default function AboutSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-10 py-14 bg-white">

      {/* LEFT */}
      <div>

        <p className="text-[#33D6A6] font-bold uppercase tracking-widest text-sm">
          Tentang Platform
        </p>

        <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight">
          Ruang Digital
          <br />
          Untuk Aspirasi
          <br />
          Masyarakat
        </h2>

        <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
          ZonaLapor membantu masyarakat
          menyampaikan laporan, keluhan,
          dan aspirasi secara online dengan
          proses yang transparan dan mudah dipantau.
        </p>

      </div>

      {/* RIGHT */}
      <div className="space-y-5">

        {/* ITEM */}
        <div className="flex gap-4 p-5 rounded-2xl bg-[#F4FBF6]">

          <div className="w-14 h-14 rounded-xl bg-[#DDF8EC] flex items-center justify-center">

            <ShieldCheck
              size={26}
              className="text-[#33D6A6]"
            />

          </div>

          <div>

            <h3 className="font-bold text-lg">
              Aman & Transparan
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Semua laporan tersimpan aman
              dan dapat dipantau statusnya.
            </p>

          </div>

        </div>

        {/* ITEM */}
        <div className="flex gap-4 p-5 rounded-2xl bg-[#F4FBF6]">

          <div className="w-14 h-14 rounded-xl bg-[#DDF8EC] flex items-center justify-center">

            <MapPinned
              size={26}
              className="text-[#33D6A6]"
            />

          </div>

          <div>

            <h3 className="font-bold text-lg">
              Lokasi Laporan
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Tandai lokasi kejadian agar
              laporan lebih akurat.
            </p>

          </div>

        </div>

        {/* ITEM */}
        <div className="flex gap-4 p-5 rounded-2xl bg-[#F4FBF6]">

          <div className="w-14 h-14 rounded-xl bg-[#DDF8EC] flex items-center justify-center">

            <BellRing
              size={26}
              className="text-[#33D6A6]"
            />

          </div>

          <div>

            <h3 className="font-bold text-lg">
              Notifikasi Real-time
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Dapatkan update proses
              laporan secara langsung.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}