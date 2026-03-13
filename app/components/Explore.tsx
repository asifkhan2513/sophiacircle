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
      <div className='border-2 border-black rounded-3xl p-4'>
        <h1 className="text-2xl ">hello Its a Philosophy Circle read about me more come to joint us and make a circle</h1>
      </div>
      <iframe
        className="rounded-3xl"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/fUEquN-WD7M?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1"
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  )
}
