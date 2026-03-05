const Articles = lazy(() => import("@/app/components/Articles"));
import { BookOpen } from "lucide-react";
import { Metadata } from "next";
import { lazy, Suspense } from "react";
import Loader from "@/app/loading";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Deep dive into philosophical articles, essays, and critiques on various schools of thought like Stoicism, Ethics, and Metaphysics.",
  keywords: [
    "philosophy articles",
    "philosophical essays",
    "stoicism blog",
    "ethics discussion",
    "philosophical critique",
  ],
};

export default function ArticlesPage() {
  return (
    <main className="grow pt-16 md:pt-24 pb-16 md:pb-24 bg-[#D6E6E6]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center mb-10 md:mb-16">
          <h1 className="text-2xl md:text-[9rem] font-black tracking-tighter text-[#5C5C54] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] uppercase leading-none">
            Articles
          </h1>
        </div>

        <div className="bg-[#F0F5F5]/80 backdrop-blur-md rounded-[3rem] p-6 md:p-12 shadow-2xl border border-white/20 min-h-[60vh]">
          <Suspense fallback={<Loader />}>
            <Articles />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
