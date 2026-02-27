import React from "react";
import { siteConfig } from "./config";
import { Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-black py-12 md:py-20 border-t border-black/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pb-12 border-b border-black/10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-3">{siteConfig.name}</h2>
            <p className="text-black/60 font-medium italic max-w-xs mx-auto md:mx-0">
              "{siteConfig.description}"
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-black/5 rounded-lg hover:bg-black hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-black/5 rounded-lg hover:bg-black hover:text-white transition-all"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-black/5 rounded-lg hover:bg-black hover:text-white transition-all"><Github size={20} /></a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs font-black uppercase tracking-wider">
              <a href="#" className="hover:underline underline-offset-4 transition-all">Privacy</a>
              <a href="#" className="hover:underline underline-offset-4 transition-all">Terms</a>
              <a href="#" className="hover:underline underline-offset-4 transition-all">Contact</a>
            </div>
          </div>
        </div>
        <div className="pt-10 text-center text-black/40 text-[10px] font-black uppercase tracking-[0.3em]">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Crafted for deep thinkers.
          </p>
        </div>
      </div>
    </footer>
  );
}


