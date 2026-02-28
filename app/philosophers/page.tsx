import Philosophers from "../components/Philosophers";
import { Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Philosophers",
    description: "Learn about history's most influential thinkers, from Socrates and Plato to Nietzsche and Camus. Explore their lives and core ideas.",
    keywords: ["great philosophers", "famous thinkers", "history of philosophy", "philosopher biographies", "Plato", "Aristotle", "Nietzsche"],
};

export default function PhilosophersPage() {
    return (
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                    <Users className="text-black" size={48} />
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                        Philosophers
                    </h1>
                </div>
                <Philosophers />
            </div>
        </main>
    );
}

