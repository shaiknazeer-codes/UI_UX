'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { integrationCategories, integrations } from '@/data/integrations'
import {
  Search,
  CheckCircle2,
  ExternalLink,
  GitPullRequest,
  Workflow,
  MessageSquare,
  Terminal,
  FileText,
  AlertTriangle,
  Activity,
  Layers,
  Command,
  Sparkles,
  Box,
  X
} from 'lucide-react'

function FigmaIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  )
}

const iconMap = {
  GitPullRequest,
  Figma: FigmaIcon,
  Workflow,
  MessageSquare,
  Terminal,
  FileText,
  AlertTriangle,
  Activity,
  Layers,
  Command,
  Sparkles,
  Box
}

export default function IntegrationsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Trigger 400ms skeleton loading on initial load and whenever category changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [selectedCategory])

  const filteredIntegrations = integrations.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <section id="integrations" className="py-20 md:py-28 border-t border-line bg-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
            Ecosystem Mesh
          </span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">
            Plugs into your existing stack in minutes.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted">
            Bi-directional synchronization with Git repositories, Figma design files, and telemetry pipelines.
          </p>
        </div>

        {/* Filter Controls: Category tabs + Search bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Integration categories"
            className="flex items-center p-1 rounded-xl bg-card border border-line shadow-2xs w-full sm:w-auto overflow-x-auto"
          >
            {integrationCategories.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-muted hover:text-fg hover:bg-bg-muted'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-card border border-line text-xs text-fg placeholder:text-muted focus:outline-hidden focus:border-accent"
              aria-label="Search integrations"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-fg"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Grid Content with Skeleton Loading or Empty State */}
        {isLoading ? (
          /* Skeleton Loader (6 Cards) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-line bg-card/60 space-y-3 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-bg-muted" />
                  <div className="w-16 h-4 rounded-full bg-bg-muted" />
                </div>
                <div className="w-32 h-4 rounded bg-bg-muted" />
                <div className="w-full h-8 rounded bg-bg-muted" />
                <div className="flex justify-between pt-2">
                  <div className="w-16 h-3 rounded bg-bg-muted" />
                  <div className="w-20 h-3 rounded bg-bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredIntegrations.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredIntegrations.map((item) => {
              const IconComp = iconMap[item.icon] || Workflow
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-line bg-card hover:border-accent/40 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-subtle text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-bg-muted border border-line text-muted">
                        {item.speed}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base text-fg flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.popular && (
                        <span className="text-[10px] bg-accent/10 text-accent font-medium px-1.5 py-0.2 rounded">
                          Popular
                        </span>
                      )}
                    </h3>

                    <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-muted">
                    <span className="font-mono text-[11px]">{item.category}</span>
                    <span className="flex items-center gap-1 text-emerald-500 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </motion.div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center rounded-2xl border border-line bg-card/60 p-8">
            <div className="w-12 h-12 rounded-full bg-bg-muted text-muted mx-auto flex items-center justify-center mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-fg">No integrations match your search</h3>
            <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
              We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-accent text-white text-xs font-medium cursor-pointer"
            >
              Reset search & category filter
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
