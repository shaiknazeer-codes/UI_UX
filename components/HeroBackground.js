'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// SVG feTurbulence grain noise texture as data URI
const NOISE_SVG = `data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>`

export default function HeroBackground() {
  const shouldReduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Soft, jitter-free spring physics for subtle interactive parallax
  const springConfig = { damping: 28, stiffness: 90, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Parallax interaction: shifts light beams up to 12px opposite mouse position
  useEffect(() => {
    if (shouldReduceMotion) return

    // Fine pointer check: desktop only, disabled on touch devices
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mediaQuery.matches) return

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      if (!innerWidth || !innerHeight) return
      // Normalized coordinates (-1 to 1) from viewport center
      const nx = (e.clientX / innerWidth - 0.5) * 2
      const ny = (e.clientY / innerHeight - 0.5) * 2
      // Shift opposite to mouse position up to 12px
      mouseX.set(-nx * 12)
      mouseY.set(-ny * 12)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [shouldReduceMotion, mouseX, mouseY])

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Layer 2: Diagonal stripes with radial mask fading to edges and bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, var(--stripe) 0px, var(--stripe) 2px, transparent 2px, transparent 30px)',
          maskImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, black 20%, transparent 95%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, black 20%, transparent 95%)'
        }}
      />

      {/* Layer 3: Light beams container with a single GPU-composited blur filter & parallax spring */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          x: shouldReduceMotion ? 0 : springX,
          y: shouldReduceMotion ? 0 : springY,
          filter: 'blur(28px)',
          WebkitFilter: 'blur(28px)',
          transform: 'translateZ(0)'
        }}
      >
        {/* Beam 1: Left drift */}
        <motion.div
          className="absolute -top-[20%] left-[10%] sm:left-[16%] w-20 sm:w-28 md:w-36 h-[140%] pointer-events-none"
          style={{
            transformOrigin: 'top center',
            background:
              'linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--accent) 35%, transparent) 35%, transparent 85%)'
          }}
          initial={{ rotate: -20, opacity: 0.4 }}
          animate={
            shouldReduceMotion
              ? { rotate: -20, opacity: 0.4 }
              : {
                  rotate: -20,
                  x: [-12, 14, -12],
                  y: [-8, 12, -8],
                  opacity: [0.3, 0.65, 0.3]
                }
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
        />

        {/* Beam 2: Center drift */}
        <motion.div
          className="absolute -top-[25%] left-[42%] sm:left-[46%] w-24 sm:w-36 md:w-44 h-[150%] pointer-events-none"
          style={{
            transformOrigin: 'top center',
            background:
              'linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--accent) 35%, transparent) 40%, transparent 90%)'
          }}
          initial={{ rotate: -20, opacity: 0.55 }}
          animate={
            shouldReduceMotion
              ? { rotate: -20, opacity: 0.55 }
              : {
                  rotate: -20,
                  x: [14, -14, 14],
                  y: [10, -10, 10],
                  opacity: [0.4, 0.8, 0.4]
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
        />

        {/* Beam 3: Right drift */}
        <motion.div
          className="absolute -top-[15%] left-[72%] sm:left-[76%] w-16 sm:w-24 md:w-32 h-[135%] pointer-events-none"
          style={{
            transformOrigin: 'top center',
            background:
              'linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--accent) 35%, transparent) 30%, transparent 80%)'
          }}
          initial={{ rotate: -20, opacity: 0.35 }}
          animate={
            shouldReduceMotion
              ? { rotate: -20, opacity: 0.35 }
              : {
                  rotate: -20,
                  x: [-10, 12, -10],
                  y: [6, -8, 6],
                  opacity: [0.25, 0.55, 0.25]
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      {/* Layer 4: Large radial glow ellipse at top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] md:w-[1200px] h-[400px] sm:h-[480px] md:h-[560px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 0%, var(--glow) 0%, transparent 70%)'
        }}
      />

      {/* Layer 5: Grain noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: 'repeat',
          opacity: 'var(--grain)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Layer 6: Bottom fade into var(--bg) over the last 25% of height */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)'
        }}
      />
    </div>
  )
}

