'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { keyRows, quickChords } from '@/data/keyboard'
import { Keyboard as KeyboardIcon, Sparkles, Terminal } from 'lucide-react'

export default function KeyboardSection() {
  const [activeCodes, setActiveCodes] = useState(new Set())
  const [lastAction, setLastAction] = useState({
    key: 'K',
    action: 'Move up / Command palette (Default)'
  })

  useEffect(() => {
    // Find key info from code or key
    const findKeyInfo = (code, key) => {
      for (const row of keyRows) {
        for (const item of row) {
          if (item.code.toLowerCase() === code.toLowerCase() || item.label.toLowerCase() === key.toLowerCase()) {
            return item
          }
        }
      }
      return null
    }

    const handleKeyDown = (e) => {
      // Don't intercept if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        return
      }

      setActiveCodes((prev) => {
        const next = new Set(prev)
        next.add(e.code)
        return next
      })

      const info = findKeyInfo(e.code, e.key)
      if (info && info.action) {
        setLastAction({
          key: info.label,
          action: info.action
        })
      }
    }

    const handleKeyUp = (e) => {
      setActiveCodes((prev) => {
        const next = new Set(prev)
        next.delete(e.code)
        return next
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const handleKeyClick = (keyItem) => {
    setActiveCodes(new Set([keyItem.code]))
    setLastAction({
      key: keyItem.label,
      action: keyItem.action
    })
    setTimeout(() => {
      setActiveCodes((prev) => {
        const next = new Set(prev)
        next.delete(keyItem.code)
        return next
      })
    }, 400)
  }

  return (
    <section id="keyboard" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
          Muscle Memory Architecture
        </span>
        <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">
          Your keyboard is your command center.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted">
          Press any key on your physical keyboard right now to see the corresponding keycap light up and reveal its instant Kestrel command.
        </p>
      </div>

      {/* Interactive Active Key Banner */}
      <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl border border-line bg-card shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-subtle text-accent flex items-center justify-center font-mono font-bold text-base shadow-xs">
            {lastAction.key}
          </div>
          <div>
            <div className="text-xs text-muted uppercase font-mono tracking-wider">
              Triggered Action
            </div>
            <div className="text-sm font-semibold text-fg">
              {lastAction.action}
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted bg-bg-muted px-3 py-1.5 rounded-lg border border-line">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>Real-time listener connected</span>
        </div>
      </div>

      {/* On-Screen Keyboard Container */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl border border-line-strong bg-card/75 backdrop-blur-xl shadow-2xl overflow-x-auto">
        <div className="min-w-[680px] space-y-2 select-none">
          {keyRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2">
              {row.map((item) => {
                const isPressed = activeCodes.has(item.code)
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleKeyClick(item)}
                    className={`h-10 sm:h-12 rounded-lg font-mono text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-center cursor-pointer border relative ${
                      item.width || 'w-9 sm:w-11'
                    } ${
                      isPressed
                        ? 'bg-accent text-white border-accent shadow-lg shadow-indigo-500/50 scale-95 ring-2 ring-indigo-400'
                        : 'bg-bg hover:bg-bg-muted border-line text-fg hover:border-accent/40 shadow-2xs'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isPressed && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Quick Chords Strip */}
        <div className="mt-8 pt-6 border-t border-line">
          <p className="text-xs font-mono uppercase text-muted tracking-wider text-center mb-4">
            Most Frequently Chording Combinations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
            {quickChords.map((chord) => (
              <div
                key={chord.combo}
                className="p-2.5 rounded-xl border border-line bg-bg/60 text-center hover:border-accent/30 transition-colors"
              >
                <kbd className="px-2 py-0.5 rounded bg-bg-muted border border-line font-mono font-bold text-fg">
                  {chord.combo}
                </kbd>
                <div className="font-semibold text-fg mt-1.5">{chord.label}</div>
                <div className="text-[11px] text-muted truncate">{chord.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
