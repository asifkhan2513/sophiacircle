import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
            <div className="text-center">
                <h1 className="text-[10rem] md:text-[15rem] font-black text-black/5 leading-none select-none">
                    404
                </h1>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                        Lost in thought?
                    </h2>
                    <p className="text-lg md:text-xl text-black/60 font-medium mb-12 max-w-md mx-auto">
                        Even the greatest philosophers wandered, but this path seems to lead nowhere.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl"
                    >
                        <Home size={20} />
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
