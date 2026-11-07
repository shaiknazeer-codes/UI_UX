'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Command } from 'lucide-react'

export default function Loader() {
  const shouldReduceMotion = useReducedMotion()
  const [phase, setPhase] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        if (
          document.documentElement.classList.contains('skip-loader') ||
          Boolean(sessionStorage.getItem('loaded') || sessionStorage.loaded)
        ) {
          return 'done'
        }
      } catch (e) {}
    }
    return 'active'
  })

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
      // Accessible reduced-motion fallback: simple 200ms fade
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

    // Timed sequence:
    // 0 to 1.1s: Progress line fills, logo and wordmark animate
    // 1.1s: Overlay slides up (translateY to -100%)
    // 1.15s: Trigger hero reveal stagger
    // 1.4s: Clean finish and unmount
    const leaveTimer = setTimeout(() => {
      setPhase('leaving')
      document.body.style.overflow = ''
      window.dispatchEvent(new CustomEvent('kestrel:revealed'))
    }, 1100)

    const doneTimer = setTimeout(() => {
      setPhase('done')
      try {
        sessionStorage.setItem('loaded', 'true')
      } catch (e) {}
    }, 1450)

    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [shouldReduceMotion])

  if (phase === 'done') return null

  const isLeaving = phase === 'leaving'

  return (
    <div
      id="kestrel-loader"
      role="status"
      aria-label="Loading Kestrel"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none"
      style={{
        backgroundColor: 'var(--bg)',
        transform: isLeaving ? 'translateY(-100%)' : 'translateY(0%)',
        transition: shouldReduceMotion
          ? 'opacity 0.2s ease'
          : 'transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)',
        opacity: shouldReduceMotion && isLeaving ? 0 : 1
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          {/* Logo mark: scales and fades in at center (0 to 0.3s) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/25"
          >
            <Command className="w-5 h-5" />
          </motion.div>

          {/* Wordmark "Kestrel": letters rising in with 30ms stagger (0.2 to 0.7s) */}
          <div className="flex items-center overflow-hidden">
            {'Kestrel'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.3,
                        delay: 0.2 + i * 0.03,
                        ease: 'easeOut'
                      }
                }
                className="font-bold tracking-tight text-2xl text-fg inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Thin progress line under logo: fills 0 to 100% (0 to 1.1s) */}
        <div className="mt-5 w-48 h-0.5 rounded-full bg-line overflow-hidden">
          <motion.div
            initial={shouldReduceMotion ? { width: '100%' } : { width: '0%' }}
            animate={{ width: '100%' }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 1.1, ease: 'easeInOut' }
            }
            className="h-full bg-accent rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
