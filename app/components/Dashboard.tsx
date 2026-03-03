"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import CreateArticle from './CreateArticle';

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 0, minutes: 0, seconds: 0 });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [userArticles, setUserArticles] = useState<any[]>([]);
    const router = useRouter();

    // Set target date to 20 days from now
    const targetDate = new Date("2026-03-23T00:00:00Z");

    const fetchArticles = () => {
        const articles = JSON.parse(localStorage.getItem('user_articles') || '[]');
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const filtered = articles.filter((a: any) => a.authorEmail === currentUser.email);
        setUserArticles(filtered);
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        setUser(currentUser);
        fetchArticles();

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
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        toast.success('Logged out successfully');
        router.push('/login');
        router.refresh();
    };

    const handleDeleteArticle = (articleId: number) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            const articles = JSON.parse(localStorage.getItem('user_articles') || '[]');
            const updated = articles.filter((a: any) => a.id !== articleId);
            localStorage.setItem('user_articles', JSON.stringify(updated));
            fetchArticles();
            toast.success('Article deleted');
        }
    };

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
                                <span className="font-bold">{user.city}, {user.country}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black/60 font-medium">Member Since</span>
                                <span className="font-bold">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black/60 font-medium">Age</span>
                                <span className="font-bold">{user.age || 'Not specified'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Compact Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'My Articles', value: userArticles.length, icon: BookOpen },
                            { label: 'Meetings', value: '4', icon: Bell },
                        ].map((stat, i) => (
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
                                <button className="w-full sm:w-auto px-8 py-5 bg-black/5 border border-black/10 hover:bg-black/10 text-black font-bold rounded-2xl md:rounded-[1.5rem] transition-all hover:cursor-pointer text-sm">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* User's Recent Articles */}
                    <div className="space-y-6 border rounded-3xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-black tracking-tighter">Your Articles</h2>
                            {userArticles.length > 0 && (
                                <button className="text-sm font-black uppercase tracking-widest hover:underline px-4">See all</button>
                            )}
                        </div>

                        {userArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userArticles.slice(0, 4).map((article, i) => (
                                    <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-black/5 hover:shadow-xl transition-all group flex flex-col">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-tighter rounded-full">
                                                {article.category}
                                            </span>
                                            <span className="text-[10px] font-bold text-black/40 flex items-center gap-1">
                                                <Calendar size={10} /> {new Date(article.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black mb-3 line-clamp-2 leading-tight group-hover:text-black/70 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-black/50 font-medium mb-6 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <button className="text-sm font-black flex items-center gap-1 group/btn">
                                                Read more <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteArticle(article.id)}
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

            {/* Create Article Modal */}
            {isCreateModalOpen && (
                <CreateArticle
                    user={user}
                    onClose={() => {
                        setIsCreateModalOpen(false);
                        fetchArticles(); // Refresh list after closing
                    }}
                />
            )}
        </div>
    );
}
