import { lazy } from "react";
const About = lazy(() => import("../components/About"));
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "About",
    description: "Learn about Sophia Circle, a dedicated platform for modern philosophical inquiry, community building, and timeless wisdom.",
    keywords: ["about sophia circle", "philosophical community mission", "why study philosophy", "modern stoicism community"],
};

export default function AboutPage() {
    return (
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <h1 className="text-5xl md:text-7xl font-black mb-8 md:mb-12 tracking-tighter">
                    About
                </h1>
                <About />
            </div>
        </main>
    );
}

