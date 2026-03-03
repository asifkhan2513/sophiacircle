import React from 'react'
import { MessageCircle, Send, Mail, Disc, Linkedin, Instagram } from "lucide-react";

export default function Explore() {
  const socialLinks = [
    { icon: MessageCircle, href: "https://wa.me/", title: "WhatsApp" },
    { icon: Send, href: "https://t.me/", title: "Telegram" },
    { icon: Mail, href: "mailto:", title: "Mail" },
    { icon: Disc, href: "https://discord.com/", title: "Discord" },
    { icon: Linkedin, href: "https://linkedin.com/", title: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/", title: "Instagram" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {["Socrates", "Plato", "Aristotle", "Marcus Aurelius"].map((name) => (
        <div key={name} className="glass p-8 rounded-[2.5rem] hover:translate-y-[-4px] transition-all cursor-default group border border-black/5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black group-hover:text-accent transition-colors">{name}</h3>
            <div className="flex space-x-2 opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-black"></div>
            </div>
          </div>
          <p className="text-black font-medium mt-2 leading-relaxed">Leading historical figure in classical philosophy. Discover their wisdom and connect.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-3 bg-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm group/icon"
                title={social.title}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
