import Contactus from "../components/Contactus";
import { Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with the Sophia Circle community. Share your thoughts, collaborate on philosophical projects, or join our discussions.",
    keywords: ["contact philosophy community", "join sophia circle", "philosophical collaboration", "contact deep thinkers"],
};

export default function ContactPage() {
    return (
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                    <Mail className="text-black" size={48} />
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                        Contact Us
                    </h1>
                </div>
                <Contactus />
            </div>
        </main>
    );
}

