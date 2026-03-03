"use client";

import React, { useState } from 'react';
import {
    PenLine,
    Type,
    Image as ImageIcon,
    Hash,
    Send,
    X,
    ArrowLeft,
    FileText,
    Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

interface CreateArticleProps {
    onClose: () => void;
    user: any;
}

export default function CreateArticle({ onClose, user }: CreateArticleProps) {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'General',
        image: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate article creation and storage
        setTimeout(() => {
            const articles = JSON.parse(localStorage.getItem('user_articles') || '[]');
            const newArticle = {
                ...formData,
                id: Date.now(),
                authorName: user.name,
                authorEmail: user.email,
                createdAt: new Date().toISOString()
            };

            articles.unshift(newArticle);
            localStorage.setItem('user_articles', JSON.stringify(articles));

            toast.success('Article published successfully!');
            setIsLoading(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="px-8 py-6 border-b border-black/5 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                            <PenLine size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Create Article</h2>
                            <p className="text-black/40 text-xs font-bold uppercase tracking-wider">Sharing your wisdom</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-black/5 rounded-2xl transition-colors group"
                    >
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="flex-grow overflow-y-auto p-8 md:p-10">
                    <form id="article-form" onSubmit={handleSubmit} className="space-y-8">
                        {/* Title Input */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black/60 ml-1">
                                <Type size={16} /> Article Title
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="The Stoic perspective on modern technology..."
                                className="w-full text-3xl md:text-4xl font-black tracking-tighter bg-transparent border-none focus:ring-0 placeholder:text-black/10 transition-all p-0"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Category Select */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black/60 ml-1">
                                    <Hash size={16} /> Category
                                </label>
                                <select
                                    className="w-full p-4 bg-black/5 border-none rounded-2xl font-bold appearance-none outline-none focus:ring-2 focus:ring-black transition-all"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>General</option>
                                    <option>Stoicism</option>
                                    <option>Existentialism</option>
                                    <option>Ethics</option>
                                    <option>Logic</option>
                                    <option>Metaphysics</option>
                                </select>
                            </div>

                            {/* Image Placeholder */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black/60 ml-1">
                                    <ImageIcon size={16} /> Image URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full p-4 bg-black/5 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-black transition-all"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black/60 ml-1">
                                <FileText size={16} /> Brief Excerpt
                            </label>
                            <textarea
                                required
                                rows={2}
                                placeholder="A short summary that catches the reader's eye..."
                                className="w-full p-4 bg-black/5 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-black transition-all resize-none"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black/60 ml-1">
                                <Sparkles size={16} /> Content
                            </label>
                            <textarea
                                required
                                rows={8}
                                placeholder="Write your philosophical thoughts here..."
                                className="w-full p-6 bg-black/5 border-none rounded-[2rem] font-medium leading-relaxed outline-none focus:ring-2 focus:ring-black transition-all"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 border-t border-black/5 bg-white/80 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-8 py-4 text-black font-bold flex items-center justify-center gap-2 hover:bg-black/5 rounded-2xl transition-all"
                    >
                        <ArrowLeft size={20} /> Cancel
                    </button>
                    <button
                        form="article-form"
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:flex-grow px-10 py-4 bg-black text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-70"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Publish Article <Send size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
