import Link from "next/link"

export default function CTASection() {
  return (
    <section className="px-10 py-14 bg-[#33D6A6] text-white text-center">

      <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">
        Suarakan Keluhan Anda
        <br />
        Dengan Mudah
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-white/80 leading-relaxed">
        Bergabung bersama masyarakat lainnya
        untuk menciptakan lingkungan yang lebih
        baik melalui laporan yang transparan.
      </p>

      <Link href="/auth/login" className="mt-8 px-8 py-3 rounded-2xl bg-white text-[#33D6A6] font-bold hover:scale-105 transition ">
        Mulai Sekarang
      </Link>

    </section>
  )
}