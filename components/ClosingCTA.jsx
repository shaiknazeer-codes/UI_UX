'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Command } from 'lucide-react'

export default function ClosingCTA({ onOpenModal }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-line bg-bg">
      {/* Soft Glow Backdrop */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[600px] h-[300px] rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/10 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-mono font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Switch to keyboard speed</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-fg text-balance leading-tight">
          Ready to experience product velocity at the speed of thought?
        </h2>

        <p className="mt-6 text-base sm:text-xl text-muted max-w-xl mx-auto text-balance">
          Join over 14,000 product engineers building better software with zero mouse friction.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onOpenModal}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Get started free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#hero"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-line bg-card hover:bg-bg-muted text-fg font-medium text-base flex items-center justify-center gap-2 transition-colors"
          >
            <Command className="w-4 h-4 text-accent" />
            <span>Back to top</span>
          </a>
        </div>
      </div>
    </section>
  )
}

