import React from 'react'

export default function Quotes() {
  return (
    <div className="glass p-12 rounded-[3rem] shadow-xl text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-accent/20" />
      <span className="text-6xl text-accent/20 font-serif absolute top-6 left-10">"</span>
      <p className="text-3xl font-light italic leading-relaxed text-foreground px-8">
        The unexamined life is not worth living.
      </p>
      <p className="mt-8 text-accent font-bold uppercase tracking-widest text-sm">— Socrates</p>
    </div>

  )
}
