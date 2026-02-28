import Articles from "../components/Articles";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Articles",
    description: "Deep dive into philosophical articles, essays, and critiques on various schools of thought like Stoicism, Ethics, and Metaphysics.",
    keywords: ["philosophy articles", "philosophical essays", "stoicism blog", "ethics discussion", "philosophical critique"],
};

export default function ArticlesPage() {
    return (
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                    <BookOpen className="text-black" size={48} />
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                        Articles
                    </h1>
                </div>
                <Articles />
            </div>
        </main>
    );
}

