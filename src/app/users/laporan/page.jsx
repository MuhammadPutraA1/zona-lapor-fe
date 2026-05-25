// src/app/page.js

import Image from "next/image"
import {
  PencilLine,
  Search,
  Users,
} from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#EAF7EA] p-6">
      <section className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-md overflow-hidden">

        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-12 py-8">
          <h1 className="text-4xl font-extrabold text-[#33D6A6]">
            lavor
          </h1>

          <div className="flex items-center gap-10 text-lg font-semibold">
            <button className="hover:text-[#33D6A6] transition">
              Masuk
            </button>

            <button className="text-[#33D6A6] hover:opacity-80 transition">
              Daftar
            </button>
          </div>
        </nav>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center px-12 py-10 gap-10">

          {/* LEFT */}
          <div>
            <h1 className="text-6xl leading-tight font-extrabold text-[#111827]">
              Selamat Datang di Forum
              <br />

              <span className="text-[#33D6A6]">
                Pengaduan
              </span>{" "}
              Masyarakat
              <br />
              Online
            </h1>

            <p className="mt-8 text-2xl text-gray-600 leading-relaxed">
              Anda bisa meaporkan semua keluhan anda
              di forum ini.
            </p>

            <button className="mt-10 px-10 py-4 rounded-2xl bg-[#33D6A6] text-white text-xl font-bold shadow-lg hover:scale-105 transition">
              Mulai
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">
            <Image
              src="/illustrations/landing.svg"
              alt="landing"
              width={550}
              height={550}
              className="object-contain"
            />
          </div>
        </div>

        {/* FEATURES */}
        <div className="bg-[#F4FBF6] border-t border-gray-100 grid grid-cols-1 md:grid-cols-3">

          {/* ITEM */}
          <div className="flex gap-5 p-10 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="w-20 h-20 rounded-2xl bg-[#DDF8EC] flex items-center justify-center">
              <PencilLine
                size={38}
                className="text-[#33D6A6]"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                Laporkan Keluhan
              </h3>

              <p className="text-gray-500 mt-3 text-lg">
                Sampaikan keluhan Anda dengan
                mudah dan cepat.
              </p>
            </div>
          </div>

          {/* ITEM */}
          <div className="flex gap-5 p-10 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="w-20 h-20 rounded-2xl bg-[#DDF8EC] flex items-center justify-center">
              <Search
                size={38}
                className="text-[#33D6A6]"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                Pantau Proses
              </h3>

              <p className="text-gray-500 mt-3 text-lg">
                Lihat perkembangan laporan Anda
                secara transparan.
              </p>
            </div>
          </div>

          {/* ITEM */}
          <div className="flex gap-5 p-10">
            <div className="w-20 h-20 rounded-2xl bg-[#DDF8EC] flex items-center justify-center">
              <Users
                size={38}
                className="text-[#33D6A6]"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                Untuk Semua
              </h3>

              <p className="text-gray-500 mt-3 text-lg">
                Platform terbuka untuk seluruh
                masyarakat.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="text-center py-8 text-gray-500 text-lg">
          © 2026 Lavor. Semua hak dilindungi.
        </footer>

      </section>
    </main>
  )
}