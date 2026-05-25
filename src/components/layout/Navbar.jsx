import Link from "next/link"; 
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5">

      {/* LOGO */}
      <h1 className="text-3xl font-black tracking-tight">
        <span className="text-[#111827]">
          Ruang
        </span>
        <span className="text-[#33D6A6]">
          Lapor
        </span>
      </h1>

      {/* MENU */}
      <div className="flex items-center gap-3">

        <Button
          asChild 
          variant="outline"
          className="font-semibold rounded-xl border-2 border-grey hover:border-[#33D6A6] hover:bg-[#33D6A6] bg-grey" 
        >
          <Link href="/auth/login">Masuk</Link>
        </Button>

        <Button
          asChild 
          className="bg-[#33D6A6] hover:bg-black text-white font-semibold rounded-xl"
        >
          <Link href="/auth/register">Daftar</Link>
        </Button>

      </div>

    </nav>
  )
}