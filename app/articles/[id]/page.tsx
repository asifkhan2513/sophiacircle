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
    Eye
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/app/utils/api";
import Image from "next/image";

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin" />
            </div>
        );
    }

    if (!article) return null;

    return (
        <main className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                {/* Back Link */}
                <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 text-black/40 hover:text-black font-bold mb-10 transition-colors group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Articles
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-5 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                            {article.category || article.tags?.[0] || 'Philosophy'}
                        </span>
                        <div className="flex items-center gap-2 text-black/40 text-xs font-bold bg-black/5 px-4 py-2 rounded-full">
                            <Calendar size={14} />
                            {new Date(article.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-black/40 text-xs font-bold bg-black/5 px-4 py-2 rounded-full">
                            <Eye size={14} />
                            {article.viewCount || 0} views
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between p-6 bg-black/5 rounded-[2rem] border border-black/5">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl">
                                {article.author?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="font-black text-lg">{article.author?.name || 'Anonymous'}</p>
                                <div className="flex items-center gap-3 text-black/40 text-xs font-bold mt-1">
                                    {article.author?.city && (
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} />
                                            {article.author.city}, {article.author.country}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        5 min read
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-3 bg-white rounded-xl shadow-sm hover:scale-110 transition-all text-black/60 hover:text-black border border-black/5">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                {article.image && (
                    <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-black/5">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-xl max-w-none mb-16">
                    <p className="text-xl md:text-2xl text-black/70 leading-relaxed font-medium mb-8">
                        {article.description}
                    </p>
                    {/* In a real app, you'd render rich text content here. 
                        Since we only have description for now, we'll use it as the main body. */}
                    <div className="h-px w-full bg-black/5 my-12" />
                    <div className="flex flex-wrap gap-3">
                        {article.tags?.map((tag: string) => (
                            <span key={tag} className="px-4 py-2 bg-black/5 text-black/60 rounded-xl text-sm font-bold border border-black/5">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </article>

                {/* Footer Interaction */}
                <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <h3 className="font-black text-xl">Enjoyed this article?</h3>
                        <div className="flex items-center gap-2">
                            <button className="px-6 py-3 bg-black text-white font-black rounded-2xl hover:scale-105 transition-all text-sm shadow-xl">
                                Follow Author
                            </button>
                        </div>
                    </div>
                    <button className="flex items-center gap-3 text-black/40 hover:text-black font-bold transition-colors">
                        <MessageCircle size={20} />
                        View Comments (0)
                    </button>
                </div>
            </div>
        </main>
    );
}
