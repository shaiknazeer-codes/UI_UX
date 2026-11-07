'use client'

import { useState } from 'react'
import { bentoFeatures } from '@/data/bento'
import {
  GitCommit,
  Check,
  Zap,
  ArrowUpRight,
  Database,
  Users,
  Clock,
  Sparkles,
  Command
} from 'lucide-react'

function BentoCard({ feature }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl border border-line bg-card p-6 overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-xl ${feature.colSpan}`}
    >
      {/* Spotlight Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, var(--glow), transparent 75%)`
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Linear-style Fig 0.X caption */}
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-mono text-muted tracking-wide">{feature.figure}</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-bg-muted border border-line text-muted">
              Hardware-accelerated
            </span>
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-fg">
            {feature.title}
          </h3>

          <p className="mt-2 text-sm text-muted leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Realistic Mock UI Preview */}
        <div className="mt-6 rounded-xl border border-line bg-bg/80 p-4 font-mono text-xs">
          {feature.type === 'capture' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-muted text-[11px] pb-1.5 border-b border-line">
                <span className="flex items-center gap-1.5 font-medium text-fg">
                  <Command className="w-3.5 h-3.5 text-accent" />
                  Quick Capture Buffer
                </span>
                <span className="text-[10px] bg-accent-subtle text-accent px-1.5 py-0.5 rounded">
                  Hit C
                </span>
              </div>
              <div className="p-2 rounded bg-bg-muted border border-line-strong flex items-center justify-between">
                <span className="text-fg font-sans font-medium text-xs">
                  Re-index WASM state vector on worker thread
                </span>
                <span className="text-[10px] text-amber-500 font-semibold px-1.5 py-0.5 bg-amber-500/10 rounded">
                  P0 Urgent
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted">
                <span>Assignee: <strong className="text-fg font-sans">@alex</strong></span>
                <span>•</span>
                <span>Milestone: <strong className="text-fg font-sans">v2.4 Core</strong></span>
              </div>
            </div>
          )}

          {feature.type === 'git' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-accent" />
                  release/v2.4.0
                </span>
                <span className="text-emerald-500 flex items-center gap-1 font-sans">
                  <Check className="w-3 h-3" />
                  Merged
                </span>
              </div>
              <div className="p-2 rounded bg-bg-muted border border-line text-[11px] space-y-1">
                <div className="text-fg font-sans">feat: zero-latency keyboard multiplexer</div>
                <div className="text-[10px] text-muted flex items-center gap-3">
                  <span>commit <span className="text-accent">9b40fa1</span></span>
                  <span>142 additions</span>
                </div>
              </div>
            </div>
          )}

          {feature.type === 'triage' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-muted pb-1 border-b border-line">
                <span>KEYBOARD CURSOR</span>
                <kbd className="px-1.5 py-0.5 rounded bg-bg-muted border border-line">J / K</kbd>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-accent-subtle border border-accent/30 text-accent font-sans text-xs">
                <span>→ KES-104: WASM memory pool</span>
                <span className="text-[10px] font-mono">1</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded text-muted font-sans text-xs opacity-75">
                <span>KES-108: Touch ID fallback</span>
                <span className="text-[10px] font-mono">2</span>
              </div>
            </div>
          )}

          {feature.type === 'analytics' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-muted text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-accent" />
                  Cycle Velocity
                </span>
                <span className="text-emerald-500 font-bold text-xs">99.8% on-time</span>
              </div>
              {/* Mini sparkline visualization */}
              <div className="flex items-end gap-1.5 h-12 pt-2">
                {[35, 45, 60, 50, 75, 90, 85, 100].map((val, idx) => (
                  <div key={idx} className="flex-1 bg-bg-muted rounded-t overflow-hidden h-full flex items-end">
                    <div
                      style={{ height: `${val}%` }}
                      className="w-full bg-accent hover:opacity-80 transition-opacity rounded-t"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted">
                <span>Mon</span>
                <span>Median: 1.4 days</span>
                <span>Sun</span>
              </div>
            </div>
          )}

          {feature.type === 'multiplayer' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-muted">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-accent" />
                  Active Staging Lock
                </span>
                <span className="text-indigo-400 font-mono text-[10px]">us-east-1</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-bg-muted border border-line">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-bg">
                    AK
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-bg">
                    SL
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-bg">
                    MC
                  </div>
                </div>
                <div className="text-[11px] text-fg font-sans font-medium">
                  3 engineers reviewing <span className="text-accent font-mono">KES-104</span>
                </div>
              </div>
            </div>
          )}

          {feature.type === 'offline' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-accent" />
                  Local SQLite WASM
                </span>
                <span className="text-emerald-500 font-mono text-[10px]">12ms sync</span>
              </div>
              <div className="p-2 rounded bg-bg-muted border border-line flex items-center justify-between text-[10px] text-muted">
                <span>Tables synced: <strong className="text-fg">14/14</strong></span>
                <span className="text-emerald-500 font-semibold">● Online</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BentoGrid() {
  return (
    <section id="features" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
          Architecture & Capabilities
        </span>
        <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">
          Built for teams that measure velocity in milliseconds.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted">
          Linear clarity, Raycast speed, and Framer responsiveness engineered into a single unified workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bentoFeatures.map((feature) => (
          <BentoCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  )
}
