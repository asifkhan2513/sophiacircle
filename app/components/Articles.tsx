"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setArticles, setLoading, setError, setFromCache } from '../redux/features/articles/articleSlice';
import api from '../utils/api';
import { getClientCache, setClientCache } from '../utils/clientCache';
import { Calendar, User as UserIcon, Tag, ChevronRight, BookOpen, Search, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Loader from '../loading';

export default function Articles() {
  const { articles, loading } = useSelector((state: RootState) => state.article);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      const cacheKey = `articles_list_page_${page}`;
      const cachedData = getClientCache<any>(cacheKey);

      if (cachedData) {
        dispatch(setArticles(cachedData.articles));
        setTotalPages(cachedData.totalPages || 1);
        return;
      }

      dispatch(setLoading(true));
      try {
        const response = await api.get(`/articles?page=${page}&limit=10`);
        if (response.status !== 200) {
          toast.error("Please Check your internet connection");
          throw new Error("Failed to load articles");
        }
        const data = response.data.articles;
        dispatch(setArticles(data));
        setTotalPages(response.data.totalPages || 1);
        setClientCache(cacheKey, { articles: data, totalPages: response.data.totalPages }, 3600); // Cache for 1 hour
      } catch (error: any) {
        dispatch(setError(error.response?.data?.message || 'Failed to load articles'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchArticles();
  }, [dispatch, page]);

  if (loading) return <Loader />;

  if (articles.length === 0) {
    return (
      <div className="glass p-10 rounded-4xl shadow-xl text-center">
        <p className="text-xl font-bold text-black/40">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Category and Search Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white backdrop-blur-md p-4 rounded-3xl shadow-sm border border-black/10 gap-4 mb-1">
        {/* Sort */}
        <div className="flex items-center gap-3 w-full md:w-auto ml-2">
          <label className="font-bold text-sm text-black">Sort By:</label>
          <select className="bg-white border border-black/10 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6367FF] cursor-pointer shadow-sm">
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="view">View</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-black rounded-2xl px-4 py-2.5 w-full md:w-96 focus-within:ring-2 focus-within:ring-[#6367FF] transition-all shadow-sm">
          <Search size={18} className="text-black" />
          <input
            type="text"
            className="w-full bg-transparent focus:outline-none text-sm placeholder:text-black/30 text-black"
            placeholder="Search any Article"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {articles.map((article: any) => (
          <div
            key={article._id}
            className="bg-[#F3F0E6] pb-10 rounded-[3rem] shadow-xl border border-black flex flex-col items-center group relative"
          >

            {/* Image Container */}
            <div className="w-full relative group mb-6">
              {article?.image ? (
                <Image
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-56 md:h-64 object-cover rounded-t-[3rem]"
                  width={400}
                  height={256}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-56 md:h-64 rounded-t-[3rem] bg-black flex items-center justify-center border-b border-black/10">
                  <BookOpen className="text-white" size={48} />
                </div>
              )}
            </div>
            <div className="text-center mb-1">
              <p className="text-[10px] font-bold text-black tracking-tight flex flex-wrap justify-center gap-1">
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
            <h2 className="text-2xl md:text-3xl font-black mb-1 tracking-tighter text-center leading-tight">
              {article?.title}
            </h2>

            {/* Description */}
            <p className="text-black font-medium leading-relaxed mb-10 text-center line-clamp-3 text-sm md:text-base">
              {article?.description}
            </p>

            {/* Action Button */}
            <div className="mt-auto">
              <Link
                href={`/articles/${article?._id}`}
                className="px-8 py-3.5 bg-[#6367FF] text-white  rounded-full hover:scale-105 active:scale-95 transition-all text-xs flex items-center gap-3 shadow-2xl group"
              >
                Read Full Article
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md flex items-center gap-2 ${page === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-[#6367FF] hover:scale-105 active:scale-95'
              }`}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <span className="font-bold text-black border-2 border-black/10 px-5 py-2.5 rounded-full shadow-sm bg-white text-sm whitespace-nowrap">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md flex items-center gap-2 ${page === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-[#6367FF] hover:scale-105 active:scale-95'
              }`}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
