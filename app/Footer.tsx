import React from "react";
import { siteConfig } from "./config";

export default function Footer() {
  return (
    <footer className="bg-background text-black py-12 md:py-20 border-t border-black/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pb-12 border-b border-black/10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-3">{siteConfig.name}</h2>
            <p className="text-black font-bold italic max-w-xs mx-auto md:mx-0">
              "{siteConfig.description}"
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-black uppercase tracking-wider">
            <a href="#" className="hover:opacity-70 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Terms</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
          </div>
        </div>
        <div className="pt-10 text-center text-black text-sm font-black uppercase tracking-[0.2em]">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>

  );
}


