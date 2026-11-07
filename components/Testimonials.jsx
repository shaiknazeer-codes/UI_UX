'use client'

import { testimonials } from '@/data/testimonials'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 border-t border-line bg-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
            Engineer Sentiment
          </span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">
            Loved by product builders who hate mice.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted">
            Hear from engineering leaders who replaced clunky tracking tools with Kestrel&apos;s keyboard command center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-6 sm:p-7 rounded-2xl border border-line bg-card shadow-xs hover:border-accent/40 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent-subtle text-accent font-semibold">
                    {t.highlight}
                  </span>
                  <Quote className="w-5 h-5 text-muted/40" />
                </div>

                <p className="text-sm sm:text-base text-fg leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center gap-3">
                {/* Initials Avatar */}
                <div className={`w-10 h-10 rounded-full ${t.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-fg">{t.author}</div>
                  <div className="text-xs text-muted">
                    {t.role} • <span className="font-mono">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
