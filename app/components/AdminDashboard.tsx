"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
    Users,
    FileText,
    Trash2,
    Eye,
    Shield,
    ArrowUpRight,
    TrendingUp,
    MoreVertical,
    Search,
    UserCircle,
    MapPin,
    AlertCircle,
    X
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import api from "@/app/utils/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
    const { user, token } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    const [stats, setStats] = useState<any>(null);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [allArticles, setAllArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeSection, setActiveSection] = useState<'users' | 'articles'>('users');
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const fetchAdminData = useCallback(async () => {
        if (!token || user?.role !== 'admin') return;

        setLoading(true);
        try {
            const [statsRes, usersRes, articlesRes] = await Promise.all([
                api.get("/admin/stats"),
                api.get("/admin/users"),
                api.get("/articles")
            ]);

            setStats(statsRes.data.stats);
            setAllUsers(usersRes.data.users);
            setAllArticles(articlesRes.data.articles);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch admin data");
            if (error.response?.status === 401) router.push("/dashboard");
        } finally {
            setLoading(false);
        }
    }, [token, user?.role, router]);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            toast.error("Access denied. Admin only.");
            router.push("/dashboard");
            return;
        }
        fetchAdminData();
    }, [user, fetchAdminData, router]);

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm("Are you sure? This will delete the user and all their articles.")) return;

        try {
            await api.delete(`/admin/users/${userId}`);
            toast.success("User deleted successfully");
            if (selectedUser?._id === userId) setSelectedUser(null);
            fetchAdminData();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    };

    const handleDeleteArticle = async (articleId: string) => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;

        try {
            await api.delete(`/articles/${articleId}`);
            toast.success("Article removed by admin");
            fetchAdminData();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete article");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-8">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl">
                        <Shield size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter">Admin Control</h1>
                        <p className="text-black/40 text-sm font-bold uppercase tracking-widest">System Oversight & Management</p>
                    </div>
                </div>

                <div className="flex bg-black/5 p-1.5 rounded-2xl border border-black/5">
                    <button
                        onClick={() => setActiveSection('users')}
                        className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${activeSection === 'users' ? 'bg-white shadow-lg text-black' : 'text-black/40 hover:text-black'}`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveSection('articles')}
                        className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${activeSection === 'articles' ? 'bg-white shadow-lg text-black' : 'text-black/40 hover:text-black'}`}
                    >
                        All Articles
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Seekers', value: stats?.userCount, icon: Users, color: 'emerald' },
                    { label: 'Total Wisdoms', value: stats?.articleCount, icon: FileText, color: 'blue' },
                    { label: 'Growth Rate', value: '+12%', icon: TrendingUp, color: 'orange' },
                    { label: 'System Health', value: 'Optimal', icon: Shield, color: 'black' },
                ].map((stat, i) => (
                    <div key={i} className="glass p-8 rounded-[2.5rem] shadow-xl border border-black/5 flex flex-col justify-between group hover:scale-[1.02] transition-all">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all`}>
                                <stat.icon size={22} />
                            </div>
                            <ArrowUpRight size={20} className="text-black/20 group-hover:text-black transition-colors" />
                        </div>
                        <div>
                            <span className="text-black/40 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                            <p className="text-3xl font-black tracking-tighter mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Management Table Area */}
            <div className="glass rounded-[3rem] shadow-2xl border border-black/5 overflow-hidden flex flex-col">
                <div className="p-8 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-black tracking-tight">
                            {activeSection === 'users' ? 'User Registry' : 'Article Ledger'}
                        </h2>
                        <span className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest text-black/40">
                            {activeSection === 'users' ? allUsers.length : allArticles.length} Total
                        </span>
                    </div>

                    <div className="relative group max-w-sm w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={`Search ${activeSection}...`}
                            className="w-full pl-12 pr-6 py-4 bg-black/5 border-none rounded-2xl font-medium focus:ring-2 focus:ring-black outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    {activeSection === 'users' ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-black/5">
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-black/40">User</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-black/40">Email</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-black/40">Location</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-black/40">Role</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-black/40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {allUsers
                                    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((u) => (
                                        <tr key={u._id} className="hover:bg-black/[0.02] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center font-black text-black">
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <span className="font-black">{u.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-black/60 font-medium">{u.email}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-black/40">
                                                    <MapPin size={12} />
                                                    {u.city || 'Unknown'}, {u.country || '-'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-black text-white' : 'bg-black/5 text-black/40'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedUser(u)}
                                                        className="p-3 text-black/10 hover:text-black hover:bg-black/5 rounded-xl transition-all"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(u._id)}
                                                        disabled={u.role === 'admin'}
                                                        className="p-3 text-black/10 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-0"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-black/5">
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-black/40">Article</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-black/40">Author</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-black/40">Category</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-black/40">Date</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-black/40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {allArticles
                                    .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((a) => (
                                        <tr key={a._id} className="hover:bg-black/[0.02] transition-colors">
                                            <td className="px-8 py-6 max-w-xs">
                                                <span className="font-black line-clamp-1">{a.title}</span>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-black/60 font-medium">
                                                {a.author?.name || 'Deleted User'}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest text-black/40">
                                                    {a.category || '-'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-xs text-black/40 font-bold">
                                                {new Date(a.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => router.push(`/articles/${a._id}`)}
                                                        className="p-3 text-black/10 hover:text-black hover:bg-black/5 rounded-xl transition-all"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteArticle(a._id)}
                                                        className="p-3 text-black/10 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {((activeSection === 'users' && allUsers.length === 0) || (activeSection === 'articles' && allArticles.length === 0)) && (
                    <div className="p-20 flex flex-col items-center justify-center text-center opacity-20">
                        <AlertCircle size={64} className="mb-4" />
                        <p className="text-2xl font-black">No registry found</p>
                    </div>
                )}
            </div>

            {/* User Details Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={() => setSelectedUser(null)}
                    />
                    <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-black/5 flex items-center justify-between bg-black text-white">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-xl">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">{selectedUser.name}</h3>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{selectedUser.role} Account</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Email Address</label>
                                    <p className="font-bold text-sm truncate">{selectedUser.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Age / Gender</label>
                                    <p className="font-bold text-sm">{selectedUser.age || '-'} / {selectedUser.gender || 'Not set'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Location</label>
                                    <p className="font-bold text-sm">{selectedUser.city || 'Unknown'}, {selectedUser.country || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Joined On</label>
                                    <p className="font-bold text-sm">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-black/5 flex items-center gap-4">
                                <div className="flex-1 p-4 bg-black/5 rounded-2xl">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-black uppercase text-black/30">Total Posts</span>
                                        <FileText size={14} className="text-black/20" />
                                    </div>
                                    <p className="text-2xl font-black">
                                        {allArticles.filter(a => (a.author?._id || a.author) === selectedUser._id).length}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDeleteUser(selectedUser._id)}
                                    disabled={selectedUser.role === 'admin'}
                                    className="px-6 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all shadow-lg flex items-center gap-2 disabled:hidden"
                                >
                                    <Trash2 size={18} /> Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
