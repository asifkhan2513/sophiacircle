import React from 'react'

export default function Articles() {
  return (
    <div className="glass p-10 rounded-[2rem] shadow-xl">
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="pb-6 border-b border-foreground/10 last:border-0 last:pb-0">
            <h3 className="text-2xl font-bold mb-2">The Nature of Reality, Part {i}</h3>
            <p className="text-foreground/70 font-light">
              An exploration of metaphysical perspectives in modern philosophy.
            </p>
          </div>
        ))}
      </div>
    </div>

  )
}
