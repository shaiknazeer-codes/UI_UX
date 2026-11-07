'use client'

import { changelogEntries } from '@/data/changelog'
import { Sparkles, Check, ArrowRight } from 'lucide-react'

export default function Changelog() {
  return (
    <section id="changelog" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
          Continuous Velocity
        </span>
        <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">
          Shipped weekly. Documented obsessively.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted">
          Linear-style public releases detailing core engine performance, multiplayer presence, and CLI improvements.
        </p>
      </div>

      {/* Changelog Timeline Entries */}
      <div className="max-w-3xl mx-auto space-y-10 relative">
        {/* Vertical line indicator */}
        <div className="hidden sm:block absolute left-4.5 top-3 bottom-3 w-px bg-line" />

        {changelogEntries.map((entry) => (
          <div key={entry.version} className="relative sm:pl-12 group">
            {/* Dot on vertical line */}
            <div className="hidden sm:flex absolute left-3 top-1.5 w-3 h-3 rounded-full bg-card border-2 border-accent items-center justify-center -translate-x-1/2 group-hover:scale-125 transition-transform" />

            <div className="p-6 rounded-2xl border border-line bg-card shadow-xs hover:border-accent/40 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm font-bold text-fg bg-accent-subtle px-2 py-0.5 rounded text-accent">
                    {entry.version}
                  </span>
                  <span className="text-xs font-medium text-muted font-mono">{entry.date}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-bg-muted border border-line text-muted">
                  {entry.tag}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-fg">
                {entry.title}
              </h3>

              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-muted">
                {entry.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
