import Navbar from "../Navbar";
import Footer from "../Footer";
import Meeting from "../components/Meeting";

export default function MeetingPage() {
    return (
        <div className="flex flex-col min-h-screen text-black">
            <Navbar />
            <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-black mb-8 md:mb-12 tracking-tighter">
                        Meeting
                    </h1>
                    <Meeting />
                </div>
            </main>
            <Footer />
        </div>
    );
}

