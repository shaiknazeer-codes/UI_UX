'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pricingTiers } from '@/data/pricing'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

export default function Pricing({ onOpenModal }) {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <section id="pricing" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
          Transparent Investment
        </span>
        <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">
          Simple, predictable pricing.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted">
          Start free with your core team, or upgrade to Pro for multiplayer chording and infinite history.
        </p>

        {/* Monthly / Yearly Switch */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-xs sm:text-sm font-medium ${!isYearly ? 'text-fg' : 'text-muted'}`}>
            Monthly billing
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            aria-label="Toggle annual billing discount"
            onClick={() => setIsYearly((prev) => !prev)}
            className="w-12 h-6 rounded-full bg-line-strong p-1 relative transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-accent shadow-xs"
              animate={{ x: isYearly ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>

          <span className={`text-xs sm:text-sm font-medium flex items-center gap-1.5 ${isYearly ? 'text-fg' : 'text-muted'}`}>
            <span>Annual billing</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {pricingTiers.map((tier) => {
          const price = isYearly ? tier.priceYearly : tier.priceMonthly

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                tier.highlighted
                  ? 'border-2 border-accent bg-card shadow-2xl ring-4 ring-accent/10 lg:-translate-y-2'
                  : 'border border-line bg-card/70 shadow-sm hover:border-line-strong'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white text-[11px] font-semibold tracking-wide flex items-center gap-1 shadow-md shadow-indigo-500/30">
                  <Sparkles className="w-3 h-3" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-fg">{tier.name}</h3>
                  {!tier.highlighted && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-bg-muted text-muted">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs sm:text-sm text-muted min-h-[40px]">
                  {tier.description}
                </p>

                {/* Animated Price display */}
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-extrabold text-fg font-mono">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="inline-block"
                      >
                        ${price}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="text-xs sm:text-sm text-muted">
                    / member / month
                  </span>
                </div>
                <div className="text-[11px] text-muted mt-1 font-mono">
                  {tier.hint}
                </div>

                {/* Feature Checklist */}
                <div className="mt-8 pt-6 border-t border-line space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-fg">
                    Included capabilities:
                  </p>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tier.highlighted
                      ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-indigo-500/25'
                      : 'border border-line bg-bg hover:bg-bg-muted text-fg'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

