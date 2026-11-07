'use client'

import { socialProof } from '@/data/nav'

export default function SocialProof() {
  return (
    <section className="border-y border-line py-10 bg-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
          {socialProof.stat}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {socialProof.companies.map((company) => (
            <div
              key={company.symbol}
              className="flex items-center gap-2 group cursor-default"
            >
              <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-muted/80 group-hover:text-fg group-hover:scale-105 transition-all">
                {company.symbol}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

