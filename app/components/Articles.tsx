"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setArticles, setLoading, setError } from '../redux/features/articles/articleSlice';
import api from '../utils/api';
import { Calendar, User as UserIcon, Tag, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Articles() {
  const { articles, loading } = useSelector((state: RootState) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchArticles = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.get('/articles');
        dispatch(setArticles(response.data.articles));
      } catch (error: any) {
        dispatch(setError(error.response?.data?.message || 'Failed to load articles'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchArticles();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="glass p-10 rounded-[2rem] shadow-xl text-center">
        <p className="text-xl font-bold text-black/40">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {articles.map((article: any) => (
        <div key={article._id} className="glass p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-black/5 hover:border-black/10 transition-all group">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {article.image && (
              <div className="md:col-span-4 h-48 md:h-full rounded-3xl overflow-hidden border border-black/5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className={article.image ? "md:col-span-8 flex flex-col" : "md:col-span-12 flex flex-col"}>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-4 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  {article.tags?.[0] || 'Philosophy'}
                </span>
                <div className="flex items-center gap-2 text-black/40 text-xs font-bold">
                  <Calendar size={14} />
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-black/40 text-xs font-bold">
                  <UserIcon size={14} />
                  {article.author?.name || 'Anonymous'}
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter group-hover:text-black/70 transition-colors">
                {article.title}
              </h2>

              <p className="text-black/60 font-medium leading-relaxed mb-8 line-clamp-3">
                {article.description}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <Link
                  href={`/articles/${article._id}`}
                  className="px-6 py-3 bg-black text-white font-bold rounded-2xl hover:scale-105 transition-all text-sm flex items-center gap-2 shadow-lg"
                >
                  Read Full Article <ChevronRight size={18} />
                </Link>
                <div className="hidden sm:flex items-center gap-2">
                  {article.tags?.slice(1, 3).map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold text-black/30 border border-black/5 px-2 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
