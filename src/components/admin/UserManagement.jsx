"use client";

import { useState, useEffect } from "react";
import { 
  Search, Edit2, Trash2, ShieldAlert, CheckCircle2, 
  XCircle, UserCircle2, ShieldCheck, Mail, Phone,
  RefreshCcw, UserX, Loader2, Plus, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

export default function UserManagement({ roleTarget = "user", viewerRole = "admin" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "", phoneNumber: "", role: "" });
  const [isSaving, setIsSaving] = useState(false);

  // Add Petugas Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({ username: "", email: "", phoneNumber: "", password: "" });
  const [isAdding, setIsAdding] = useState(false);

  // Delete/Deactivate Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Restore Modal State
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [userToRestore, setUserToRestore] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?role=${roleTarget}&page=${page}&limit=10&search=${search}`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
        setTotalPages(data.meta.totalPages);
      }
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [roleTarget, page, search]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      role: user.role || roleTarget
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...data.data } : u));
        setIsEditModalOpen(false);
        setEditingUser(null);
        toast.success("Perubahan berhasil disimpan!");
      } else {
        toast.error(data.message || "Gagal menyimpan perubahan.");
      }
    } catch (error) {
      console.error("Gagal update:", error);
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPetugas = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const res = await fetch(`/api/users/petugas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh data to show new petugas
        fetchUsers();
        setIsAddModalOpen(false);
        setAddForm({ username: "", email: "", phoneNumber: "", password: "" });
        toast.success("Petugas berhasil ditambahkan!");
      } else {
        toast.error(data.message || "Gagal menambahkan petugas.");
      }
    } catch (error) {
      console.error("Gagal tambah petugas:", error);
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/users/${userToDelete.id}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u.id === userToDelete.id ? { ...u, isActive: false } : u));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        toast.success("Pengguna berhasil dinonaktifkan!");
      } else {
        toast.error(data.message || "Gagal menonaktifkan pengguna.");
      }
    } catch (error) {
      console.error("Gagal delete:", error);
      toast.error("Terjadi kesalahan sistem saat menonaktifkan.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRestoreClick = (user) => {
    setUserToRestore(user);
    setIsRestoreModalOpen(true);
  };

  const handleRestoreConfirm = async () => {
    if (!userToRestore) return;
    setIsRestoring(true);
    try {
      const res = await fetch(`/api/users/${userToRestore.id}/restore`, {
        method: "PATCH",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u.id === userToRestore.id ? { ...u, isActive: true } : u));
        setIsRestoreModalOpen(false);
        setUserToRestore(null);
        toast.success("Pengguna berhasil diaktifkan kembali!");
      } else {
        toast.error(data.message || "Gagal mengaktifkan kembali.");
      }
    } catch (error) {
      console.error("Gagal restore:", error);
      toast.error("Terjadi kesalahan sistem saat mengaktifkan kembali.");
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Search */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 capitalize">
            Kelola Data {roleTarget === 'user' ? 'Masyarakat' : 'Petugas'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Lihat, edit, dan kelola akun {roleTarget} yang terdaftar di sistem.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex items-center gap-3">
          <div className="relative flex-1 md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#33D6A6] transition-all"
            />
          </div>

          {viewerRole === 'admin' && roleTarget === 'petugas' && (
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#33D6A6] hover:bg-[#2bc295] text-white rounded-xl shadow-sm flex items-center gap-2"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Tambah Petugas</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Bergabung</th>
                {viewerRole === 'admin' && <th className="px-6 py-4 text-center">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center">
                    <Loader2 size={24} className="animate-spin text-[#33D6A6] mx-auto mb-2" />
                    <p className="text-gray-400 font-medium">Memuat data...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center">
                    <UserX size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 font-medium">Tidak ada data ditemukan.</p>
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold uppercase shrink-0">
                          {user.username ? user.username[0] : '?'}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{user.username}</p>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mt-1 inline-block ${
                            user.role === 'admin' ? 'bg-amber-100 text-amber-700' :
                            user.role === 'petugas' ? 'bg-sky-100 text-sky-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={14} className="text-gray-400 shrink-0" />
                        <span>{user.phoneNumber || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <CheckCircle2 size={12} /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                          <XCircle size={12} /> Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    
                    {viewerRole === 'admin' && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button 
                            onClick={() => handleEditClick(user)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          
                          {user.isActive ? (
                            <button 
                              onClick={() => handleDeleteClick(user)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Nonaktifkan"
                            >
                              <Trash2 size={16} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleRestoreClick(user)}
                              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Aktifkan Kembali"
                            >
                              <RefreshCcw size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-xs text-gray-500 font-medium">
              Halaman {page} dari {totalPages}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs"
              >
                Sebelumnya
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs"
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Edit Data {roleTarget === 'user' ? 'Masyarakat' : 'Petugas'}</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Username</label>
                <div className="relative">
                  <UserCircle2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={editForm.username}
                    onChange={e => setEditForm({...editForm, username: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33D6A6]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={e => setEditForm({...editForm, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33D6A6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nomor Telepon</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={editForm.phoneNumber}
                    onChange={e => setEditForm({...editForm, phoneNumber: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33D6A6]"
                  />
                </div>
              </div>

              {/* Tampilkan dropdown role hanya jika role saat ini BUKAN admin. (Admin harus super admin yg ganti) */}
              {editingUser?.role !== 'admin' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Ubah Role</label>
                  <div className="relative">
                    <ShieldCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={editForm.role}
                      onChange={e => setEditForm({...editForm, role: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33D6A6] appearance-none cursor-pointer"
                    >
                      <option value="user">User (Masyarakat)</option>
                      <option value="petugas">Petugas</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl"
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="rounded-xl bg-[#33D6A6] hover:bg-[#2bc295] text-white"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Petugas Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Tambah Petugas Baru</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddPetugas} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Username</label>
                <div className="relative">
                  <UserCircle2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={addForm.username}
                    onChange={e => setAddForm({...addForm, username: e.target.value})}
                    placeholder="Masukkan username..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33D6A6]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={addForm.email}
                    onChange={e => setAddForm({...addForm, email: e.target.value})}
                    placeholder="Masukkan email..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33D6A6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nomor Telepon</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={addForm.phoneNumber}
                    onChange={e => setAddForm({...addForm, phoneNumber: e.target.value})}
                    placeholder="Contoh: 08123456789"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33D6A6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password Sementara</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={addForm.password}
                    onChange={e => setAddForm({...addForm, password: e.target.value})}
                    placeholder="Masukkan password..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33D6A6]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl"
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  disabled={isAdding}
                  className="rounded-xl bg-[#33D6A6] hover:bg-[#2bc295] text-white"
                >
                  {isAdding ? "Menambahkan..." : "Tambah Petugas"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete/Deactivate Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert size={32} className="text-red-500" />
            </div>
            
            <h3 className="text-xl font-black text-gray-900 mb-2">Nonaktifkan Akun?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Apakah Anda yakin ingin menonaktifkan akun <strong className="text-gray-900">{userToDelete.username}</strong>? 
              Akun pengguna tidak akan bisa login.
            </p>

            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setUserToDelete(null);
                }}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Memproses..." : "Ya, Nonaktifkan"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Restore/Activate Modal */}
      {isRestoreModalOpen && userToRestore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCcw size={32} className="text-emerald-500" />
            </div>
            
            <h3 className="text-xl font-black text-gray-900 mb-2">Aktifkan Akun?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Apakah Anda yakin ingin mengaktifkan kembali akun <strong className="text-gray-900">{userToRestore.username}</strong>? 
              Pengguna ini akan bisa login ke dalam sistem lagi.
            </p>

            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => {
                  setIsRestoreModalOpen(false);
                  setUserToRestore(null);
                }}
              >
                Batal
              </Button>
              <Button
                className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={handleRestoreConfirm}
                disabled={isRestoring}
              >
                {isRestoring ? "Memproses..." : "Ya, Aktifkan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
