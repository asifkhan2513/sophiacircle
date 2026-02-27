import React from 'react'

export default function Philosophers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {["Socrates", "Plato", "Aristotle", "Marcus Aurelius"].map((name) => (
        <div key={name} className="glass p-8 rounded-[2.5rem] hover:translate-y-[-4px] transition-all cursor-default group border border-black/5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black group-hover:text-accent transition-colors">{name}</h3>
            <div className="flex space-x-2 opacity-40 group-hover:opacity-100 transition-opacity">
              {/* Minimalist social dots/icons */}
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-black"></div>
            </div>
          </div>
          <p className="text-black font-medium mt-2 leading-relaxed">Leading historical figure in classical philosophy. Discover their wisdom and connect.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/" className="p-3 bg-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm group/icon" title="WhatsApp">
              <span className="text-xs font-black uppercase">WA</span>
            </a>
            <a href="https://t.me/" className="p-3 bg-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm" title="Telegram">
              <span className="text-xs font-black uppercase">TG</span>
            </a>
            <a href="mailto:" className="p-3 bg-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm" title="Mail">
              <span className="text-xs font-black uppercase">ML</span>
            </a>
            <a href="https://discord.com/" className="p-3 bg-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm" title="Discord">
              <span className="text-xs font-black uppercase">DC</span>
            </a>
            <a href="https://linkedin.com/" className="p-3 bg-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm" title="LinkedIn">
              <span className="text-xs font-black uppercase">LI</span>
            </a>
            <a href="https://instagram.com/" className="p-3 bg-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm" title="Instagram">
              <span className="text-xs font-black uppercase">IG</span>
            </a>
          </div>
        </div>
      ))}
    </div>


  )
}
