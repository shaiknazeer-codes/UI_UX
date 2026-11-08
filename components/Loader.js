'use client'

import { useState, useEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'framer-motion'
import { Command } from 'lucide-react'

export default function Loader() {
  const shouldReduceMotion = useReducedMotion()
  const [phase, setPhase] = useState('active')
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Check if loader should be skipped for this session
    let isSkipped = false
    try {
      isSkipped =
        document.documentElement.classList.contains('skip-loader') ||
        Boolean(sessionStorage.getItem('loaded') || sessionStorage.loaded)
    } catch (e) {}

    if (isSkipped) {
      setPhase('done')
      document.body.style.overflow = ''
      return
    }

    // Lock body scroll while loader is visible
    document.body.style.overflow = 'hidden'

    if (shouldReduceMotion) {
      // Under prefers-reduced-motion, skip counting and sliding, show 200ms fade out
      const timer = setTimeout(() => {
        setPhase('done')
        document.body.style.overflow = ''
        try {
          sessionStorage.setItem('loaded', 'true')
        } catch (e) {}
        window.dispatchEvent(new CustomEvent('kestrel:revealed'))
      }, 200)
      return () => clearTimeout(timer)
    }

    let holdTimer = null
    let doneTimer = null

    // Count from 0 to 100 over 1.8s with smooth easeInOut curve
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (latest) => {
        setCount(Math.round(latest))
      },
      onComplete: () => {
        // Hold 250ms at 100%
        holdTimer = setTimeout(() => {
          setPhase('opening')
          document.body.style.overflow = ''
          // Dispatch event to reveal hero with 80ms stagger
          window.dispatchEvent(new CustomEvent('kestrel:revealed'))

          // Slide away duration is 0.7s, then remove overlay from DOM
          doneTimer = setTimeout(() => {
            setPhase('done')
            try {
              sessionStorage.setItem('loaded', 'true')
            } catch (e) {}
          }, 700)
        }, 250)
      }
    })

    return () => {
      controls.stop()
      if (holdTimer) clearTimeout(holdTimer)
      if (doneTimer) clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [shouldReduceMotion])

  if (phase === 'done') return null

  const isOpening = phase === 'opening'

  return (
    <div
      id="kestrel-loader"
      role="status"
      aria-label="Loading Kestrel"
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden"
    >
      {/* Top half panel: slides up on reveal */}
      <div
        className="absolute top-0 left-0 right-0 h-[calc(50%+1px)] flex flex-col justify-start p-6 sm:p-10 md:p-14 overflow-hidden"
        style={{
          backgroundColor: 'var(--bg)',
          transform: isOpening ? 'translateY(-100%)' : 'translateY(0%)',
          transition: shouldReduceMotion
            ? 'opacity 0.2s ease'
            : 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
          opacity: shouldReduceMotion && isOpening ? 0 : 1
        }}
      >
        {/* Kestrel logo mark and wordmark small at the top-left */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/25">
            <Command className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight text-lg text-fg">Kestrel</span>
        </div>
      </div>

      {/* Bottom half panel: slides down on reveal */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[calc(50%+1px)] flex flex-col justify-end p-6 sm:p-10 md:p-14 pb-8 sm:pb-12 overflow-hidden"
        style={{
          backgroundColor: 'var(--bg)',
          transform: isOpening ? 'translateY(100%)' : 'translateY(0%)',
          transition: shouldReduceMotion
            ? 'opacity 0.2s ease'
            : 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
          opacity: shouldReduceMotion && isOpening ? 0 : 1
        }}
      >
        {/* Large percentage at bottom-left */}
        <div className="mb-2 sm:mb-4">
          <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-muted mb-1 sm:mb-2 font-medium">
            Loading workspace
          </div>
          <div
            aria-hidden="true"
            className="font-semibold tracking-tighter tabular-nums text-fg flex items-baseline select-none"
            style={{
              fontSize: 'clamp(5rem, 18vw, 14rem)',
              lineHeight: 0.88
            }}
          >
            <span>{count}</span>
            <span className="text-accent text-[0.42em] ml-1.5 sm:ml-3 font-normal select-none">
              %
            </span>
          </div>
        </div>

        {/* Thin 2px progress line across the bottom that fills with the count, in accent blue */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line/20 overflow-hidden">
          <div
            className="h-full bg-accent transition-[width] duration-75 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  )
}
