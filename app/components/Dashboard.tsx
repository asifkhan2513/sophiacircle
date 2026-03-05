"use client";
import React, { useEffect, useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LogOut,
    User,
    Settings,
    LayoutDashboard,
    Bell,
    Search,
    Video,
    ArrowRight,
    Clock,
    Plus,
    PenLine,
    BookOpen,
    Calendar,
    ChevronRight,
    Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout as reduxLogout } from '../redux/features/auth/authSlice';
import { setMyArticles, setLoading as setArticleLoading } from '../redux/features/articles/articleSlice';
import api from '../utils/api';

const CreateArticle = lazy(() => import('./CreateArticle'));
const ProfileSettings = lazy(() => import('./ProfileSettings'));
const Loader = lazy(() => import('../loading'));

export default function Dashboard() {
    const { user, token } = useSelector((state: RootState) => state.auth);
    const { myArticles, loading: articlesLoading } = useSelector((state: RootState) => state.article);
    const dispatch = useDispatch();
    const router = useRouter();

    const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 0, minutes: 0, seconds: 0 });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Set target date to 20 days from now
    const targetDate = new Date("2026-03-23T00:00:00Z");

    const fetchMyArticles = useCallback(async () => {
        if (!token) return;
        dispatch(setArticleLoading(true));
        try {
            const response = await api.get('/articles/my-articles');
            dispatch(setMyArticles(response.data.articles));
        } catch (error: any) {
            console.error("Error fetching articles:", error);
            toast.error("Failed to load your articles");
        } finally {
            dispatch(setArticleLoading(false));
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        fetchMyArticles();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [token, router, fetchMyArticles]);

    const handleLogout = useCallback(async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            // Even if backend logout fails, we clear local state
        }
        dispatch(reduxLogout());
        toast.success('Logged out successfully');
        router.push('/login');
        router.refresh();
    }, [dispatch, router]);

    const handleDeleteArticle = useCallback(async (articleId: string) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await api.delete(`/articles/${articleId}`);
                toast.success('Article deleted');
                fetchMyArticles();
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to delete article');
            }
        }
    }, [fetchMyArticles]);

    const stats = useMemo(() => [
        { label: 'My Articles', value: myArticles.length, icon: BookOpen },
        { label: 'Meetings', value: '4', icon: Bell },
    ], [myArticles.length]);

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-10 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
                        Hey, {user.name.split(' ')[0]}!
                    </h1>
                    <p className="text-black/60 font-medium">Welcome back to your philosophical sanctuary.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-3 bg-black/5 hover:bg-black hover:text-white transition-all rounded-2xl font-bold group"
                        title="Settings"
                    >
                        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:scale-105 transition-all rounded-2xl font-bold shadow-xl active:scale-95"
                    >
                        <Plus size={20} />
                        Write Article
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-black/5 hover:bg-black hover:text-white transition-all rounded-2xl font-bold group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile & Stats */}
                <div className="space-y-8">
                    {/* Profile Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-black/5 hover:shadow-2xl hover:border-black/10 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <User size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{user.name}</h3>
                                <p className="text-sm text-black/50">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-black/5">
                            <div className="flex justify-between">
                                <span className="text-black/60 font-medium">Location</span>
                                <span className="font-bold">{user.city || 'Not specified'}, {user.country || ''}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black/60 font-medium">Email Verified</span>
                                <span className="font-bold">{user.isVerified ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black/60 font-medium">Role</span>
                                <span className="font-bold uppercase tracking-widest text-[10px] bg-black text-white px-2 py-1 rounded-full">{user.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Compact Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-lg border border-black/5 hover:shadow-xl transition-all">
                                <stat.icon className="mb-2 text-black/40" size={20} />
                                <h4 className="text-xs font-bold text-black/40 uppercase tracking-wider">{stat.label}</h4>
                                <p className="text-2xl font-black">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Link Card - Create Article */}
                    <div
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-black text-white p-8 rounded-[2.5rem] shadow-xl border border-white/5 hover:scale-[1.02] transition-all cursor-pointer group"
                    >
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                            <PenLine size={24} />
                        </div>
                        <h3 className="text-xl font-black mb-2">Have a thought?</h3>
                        <p className="text-white/60 text-sm mb-6">Write your own philosophical article and share it with the community.</p>
                        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
                            Start Writing <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* Right Column: Upcoming Event & My Articles */}
                <div className="lg:col-span-2 space-y-8 ">
                    {/* Upcoming Event Card */}
                    <div className="border-2 border-black/10 rounded-[3rem] text-black p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group bg-white">
                        {/* Decorative Background Element */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-black/5 rounded-full blur-3xl group-hover:bg-black/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                <div className="flex items-center gap-3 px-4 py-2 bg-black/5 rounded-full border border-black/5">
                                    <Video size={18} className="text-emerald-600" />
                                    <span className="text-sm font-bold tracking-wide uppercase text-black">Next Live Session</span>
                                </div>
                                <div className="flex items-center gap-2 text-black/60 font-medium">
                                    <Clock size={16} />
                                    <span>23 MARCH, 2026</span>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-tight text-black">
                                Stoic Wisdom for the <br /> Modern Chaos
                            </h2>

                            {/* Countdown Timer */}
                            <div className="grid grid-cols-4 gap-4 mb-10">
                                {[
                                    { label: 'Days', value: timeLeft.days },
                                    { label: 'Hours', value: timeLeft.hours },
                                    { label: 'Min', value: timeLeft.minutes },
                                    { label: 'Sec', value: timeLeft.seconds },
                                ].map((item, i) => (
                                    <div key={i} className="text-center">
                                        <div className="bg-black/5 text-black rounded-2xl md:rounded-3xl p-3 md:p-6 mb-2 border border-black/10 group-hover:border-black/20 transition-all shadow-sm">
                                            <span className="text-2xl md:text-4xl font-black block">
                                                {String(item.value).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-black/40">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <a
                                    href="https://meet.google.com/msc-scch-ycu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-8 py-5 bg-black text-white font-black rounded-2xl md:rounded-[1.5rem] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl cursor-pointer"
                                >
                                    Join Meeting <ArrowRight size={20} />
                                </a>
                                <a
                                    href="https://www.google.com/calendar/render?action=TEMPLATE&text=Stoic+Wisdom+for+the+Modern+Chaos&dates=20260323T100000Z/20260323T113000Z&details=Join+our+Sophia+Circle+live+session+on+Google+Meet:+https://meet.google.com/msc-scch-ycu&location=Online"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-8 py-5 bg-black/5 border border-black/10 hover:bg-black/10 text-black font-bold rounded-2xl md:rounded-[1.5rem] transition-all hover:cursor-pointer flex items-center justify-center"
                                >
                                    Add to Calendar
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* User's Recent Articles */}
                    <div className="space-y-6 border rounded-3xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-black tracking-tighter">Your Articles</h2>
                        </div>

                        {articlesLoading ? (
                            <div className="flex justify-center p-10"><div className="w-10 h-10 border-4 border-black/10 border-t-black rounded-full animate-spin" /></div>
                        ) : myArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myArticles.slice(0, 4).map((article, i) => (
                                    <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-black/5 hover:shadow-xl transition-all group flex flex-col">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-tighter rounded-full">
                                                {article.tags?.[0] || 'Philosophy'}
                                            </span>
                                            <span className="text-[10px] font-bold text-black/40 flex items-center gap-1">
                                                <Calendar size={10} /> {new Date(article.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black mb-3 line-clamp-2 leading-tight group-hover:text-black/70 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-black/50 font-medium mb-6 line-clamp-2">
                                            {article.description}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <Link
                                                href={`/articles/${article._id}`}
                                                className="text-sm font-black flex items-center gap-1 group/btn hover:text-black/70 transition-colors"
                                            >
                                                View <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteArticle(article._id)}
                                                className="p-2 text-black/10 hover:text-red-500 transition-colors"
                                                title="Delete article"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-black/5 border-dashed flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center text-black/20 mb-6">
                                    <BookOpen size={40} />
                                </div>
                                <h3 className="text-xl font-black mb-2">No articles yet</h3>
                                <p className="text-black/40 font-medium max-w-xs mb-8">
                                    Share your philosophical perspectives and start building your legacy.
                                </p>
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="px-8 py-4 bg-black text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl"
                                >
                                    Write your first article
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <Suspense fallback={<Loader />}>
                    <CreateArticle
                        onClose={() => {
                            setIsCreateModalOpen(false);
                            fetchMyArticles(); // Refresh list after closing
                        }}
                    />
                </Suspense>
            )}

            {isSettingsOpen && (
                <Suspense fallback={<Loader />}>
                    <ProfileSettings
                        onClose={() => setIsSettingsOpen(false)}
                    />
                </Suspense>
            )}
        </div>
    );
}
