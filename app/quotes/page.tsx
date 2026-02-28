import Quotes from "../components/Quotes";
import { Quote } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quotes",
    description: "A curated collection of the most profound philosophical quotes to inspire deep thinking, mindfulness, and wisdom.",
    keywords: ["philosophy quotes", "deep quotes", "inspiring wisdom", "stoic quotes", "philosophical thoughts", "daily wisdom"],
};

export default function QuotesPage() {
    return (
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                    <Quote className="text-black" size={48} />
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                        Quotes
                    </h1>
                </div>
                <Quotes />
            </div>
        </main>
    );
}

