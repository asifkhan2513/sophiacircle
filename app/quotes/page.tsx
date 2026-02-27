import Quotes from "../components/Quotes";
import { Quote } from "lucide-react";

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

