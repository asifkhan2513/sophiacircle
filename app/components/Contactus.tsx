import React from 'react'

export default function Contactus() {
  return (
    <div className="glass p-10 rounded-[2rem] shadow-xl">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 opacity-70">Email Address</label>
          <input type="email" className="w-full bg-white/50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all" placeholder="your@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 opacity-70">Message</label>
          <textarea className="w-full bg-white/50 border border-black/5 rounded-xl px-4 py-3 min-h-[150px] outline-none focus:ring-2 focus:ring-accent/20 transition-all" placeholder="Your thoughts..."></textarea>
        </div>
        <button className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:scale-[1.01] transition-all hover:cursor-pointer">Send Message</button>
      </form>
    </div>

  )
}
