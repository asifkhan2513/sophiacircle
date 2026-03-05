import React, { useState, useRef, useEffect } from "react";
import {
    PenLine,
    Type,
    Image as ImageIcon,
    Hash,
    Send,
    X,
    ArrowLeft,
    FileText,
    Sparkles,
    Upload,
    Calendar,
    Bold,
    Italic,
    Link as LinkIcon,
    Quote,
    Code,
    List,
    RotateCcw,
    RotateCw,
    Plus,
    ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";

interface CreateArticleProps {
    onClose: () => void;
}

export default function CreateArticle({ onClose }: CreateArticleProps) {
    const { user } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        tags: "",
        category: "Philosophy",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size too large (max 5MB)");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const insertText = (before: string, after: string = "") => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const text = formData.content;
        const selectedText = text.substring(start, end);
        const newText =
            text.substring(0, start) +
            before + selectedText + after +
            text.substring(end);

        setFormData({ ...formData, content: newText });

        // Focus back and set cursor
        setTimeout(() => {
            textareaRef.current?.focus();
            textareaRef.current?.setSelectionRange(
                start + before.length,
                end + before.length
            );
        }, 0);
    };

    const handleToolbarAction = (action: string) => {
        switch (action) {
            case "Bold": insertText("**", "**"); break;
            case "Italic": insertText("_", "_"); break;
            case "Quote": insertText("\n> "); break;
            case "Code": insertText("`", "`"); break;
            case "List": insertText("\n- "); break;
            case "Link": insertText("[", "](url)"); break;
            default: break;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Title is required");
            return;
        }
        if (!formData.content.trim()) {
            toast.error("Content is required");
            return;
        }
        if (!imageFile) {
            toast.error("Please select a cover image");
            return;
        }

        setIsLoading(true);
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.content);
            data.append("category", formData.category);
            data.append(
                "tags",
                JSON.stringify(formData.tags.split(",").map((t) => t.trim()))
            );
            data.append("image", imageFile);

            await api.post("/articles", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Article published successfully!");
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to publish article");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-40 flex flex-col pt-16 md:pt-28 pb-16 md:pb-24 bg-[#D6E6E6] overflow-y-auto">
            {/* Navbar Overlay Logic Match */}
            <div className="container mx-auto px-4 md:px-6 max-w-7xl animate-in fade-in duration-500">

                {/* Back Link Overlay like Article Detail */}
                <div className="flex justify-start mb-8">
                    <button
                        onClick={onClose}
                        className="inline-flex items-center gap-2 text-black px-4 py-2 bg-[#E7EFC7] rounded-full uppercase text-[14px] font-black tracking-widest hover:scale-105 transition-all shadow-sm hover:cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Back to Archive
                    </button>
                </div>

                {/* Centered Heading Layout like screenshot */}
                <div className="flex flex-col items-center mb-10 md:mb-16">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black drop-shadow-sm uppercase flex items-center gap-4 text-center">
                        Create Article
                    </h1>
                    <p className="text-[10px] font-black tracking-[0.2em] text-black/40 uppercase mt-4">
                        Published articles will be available for publicly available to all users
                    </p>
                </div>

                {/* Top Info Bar: Date & Author */}
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-black uppercase tracking-widest text-[#5C5C54]">Date</span>
                        <div className="flex items-center gap-2 bg-white px-6 py-2.5 rounded-full shadow-md border border-black/10">
                            <span className="font-bold text-sm">{currentDate}</span>
                            <Calendar size={18} className="text-black/40" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-black uppercase tracking-widest text-[#5C5C54]">Author</span>
                        <div className="bg-white px-8 py-2.5 rounded-full shadow-md border border-black/10 min-w-[120px]">
                            <span className="font-black text-sm">{user?.name?.split(' ')[0] || 'Member'}</span>
                        </div>
                    </div>
                </div>

                {/* Main Canvas */}
                <div className="bg-[#F0F5F5]/80 backdrop-blur-md rounded-[3.5rem] p-6 md:p-12 shadow-2xl border border-white/20 relative min-h-[60vh]">
                    {/* Close Button Pin */}
                    <button onClick={onClose} className="absolute right-8 top-8 p-3 hover:bg-black/5 rounded-full transition-colors hover:cursor-pointer">
                        <X size={24} />
                    </button>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-12">
                        {/* Left: Image Management */}
                        <div className="lg:col-span-3">
                            <div className="bg-[#F3F0E6] p-6 pb-8 rounded-[3rem] shadow-xl border border-black/20 flex flex-col items-center">
                                <div className="w-full aspect-square mb-6 relative group">
                                    {imagePreview ? (
                                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl">
                                            <img src={imagePreview} className="w-full h-full object-cover" alt="Article Cover" />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full rounded-[2.5rem] bg-white border-[8px] border-white shadow-2xl flex flex-col items-center justify-center text-black/10">
                                            <ImageIcon size={64} strokeWidth={1} />
                                            <p className="text-[10px] font-black uppercase mt-4 tracking-tighter">Cover Image</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-black text-white px-10 py-3.5 rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-xl hover:cursor-pointer"
                                >
                                    {imagePreview ? 'Change Image' : 'Add Image'}
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                            </div>
                        </div>

                        {/* Center: Main Form */}
                        <div className="lg:col-span-6">
                            <div className="bg-[#F3F0E6] p-8 md:p-10 rounded-[3rem] shadow-xl border border-black space-y-8">
                                {/* Title */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black ml-4">Article Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="The Silent Tao: A Journey into Void"
                                        className="w-full bg-white border-2 border-black/10 px-6 py-4 rounded-full font-bold focus:ring-2 focus:ring-black outline-none transition-all"
                                    />
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black ml-4">Tags</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="#taoism, #philosophy, #harmony"
                                        className="w-full bg-white border-2 border-black/10 px-6 py-4 rounded-full font-bold focus:ring-2 focus:ring-black outline-none transition-all"
                                    />
                                </div>

                                {/* Description / Content */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black ml-4">Description</label>
                                    <div className="bg-white rounded-[2rem] border-2 border-black/10 overflow-hidden flex flex-col">
                                        {/* Editor Toolbar */}
                                        <div className="flex items-center gap-1.5 p-3 border-b border-black/10 overflow-x-auto bg-black/5">
                                            <button onClick={() => handleToolbarAction("Bold")} type="button" className="p-2 hover:bg-black/10 rounded-lg text-black/80 transition-colors hover:cursor-pointer"><Bold size={16} /></button>
                                            <button onClick={() => handleToolbarAction("Italic")} type="button" className="p-2 hover:bg-black/10 rounded-lg text-black/80 transition-colors hover:cursor-pointer"><Italic size={16} /></button>
                                            <button onClick={() => handleToolbarAction("Link")} type="button" className="p-2 hover:bg-black/10 rounded-lg text-black/80 transition-colors hover:cursor-pointer"><LinkIcon size={16} /></button>
                                            <button onClick={() => handleToolbarAction("Quote")} type="button" className="p-2 hover:bg-black/10 rounded-lg text-black/80 transition-colors hover:cursor-pointer"><Quote size={16} /></button>
                                            <button onClick={() => handleToolbarAction("Code")} type="button" className="p-2 hover:bg-black/10 rounded-lg text-black/80 transition-colors hover:cursor-pointer"><Code size={16} /></button>
                                            <button onClick={() => handleToolbarAction("List")} type="button" className="p-2 hover:bg-black/10 rounded-lg text-black/80 transition-colors hover:cursor-pointer"><List size={16} /></button>
                                        </div>
                                        <textarea
                                            ref={textareaRef}
                                            rows={8}
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            placeholder="Write your philosophical thoughts here..."
                                            className="w-full p-6 bg-white outline-none font-serif text-lg leading-relaxed border-none focus:ring-0"
                                        />
                                    </div>
                                </div>

                                {/* Save Actions */}
                                <div className="flex items-center gap-4 pt-4">
                                    <button className="flex-1 bg-white border-2 border-black/10 text-black px-10 py-5 rounded-full font-black text-sm hover:bg-black/5 transition-all shadow-lg uppercase tracking-tight hover:cursor-pointer">
                                        Save Draft
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="flex-[1.5] bg-black text-white px-10 py-5 rounded-full font-black text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl uppercase tracking-tighter flex items-center justify-center gap-3 disabled:opacity-70 hover:cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>Publish Article <ChevronRight size={20} /></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Multi-Image Gallery Logic Mockup */}
                        <div className="lg:col-span-3 space-y-8">
                            <div className="bg-[#F3F0E6] p-8 pb-10 rounded-[3rem] shadow-xl border border-black/20 flex flex-col items-center">
                                <h3 className="text-center font-black tracking-tighter mb-8 leading-tight">
                                    Future Multi-Image <br /> Gallery
                                </h3>

                                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`aspect-square rounded-2xl border-2 border-dashed border-black/20 flex items-center justify-center text-black/20 ${i === 3 ? 'col-span-2 mx-auto w-1/2' : ''} hover:cursor-pointer hover:border-black/40 transition-colors`}>
                                            <Plus size={24} strokeWidth={1} />
                                        </div>
                                    ))}
                                </div>

                                <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Add image slots</span>
                            </div>

                            <div className="flex justify-end pt-12">
                                <button className="bg-white/80 border-2 border-black/20 text-black px-8 py-4 rounded-full font-black text-xs hover:bg-[#F3F0E6] transition-all shadow-xl uppercase tracking-widest flex items-center gap-3 hover:cursor-pointer">
                                    Read Full Article
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
