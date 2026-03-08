import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { Roboto } from 'next/font/google'
import ReduxProvider from "./redux/provider";
import GoogleProvider from "./redux/GoogleProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://sophiacircle.vercel.app"),
  title: {
    default: "Sophia Circle: A Philosophical Community Platform",
    template: "Sophia Circle: %s",
  },
  description:
    "Sophia Circle is a philosophical community platform for discussions, articles, quotes, meetings, and learning from great thinkers.",
  applicationName: "Sophia Circle",
  keywords: [
    "Sophia Circle",
    "philosophy community India",
    "philosophical community",
    "philosophy discussions",
    "Stoicism India",
    "Existentialism",
    "philosophy for beginners",
    "philosophical quotes",
    "learning philosophy",
    "deep thinking platform",
    "Socrates",
    "Marcus Aurelius",
    "Plato",
    "Aristotle",
    "ethics and logic",
    "mindfulness philosophy",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sophia Circle",
    title: "Sophia Circle — A Philosophical Community Platform",
    description:
      "Join Sophia Circle, the ultimate philosophical community. Explore articles, meetings, and wisdom from history's greatest thinkers.",
    images: [
      {
        url: "/assests/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Sophia Circle Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sophia Circle — A Philosophical Community Platform",
    description:
      "A philosophical community platform for deep thinkers. Explore Stoicism, Ethics, and Wisdom.",
    images: ["/assests/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background selection:bg-accent/20">
        <ReduxProvider>
          <GoogleProvider>
            <Toaster position="top-center" />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
            </div>
          </GoogleProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

