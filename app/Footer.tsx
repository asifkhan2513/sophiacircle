import React from "react";
import Link from "next/link";
import { siteConfig } from "./config";
import Image from "next/image";

import {
  Instagram,
  Twitter,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Sparkles,
  Globe,
  ShieldCheck
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-black pt-24 pb-12 border-t border-black/5 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/[0.02] rounded-full -mr-48 -mb-48 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-20 border-b border-black/5">

          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform duration-500">
                <Image
                  src={siteConfig.logo}
                  alt="Logo"
                  width={100}
                  height={100}
                  loading="lazy" />
              </div>
              <span className="text-2xl font-black tracking-tighter">{siteConfig.name}</span>
            </Link>

            <p className="text-black font-medium leading-relaxed max-w-sm">
              Exploring the intersections of ancient wisdom and modern life. Sophia Circle is a sanctuary for those who believe the unexamined life is not worth living.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: <Instagram size={18} />, href: "#" },
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Github size={18} />, href: "#" },
                { icon: <Linkedin size={18} />, href: "#" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black">Community</h4>
            <ul className="space-y-4">
              {[
                { name: "Explore", path: "/explore" },
                { name: "Meeting", path: "/meeting" },
                { name: "Philosophers", path: "/philosophers" },
                { name: "Articles", path: "/articles" }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-black font-bold hover:text-black hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black">Platform</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Dashboard", path: "/dashboard" },
                { name: "Privacy", path: "/privacy" }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-black font-bold hover:text-black hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-black/5 p-8 rounded-[2.5rem] border border-black/5">
              <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                Join the Circle <ArrowRight size={20} className="text-black/20" />
              </h4>
              <p className="text-sm text-black font-medium mb-6">
                Receive weekly insights on philosophy, ethics, and great thinkers. No spam, just deep thoughts.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-white border-2 border-transparent focus:border-black rounded-2xl py-4 pl-6 pr-14 text-sm font-bold shadow-sm transition-all focus:shadow-xl outline-none"
                />
                <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-black/40">
            <span className="flex items-center gap-2 text-black">
              <Globe size={12} /> GLOBAL THINKERS
            </span>
            <span className="flex items-center gap-2 text-black">
              <ShieldCheck size={12} /> SECURED DATA
            </span>
          </div> */}

          <p className="text-[10px] font-black  tracking-[0.3em] text-black text-center md:text-right">
            &copy; {currentYear} {siteConfig.name}. CRAFTED FOR THE MODERN STOIC.
          </p>
        </div>
      </div>
    </footer>
  );
}


