'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Command } from 'lucide-react'

export default function Loader() {
  const shouldReduceMotion = useReducedMotion()
  const [phase, setPhase] = useState('active')

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
      // Under prefers-reduced-motion, show dot static and use 200ms fade as exit
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

    const minTime = 1600
    const maxTime = 2500
    const startTime = Date.now()

    let hasLoaded =
      typeof document !== 'undefined' && document.readyState === 'complete'

    const handleWindowLoad = () => {
      hasLoaded = true
    }

    if (!hasLoaded) {
      window.addEventListener('load', handleWindowLoad, { once: true })
    }

    let slideTimer = null
    let doneTimer = null

    // Check when to close: at least 1.6s, on window load or 2.5s at the latest
    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      if ((hasLoaded && elapsed >= minTime) || elapsed >= maxTime) {
        clearInterval(checkInterval)

        // Step 1: Elements exit (dot stops, track shrinks & fades, logo scales to 1.08 & fades)
        setPhase('exiting-elements')

        // Step 2: Overlay slides up and out to reveal the page
        slideTimer = setTimeout(() => {
          setPhase('sliding-out')
          document.body.style.overflow = ''
          window.dispatchEvent(new CustomEvent('kestrel:revealed'))

          // Step 3: Remove from DOM after 0.7s slide finishes
          doneTimer = setTimeout(() => {
            setPhase('done')
            try {
              sessionStorage.setItem('loaded', 'true')
            } catch (e) {}
          }, 700)
        }, 220)
      }
    }, 40)

    return () => {
      clearInterval(checkInterval)
      window.removeEventListener('load', handleWindowLoad)
      if (slideTimer) clearTimeout(slideTimer)
      if (doneTimer) clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [shouldReduceMotion])

  if (phase === 'done') return null

  const isExitingElements = phase === 'exiting-elements'
  const isSlidingOut = phase === 'sliding-out'

  return (
    <div
      id="kestrel-loader"
      role="status"
      aria-label="Loading Kestrel"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        transform: isSlidingOut ? 'translateY(-100%)' : 'translateY(0%)',
        transition: shouldReduceMotion
          ? 'opacity 0.2s ease'
          : 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
        opacity: shouldReduceMotion && (isExitingElements || isSlidingOut) ? 0 : 1
      }}
    >
      <div className="flex flex-col items-center">
        {/* Orbit track and central logo mark container */}
        <div className="relative w-[112px] h-[112px] flex items-center justify-center">
          {/* Circular track: 1px border in var(--line), about 112px diameter */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={
              isExitingElements || isSlidingOut
                ? { opacity: 0, scale: 0.86 }
                : { opacity: 1, scale: 1 }
            }
            transition={{
              duration: isExitingElements || isSlidingOut ? 0.22 : 0.35,
              delay: isExitingElements || isSlidingOut ? 0 : 0.15,
              ease: 'easeOut'
            }}
            className="absolute inset-0 rounded-full border border-line pointer-events-none"
          />

          {/* Rotating container with dot and comet trail */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              animation: shouldReduceMotion
                ? 'none'
                : 'kestrelOrbit 1.1s linear infinite',
              animationPlayState:
                isExitingElements || isSlidingOut ? 'paused' : 'running',
              opacity: isExitingElements || isSlidingOut ? 0 : 1,
              transition: 'opacity 0.2s ease'
            }}
          >
            {/* Fading trail behind the dot (conic-gradient arc masked to a thin ring) */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 280deg at 50% 50%, transparent 0deg, color-mix(in oklab, var(--accent) 70%, transparent) 65deg, var(--accent) 80deg, transparent 80.5deg)',
                WebkitMask:
                  'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                mask:
                  'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))'
              }}
            />

            {/* Solid 10px dot in accent blue positioned at the top edge of the track */}
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_10px_rgba(99,102,241,0.65)]" />
          </div>

          {/* Center logo mark: rounded accent square scaled up to 48px */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }
            }
            animate={
              isExitingElements || isSlidingOut
                ? { opacity: 0, scale: 1.08 }
                : { opacity: 1, scale: 1 }
            }
            transition={{
              duration: isExitingElements || isSlidingOut ? 0.22 : 0.35,
              ease: 'easeOut'
            }}
            className="relative z-10 w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30"
          >
            <Command className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Wordmark "Kestrel" sitting below in var(--fg), small and medium weight */}
        <motion.span
          initial={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }
          }
          animate={
            isExitingElements || isSlidingOut
              ? { opacity: 0 }
              : { opacity: 1, scale: 1 }
          }
          transition={{
            duration: isExitingElements || isSlidingOut ? 0.2 : 0.35,
            ease: 'easeOut'
          }}
          className="mt-3.5 text-sm font-medium tracking-tight text-fg"
        >
          Kestrel
        </motion.span>
      </div>
    </div>
  )
}
