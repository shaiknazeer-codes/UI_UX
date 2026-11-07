'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Percentage-based waypoints inside the relative hero demo container
export const WAYPOINTS = [
  { x: '42%', y: '26%', rowIndex: -1, pause: 800 }, // Filter chips area
  { x: '52%', y: '46%', rowIndex: 0, pause: 850 },  // First command palette row
  { x: '68%', y: '62%', rowIndex: 1, pause: 750 },  // Second command palette row
  { x: '36%', y: '78%', rowIndex: 2, pause: 900 },  // Third command palette row
  { x: '82%', y: '38%', rowIndex: -1, pause: 700 }  // Action shortcut hint area
]

export default function TeammateCursor({ onHoverRow }) {
  const shouldReduceMotion = useReducedMotion()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isRippling, setIsRippling] = useState(false)

  useEffect(() => {
    // If user prefers reduced motion, remain static at first waypoint with no loop or ripple
    if (shouldReduceMotion) {
      if (onHoverRow) onHoverRow(-1)
      return
    }

    let isMounted = true
    let rippleTimeout
    let nextStepTimeout

    const activeWaypoint = WAYPOINTS[currentIdx]

    // Glide duration is ~1.1s, then trigger ripple and active row state
    const glideDuration = 1100

    const arrivalTimer = setTimeout(() => {
      if (!isMounted) return

      // Show click ripple and activate UI row
      setIsRippling(true)
      if (onHoverRow) onHoverRow(activeWaypoint.rowIndex)

      // Hide ripple after 450ms
      rippleTimeout = setTimeout(() => {
        if (isMounted) setIsRippling(false)
      }, 450)

      // Pause at waypoint (600 - 900ms) before advancing to next
      nextStepTimeout = setTimeout(() => {
        if (!isMounted) return
        if (onHoverRow) onHoverRow(-1)
        setCurrentIdx((prev) => (prev + 1) % WAYPOINTS.length)
      }, activeWaypoint.pause)
    }, glideDuration)

    return () => {
      isMounted = false
      clearTimeout(arrivalTimer)
      clearTimeout(rippleTimeout)
      clearTimeout(nextStepTimeout)
    }
  }, [currentIdx, shouldReduceMotion, onHoverRow])

  const targetWaypoint = shouldReduceMotion ? WAYPOINTS[0] : WAYPOINTS[currentIdx]

  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute inset-0 pointer-events-none z-30 select-none overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0"
        initial={false}
        animate={{
          x: targetWaypoint.x,
          y: targetWaypoint.y
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 1.1,
                ease: [0.25, 1, 0.5, 1] // Smooth bezier glide
              }
        }
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        <div className="relative flex items-center">
          {/* Classic Arrow Pointer SVG with soft drop shadow */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] shrink-0"
          >
            <path
              d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
              fill="var(--cursor-svg, #3b82f6)"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Name Pill Tag */}
          <div
            className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide text-white shadow-md flex items-center leading-none"
            style={{
              backgroundColor: 'var(--cursor-blue, #2563eb)'
            }}
          >
            Maya
          </div>

          {/* Click Ripple Effect */}
          {isRippling && !shouldReduceMotion && (
            <motion.span
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full border-2 pointer-events-none"
              style={{
                borderColor: 'var(--cursor-svg, #3b82f6)'
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}
