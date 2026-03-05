"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setArticles, setLoading, setError } from '../redux/features/articles/articleSlice';
import api from '../utils/api';
import { Calendar, User as UserIcon, Tag, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {articles.map((article: any) => (
        <div
          key={article._id}
          className="bg-[#F3F0E6] p-8 pb-10 rounded-[3rem] shadow-xl border border-black/5 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center group"
        >
          {/* Circular Image Container */}
          <div className="w-full aspect-square mb-6 relative group">
            {article?.image ? (
              <div className="w-full h-full rounded-full overflow-hidden border-[8px] border-white shadow-2xl relative">
                <Image
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-black/5 flex items-center justify-center border-4 border-dashed border-black/10">
                <BookOpen className="text-black/20" size={48} />
              </div>
            )}

            {/* Overlay Icon or Effect if needed - keep it simple like screenshot */}
          </div>

          {/* Meta Information */}
          <div className="text-center mb-4">
            <p className="text-[10px] font-bold text-black/60 tracking-tight flex flex-wrap justify-center gap-1">
              {article?.tags?.slice(0, 3).map((tag: string, i: number) => (
                <span key={tag}>#{tag}{i < article.tags.slice(0, 3).length - 1 ? ',' : ''}</span>
              ))}
              <span className="mx-1">•</span>
              <span>{new Date(article?.createdAt).toLocaleDateString()}</span>
              <span className="mx-1">•</span>
              <span className="font-black text-black">{article?.author?.name || 'Anonymous'}</span>
            </p>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter text-center leading-tight">
            {article?.title}
          </h2>

          {/* Description */}
          <p className="text-black/60 font-medium leading-relaxed mb-10 text-center line-clamp-3 text-sm md:text-base">
            {article?.description}
          </p>

          {/* Action Button */}
          <div className="mt-auto">
            <Link
              href={`/articles/${article?._id}`}
              className="px-8 py-3.5 bg-black text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all text-xs flex items-center gap-3 shadow-2xl group"
            >
              Read Full Article
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
