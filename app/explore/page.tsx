import { Users } from "lucide-react";
import { Metadata } from "next";
import { lazy, Suspense } from "react";
import Loader from "@/app/loading";
const Explore = lazy(() => import("@/app/components/Explore"));

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Learn about history's most influential thinkers, from Socrates and Plato to Nietzsche and Camus. Explore their lives and core ideas.",
  keywords: [
    "great philosophers",
    "famous thinkers",
    "history of philosophy",
    "philosopher biographies",
    "Plato",
    "Aristotle",
    "Nietzsche",
  ],
};

export default function ExplorePage() {
  return (
    <main className="grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <Users className="text-black" size={48} />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Explore
          </h1>
        </div>
        <Suspense fallback={<Loader />}>
          <Explore />
        </Suspense>
      </div>
    </main>
  );
}
