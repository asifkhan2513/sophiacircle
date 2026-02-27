import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sophia Circle - A Philosophical Community",
  description: "A philosophical community platform for deep thinking and meaningful discussions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background selection:bg-accent/20">
        {children}
      </body>
    </html>
  );
}

