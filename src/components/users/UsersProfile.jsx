"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserNavbar } from "@/components/layout/UserNavbar";
import Footer from "@/components/layout/Footer";
import { User, Mail, Phone, Save, CheckCircle2, AlertCircle, Shield } from "lucide-react";

export default function ProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // UI state
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Edit state
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setUser(data.user);
            setUsername(data.user.username || "");
            setEmail(data.user.email || "");
            setPhoneNumber(data.user.phoneNumber || "");
            sessionStorage.setItem("user_session", JSON.stringify(data.user));
          } else {
            router.push("/auth/login");
          }
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        console.error(err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phoneNumber }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
  setUser(data.user);

  sessionStorage.setItem(
    "user_session",
    JSON.stringify(data.user)
  );

  setSuccess("Profil berhasil diperbarui!");
  setIsEditing(false);

  setTimeout(() => {
    setSuccess("");
  }, 4000);
} else {
        setError(data.message || "Gagal memperbarui profil.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto w-full">
            <UserNavbar />
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin w-10 h-10 border-4 border-[#33D6A6] border-t-transparent rounded-full" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto w-full">
          <UserNavbar />
        </div>
      </div>

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-10 sm:py-14">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-lg font-black text-gray-900">
      Informasi Profil
    </h2>

    {!isEditing && (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 bg-[#33D6A6] text-white rounded-xl font-bold text-sm hover:bg-emerald-500 transition"
      >
        Edit Profil
      </button>
    )}
  </div>

  {success && (
    <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium rounded-xl px-4 py-3 mb-5">
      <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
      {success}
    </div>
  )}

  {error && (
    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 text-sm font-medium rounded-xl px-4 py-3 mb-5">
      <AlertCircle size={18} className="text-red-500 shrink-0" />
      {error}
    </div>
  )}

  <form onSubmit={handleSave} className="space-y-5">

    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Username
      </label>

      <div className="relative">
        <User
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          disabled={!isEditing}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition ${
            isEditing
              ? "bg-white border-gray-200 focus:ring-2 focus:ring-[#33D6A6]"
              : "bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed"
          }`}
        />
      </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Email
      </label>

      <div className="relative">
        <Mail
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="email"
          disabled={!isEditing}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition ${
            isEditing
              ? "bg-white border-gray-200 focus:ring-2 focus:ring-[#33D6A6]"
              : "bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed"
          }`}
        />
      </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Nomor Telepon
      </label>

      <div className="relative">
        <Phone
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="tel"
          disabled={!isEditing}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition ${
            isEditing
              ? "bg-white border-gray-200 focus:ring-2 focus:ring-[#33D6A6]"
              : "bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed"
          }`}
        />
      </div>
    </div>

    {isEditing && (
      <div className="flex gap-3 pt-3">

        <button
          type="submit"
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 bg-[#33D6A6] hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition"
        >
          <Save size={16} />
          {saving ? "Menyimpan..." : "Simpan"}
        </button>

        <button
          type="button"
          onClick={() => {
            setUsername(user?.username || "");
            setEmail(user?.email || "");
            setPhoneNumber(user?.phoneNumber || "");
            setError("");
            setSuccess("");
            setIsEditing(false);
          }}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition"
        >
          Batal
        </button>

      </div>
    )}

  </form>
</div>

      </main>

      <Footer />
    </div>
  );
}
