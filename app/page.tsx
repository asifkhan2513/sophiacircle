import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { siteConfig, routes } from "./config";

// ---- SEO Metadata for the Home page (App Router) ----
export const metadata: Metadata = {
  title: "Sophia Circle — A Philosophical Community Platform",
  description:
    "Join Sophia Circle, a thriving philosophical community for deep discussions, Stoicism, Existentialism, and wisdom from history's greatest thinkers.",
  keywords: [
    "Sophia Circle",
    "philosophy community",
    "philosophical discussions",
    "Stoicism",
    "Existentialism",
    "Socrates",
    "Marcus Aurelius",
    "Ancient Wisdom",
    "Ethics and Logic",
    "Philosophical meetings",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://sophiacircle.vercel.app/",
    siteName: "Sophia Circle",
    title: "Sophia Circle — A Philosophical Community Platform",
    description:
      "Explore philosophy through articles, meetings, and quotes. Learn from great thinkers in our community.",
    images: [
      {
        url: "/assests/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Sophia Circle Philosophical Community",
      },
    ],

  },
  twitter: {
    card: "summary_large_image",
    title: "Sophia Circle — A Philosophical Community Platform",
    description:
      "A philosophical community platform for discussions, articles, meetings, philosophers, and quotes.",
    images: ["/assests/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "uqDCd2pzQ4ZsRE4Qgg3o6j5GxDxHPNGl67r6irATNbc",
  },
};

export default function Home() {
  // ---- Structured Data (JSON-LD) ----
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name ?? "Sophia Circle",
    url: "https://sophiacircle.vercel.app",
    description:
      siteConfig.description ??
      "A philosophical community platform for discussions, articles, quotes, meetings, and learning from great thinkers.",
  };

  return (
    <main className="flex-grow">
      <Script
        id="json-ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section with Video */}
      <section
        aria-label="Sophia Circle hero"
        className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
          aria-label="Background video"

        >
          <source src={siteConfig.heroVideo} type="video/mp4" />
        </video>

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
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
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M19 14l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* Featured Sections */}
      <section
        aria-label="Featured sections"
        className="py-20 md:py-32 px-4 md:px-8 bg-background"
      >
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

                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
                  {route.name}
                </h2>

                <p className="text-black/60 font-medium leading-relaxed">
                  Dive deep into our curated {route.name.toLowerCase()} and discover the wisdom of ages.
                </p>

                <div className="mt-8 flex items-center text-black font-bold group-hover:gap-4 transition-all gap-2">
                  <span>Read more</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}