"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Calendar,
    User as UserIcon,
    Tag,
    ArrowLeft,
    Clock,
    Share2,
    MessageCircle,
    MapPin,
    Eye,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/app/utils/api";
import Image from "next/image";
import Loader from "@/app/loading";

export default function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles/${id}`);
                setArticle(response.data.article);
            } catch (error: any) {
                toast.error(error.response?.data?.message || "Failed to load article");
                router.push("/articles");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchArticle();
    }, [id, router]);

    if (loading) return <Loader />;
    if (!article) return null;

    return (
        <main className="grow pt-16 md:pt-24 pb-16 md:pb-24 bg-[#D6E6E6]">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                {/* Back Link Overlay */}
                <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 text-black f  px-2 bg-[#E7EFC7] rounded-full uppercase text-[18px] tracking-widest mb-8 hover:opacity-100 opacity-100 transition-all group"
                >
                    <ArrowLeft
                        size={16}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    Back
                </Link>

                {/* Main Article Canvas */}
                <div className="bg-[#F3F0E6] rounded-[3.5rem] shadow-2xl border border-white/20 overflow-hidden">
                    {/* Header Section */}
                    <header className="pt-16 pb-12 px-8 md:px-20 flex flex-col items-center text-center">
                        {/* Center Header Image */}
                        {article.image && (
                            <div className="w-48 h-48 md:w-35 md:h-35 rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl mb-12 transform -rotate-2">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                    width={400}
                                    height={400}
                                />
                            </div>
                        )}

                        <h1 className="text-4xl md:text-2xl font-black tracking-tighter mb-6 text-black leading-tight max-w-4xl">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-black/40 uppercase tracking-widest mb-10">
                            {article.tags?.slice(0, 3).map((tag: string) => (
                                <span key={tag} className="text-emerald-700">
                                    #{tag}
                                </span>
                            ))}
                            <span className="mx-2 ">•</span>
                            <span className="mx-2 text-black">{new Date(article.createdAt).toLocaleDateString()}</span>
                            <span className="mx-2 ">•</span>
                            <span className="text-black font-black">
                                {article.author?.name || "Anonymous"}
                            </span>
                        </div>
                    </header>

                    <div className="h-px w-full bg-black/5" />

                    {/* Content Layout */}
                    <div className="px-8 md:px-20 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left Column: Philosophical Text */}
                        <div className="lg:col-span-7 space-y-10">
                            <div className="prose prose-xl prose-stone max-w-none">
                                <p className="text-xl md:text-2xl text-black/80 leading-relaxed font-serif first-letter:text-6xl first-letter:font-black first-letter:text-stone-400 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                                    {article.description}
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Wisdom Gallery */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-white/40 backdrop-blur-sm rounded-[3rem] p-10 border border-white/50 shadow-xl">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-2xl font-black tracking-tighter">
                                        Wisdom in Images
                                    </h3>
                                    <div className="p-2 bg-black/5 rounded-full">
                                        <Share2 size={16} />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="flex-1 aspect-square rounded-full border-4 border-white shadow-lg overflow-hidden relative group"
                                        >
                                            <Image
                                                src={article.image || "/assets/logo.jpg"}
                                                alt="wisdom"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                fill
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 border-2 border-dashed border-black/5 rounded-[3rem] flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white">
                                    <UserIcon size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black">
                                        About the Author
                                    </p>
                                    <h4 className="text-xl font-black">
                                        {article.author?.name || "Anonymous"}
                                    </h4>
                                    <p className="text-sm font-medium text-black mt-1">
                                        {article.author?.city}, {article.author?.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Canvas Footer */}
                    <footer className="px-8 md:px-20 py-6 border-t border-black/5 flex justify-center text-[10px] font-black uppercase tracking-widest text-black/20">
                        Sophia Circle | End of Wisdom
                    </footer>
                </div>
            </div>
        </main>
    );
}
