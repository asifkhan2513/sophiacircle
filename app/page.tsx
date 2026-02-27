import Navbar from "./Navbar";
import Footer from "./Footer";
import { siteConfig, routes } from "./config";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-black">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with Video - Forced 100vh/100vw */}
        <section className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={siteConfig.heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Very Light Overlay for Video Visibility */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs md:text-sm font-bold tracking-widest uppercase bg-black text-white rounded-full animate-fade-in shadow-xl">
              By {siteConfig.author}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[1] text-white drop-shadow-2xl">
              {siteConfig.name}
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl mb-12 text-white font-medium leading-tight max-w-3xl mx-auto drop-shadow-lg">
              {siteConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Explore Philosophy
              </Link>
              <Link
                href="/meeting"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-black text-white font-bold rounded-2xl hover:bg-white hover:text-black transition-all duration-300 shadow-2xl border border-white/20"
              >
                Join a Meeting
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* Featured Sections - Responsive Grid */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {routes.slice(1, 4).map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="group p-8 md:p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-black/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-black rounded-2xl mb-8 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold">{route.name[0]}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black">{route.name}</h3>
                  <p className="text-black/60 font-medium leading-relaxed">
                    Dive deep into our curated {route.name.toLowerCase()} and discover the wisdom of ages.
                  </p>
                  <div className="mt-8 flex items-center text-black font-bold group-hover:gap-4 transition-all gap-2">
                    <span>Read more</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
