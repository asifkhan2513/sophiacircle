import React from 'react'

export default function Meeting() {
  return (
    <div className="glass p-10 rounded-[2rem] shadow-xl text-center">
      <div className="mb-8 p-6 bg-accent/5 rounded-2xl inline-block">
        <svg className="w-12 h-12 text-accent mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 1 0 002-2V8a2 1 0 00-2-2H5a2 1 0 00-2 2v8a2 1 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-4">Upcoming Session</h3>
      <p className="text-foreground/70 mb-8 font-light italic">
        "The Ethics of AI in a Modern World"
      </p>
      <button className="px-10 py-4 bg-accent text-white font-bold rounded-full shadow-lg shadow-accent/20 hover:scale-105 transition-all">Join Video Call</button>
    </div>

  )
}
