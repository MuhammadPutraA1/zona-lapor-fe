export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        {/* Brand & Description */}
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-4">
            <span className="text-white">Ruang</span>
            <span className="text-[#33D6A6]">Lapor</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Platform pengaduan masyarakat online yang memudahkan Anda untuk menyampaikan keluhan secara cepat, transparan, dan terpercaya.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Tautan Cepat</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-[#33D6A6] transition">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-[#33D6A6] transition">Cara Lapor</a></li>
            <li><a href="#" className="hover:text-[#33D6A6] transition">Syarat & Ketentuan</a></li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Hubungi Kami</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li>Email: support@ruanglapor.id</li>
            <li>Telepon: 0800-1234-5678</li>
            <li>Alamat: Jl. Sudirman No.1, Jakarta</li>
          </ul>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RuangLapor. Semua hak dilindungi.
      </div>
    </footer>
  )
}