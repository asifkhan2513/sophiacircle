import React from 'react'
import { Quote } from "lucide-react";

export default function Quotes() {
  const quotes = [
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
    { text: "Doubt is the origin of wisdom.", author: "René Descartes" },
  ];

  return (
    <div className="space-y-8">
      {quotes.map((q, idx) => (
        <div key={idx} className="glass p-12 rounded-[3rem] shadow-xl text-center relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-2 h-full bg-black/10 group-hover:bg-black transition-colors" />
          <Quote className="text-black/5 absolute top-6 left-10" size={60} />
          <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-black px-8 relative z-10">
            {q.text}
          </p>
          <p className="mt-8 text-black font-bold uppercase tracking-widest text-sm relative z-10">— {q.author}</p>
        </div>
      ))}
    </div>
  )
}
