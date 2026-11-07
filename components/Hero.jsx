'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroBackground from '@/components/HeroBackground'
import { heroCommands } from '@/data/commands'
import {
  Command,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GitPullRequest,
  GitBranch,
  Rocket,
  RefreshCw,
  PlusCircle,
  Calendar,
  SunMoon,
  CornerDownLeft,
  SlidersHorizontal
} from 'lucide-react'

const iconMap = {
  GitPullRequest,
  GitBranch,
  Rocket,
  RefreshCw,
  PlusCircle,
  Calendar,
  SunMoon
}

export default function Hero({ onOpenModal }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lastExecuted, setLastExecuted] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const inputRef = useRef(null)

  // Listen for loader completion or session restore
  useEffect(() => {
    let alreadySkipped = false
    try {
      alreadySkipped =
        document.documentElement.classList.contains('skip-loader') ||
        Boolean(sessionStorage.getItem('loaded') || sessionStorage.loaded)
    } catch (e) {}

    if (alreadySkipped) {
      setIsRevealed(true)
      return
    }

    const handleReveal = () => setIsRevealed(true)
    window.addEventListener('kestrel:revealed', handleReveal)

    // Fallback: reveal hero anyway if event was missed or delayed
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true)
    }, 1250)

    return () => {
      window.removeEventListener('kestrel:revealed', handleReveal)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const categories = ['All', 'Actions', 'Engineering', 'Ship', 'Sync']

  const filteredCommands = heroCommands.filter((cmd) => {
    const matchesCategory = selectedCategory === 'All' || cmd.category === selectedCategory
    const matchesQuery =
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase()) ||
      cmd.shortcut.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  // Global ⌘K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (inputRef.current) {
          inputRef.current.focus()
          inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  // Reset selectedIndex when filtered results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query, selectedCategory])

  const executeCommand = (cmd) => {
    if (!cmd) return
    setLastExecuted({
      id: cmd.id,
      title: cmd.title,
      text: cmd.actionText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    })

    // Auto-clear notification after 4 seconds
    setTimeout(() => {
      setLastExecuted((current) => (current?.id === cmd.id ? null : current))
    }, 4000)
  }

  const handleKeyDown = (e) => {
    if (filteredCommands.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const currentCmd = filteredCommands[selectedIndex]
      if (currentCmd) executeCommand(currentCmd)
    }
  }

  return (
    <section id="hero" className="relative isolate pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Raycast-inspired Layered Animated Background */}
      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line bg-card/70 backdrop-blur-md shadow-xs hover:border-accent/40 transition-colors mb-6 cursor-pointer"
          onClick={() => {
            const el = document.querySelector('#changelog')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-fg flex items-center gap-1">
            Introducing Kestrel 2.4 — Zero-latency keyboard chording
          </span>
          <ArrowRight className="w-3 h-3 text-muted" />
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-fg text-balance leading-[1.08]"
        >
          Plan, build, and ship at the speed of thought.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
          className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto font-normal text-balance"
        >
          The unified keyboard command center for high-velocity product teams.
          Replace disjointed tools with muscle memory, sub-8ms local sync, and git-native flow.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, delay: 0.24, ease: 'easeOut' }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={onOpenModal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Start 14-day free trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#hero-demo"
            onClick={(e) => {
              e.preventDefault()
              if (inputRef.current) {
                inputRef.current.focus()
                inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-line bg-card/60 hover:bg-bg-muted text-fg font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Command className="w-4 h-4 text-accent" />
            <span>Try interactive ⌘K palette</span>
          </a>
        </motion.div>

        {/* Keyboard hint note */}
        <p className="mt-3 text-xs text-muted flex items-center justify-center gap-1.5">
          <span>Tip:</span>
          <kbd className="px-1.5 py-0.5 rounded-sm bg-bg-muted border border-line text-[11px] font-mono text-fg">
            ⌘K
          </kbd>
          <span>or</span>
          <kbd className="px-1.5 py-0.5 rounded-sm bg-bg-muted border border-line text-[11px] font-mono text-fg">
            Ctrl+K
          </kbd>
          <span>focuses the command engine anywhere</span>
        </p>

        {/* Interactive ⌘K Command Palette Hero Component */}
        <motion.div
          id="hero-demo"
          initial={{ opacity: 0, y: 28 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
          className="mt-12 text-left max-w-3xl mx-auto rounded-2xl border border-line-strong bg-card/90 backdrop-blur-xl shadow-2xl p-4 sm:p-5 relative overflow-hidden"
        >
          {/* Top Window Header */}
          <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
              <span className="text-xs font-mono text-muted ml-2">kestrel-session ~ cmd-palette</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-bg-muted border border-line text-[10px] font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-bg-muted border border-line text-[10px] font-mono">↵</kbd>
                run
              </span>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
            isFocused ? 'border-accent bg-bg ring-2 ring-accent/20' : 'border-line bg-bg-muted/50'
          }`}>
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or search actions (e.g. 'issue', 'PR', 'deploy')..."
              className="w-full bg-transparent text-sm text-fg placeholder:text-muted focus:outline-hidden"
              aria-label="Command search palette"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-muted hover:text-fg px-1.5 py-0.5 rounded bg-bg-muted cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-xs">
            <span className="text-muted text-[11px] font-medium mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-accent text-white shadow-xs'
                    : 'bg-bg-muted text-muted hover:text-fg hover:bg-line'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Feedback Toast Banner when command is executed */}
          <AnimatePresence>
            {lastExecuted && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      <strong className="font-semibold">Executed:</strong> {lastExecuted.text}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-75">{lastExecuted.time}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Command List */}
          <div className="mt-3 divide-y divide-line/40 max-h-64 overflow-y-auto" role="listbox" aria-label="Available commands">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => {
                const IconComponent = iconMap[cmd.icon] || Command
                const isSelected = selectedIndex === idx

                return (
                  <div
                    key={cmd.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedIndex(idx)
                      executeCommand(cmd)
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-accent-subtle text-accent'
                        : 'hover:bg-bg-muted text-fg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${
                        isSelected ? 'bg-accent text-white' : 'bg-bg-muted text-muted'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium flex items-center gap-2">
                          <span>{cmd.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-bg-muted text-muted">
                            {cmd.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted font-normal line-clamp-1">{cmd.actionText}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-[11px] text-muted">
                        {cmd.badge}
                      </span>
                      <kbd className="px-2 py-0.5 rounded-sm bg-bg-muted border border-line text-xs font-mono font-medium text-fg shadow-2xs">
                        {cmd.shortcut}
                      </kbd>
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-accent animate-pulse" />
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-8 text-center text-sm text-muted">
                <p>No matching commands found for &ldquo;{query}&rdquo;</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setSelectedCategory('All')
                  }}
                  className="mt-2 text-xs text-accent underline cursor-pointer"
                >
                  Reset search filter
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

