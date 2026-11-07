'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// SVG feTurbulence noise texture as data URI
const NOISE_SVG = `data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>`

export default function HeroBackground() {
  const shouldReduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for subtle, jitter-free cursor parallax
  const springConfig = { damping: 26, stiffness: 80, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Parallax interaction: shifts the diagonal louvre slats up to 14px opposite mouse position
  useEffect(() => {
    if (shouldReduceMotion) return

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mediaQuery.matches) return

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      if (!innerWidth || !innerHeight) return
      const nx = (e.clientX / innerWidth - 0.5) * 2
      const ny = (e.clientY / innerHeight - 0.5) * 2
      mouseX.set(-nx * 14)
      mouseY.set(-ny * 14)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [shouldReduceMotion, mouseX, mouseY])

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 right-0 h-[780px] overflow-hidden pointer-events-none select-none -z-10"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Ambient Center Glow directly behind headline */}
      <div
        className="absolute top-[280px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[960px] md:w-[1200px] h-[360px] sm:h-[460px] md:h-[540px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, var(--glow) 0%, transparent 70%)'
        }}
      />

      {/* Raycast-style 3D Diagonal Louvre Slats Assembly */}
      <motion.div
        className="absolute inset-0 flex items-start justify-center pointer-events-none overflow-hidden"
        style={{
          x: shouldReduceMotion ? 0 : springX,
          y: shouldReduceMotion ? 0 : springY,
          transform: 'translateZ(0)'
        }}
      >
        <svg
          className="w-full h-[780px] min-w-[950px] max-w-[1450px] object-cover pointer-events-none"
          viewBox="0 0 1200 750"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Stipple Dissolve Filter: Displaces gradient falloffs into fine spray/grain stipples */}
            <filter
              id="slat-stipple-dissolve"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="26"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
            </filter>

            {/* 3D Louvre Edge Bevel Gradient (Light Edge Highlight) */}
            <linearGradient id="slat-bevel-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="12%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="85%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient id="slat-bevel-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="15%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#4c0519" stopOpacity="0" />
              <stop offset="100%" stopColor="#2a0812" stopOpacity="0.12" />
            </linearGradient>

            {/* Dark Theme Longitudinal Gradients (Fiery Crimson / Ruby Red) */}
            <linearGradient id="slat-dark-center" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4c0519" stopOpacity="0" />
              <stop offset="8%" stopColor="#9f1239" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#e11d48" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#fda4af" stopOpacity="1" />
              <stop offset="75%" stopColor="#e11d48" stopOpacity="0.95" />
              <stop offset="92%" stopColor="#9f1239" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4c0519" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="slat-dark-mid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4c0519" stopOpacity="0" />
              <stop offset="10%" stopColor="#881337" stopOpacity="0.25" />
              <stop offset="28%" stopColor="#be123c" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#fb7185" stopOpacity="0.95" />
              <stop offset="72%" stopColor="#be123c" stopOpacity="0.9" />
              <stop offset="90%" stopColor="#881337" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4c0519" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="slat-dark-outer" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a0812" stopOpacity="0" />
              <stop offset="15%" stopColor="#4c0519" stopOpacity="0.2" />
              <stop offset="35%" stopColor="#9f1239" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#e11d48" stopOpacity="0.8" />
              <stop offset="65%" stopColor="#9f1239" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#4c0519" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2a0812" stopOpacity="0" />
            </linearGradient>

            {/* Light Theme Longitudinal Gradients (Frosted Rose / Coral Tints) */}
            <linearGradient id="slat-light-center" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffe4e6" stopOpacity="0" />
              <stop offset="10%" stopColor="#fecdd3" stopOpacity="0.25" />
              <stop offset="28%" stopColor="#fb7185" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#e11d48" stopOpacity="0.7" />
              <stop offset="72%" stopColor="#fb7185" stopOpacity="0.55" />
              <stop offset="90%" stopColor="#fecdd3" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="slat-light-mid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff1f2" stopOpacity="0" />
              <stop offset="12%" stopColor="#fecdd3" stopOpacity="0.2" />
              <stop offset="32%" stopColor="#fb7185" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#e11d48" stopOpacity="0.6" />
              <stop offset="68%" stopColor="#fb7185" stopOpacity="0.45" />
              <stop offset="88%" stopColor="#fecdd3" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#fff1f2" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="slat-light-outer" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8f9fa" stopOpacity="0" />
              <stop offset="18%" stopColor="#fecdd3" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#fb7185" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#e11d48" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#fb7185" stopOpacity="0.35" />
              <stop offset="82%" stopColor="#fecdd3" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f8f9fa" stopOpacity="0" />
            </linearGradient>

            {/* Seamless Bottom Fade Gradient */}
            <linearGradient id="slat-fade-out" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--bg)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--bg)" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Theme Slat Styles */}
          <style>{`
            .slat-center { fill: url(#slat-light-center); }
            .slat-mid { fill: url(#slat-light-mid); }
            .slat-outer { fill: url(#slat-light-outer); }
            .slat-bevel { fill: url(#slat-bevel-light); }

            .dark .slat-center { fill: url(#slat-dark-center); }
            .dark .slat-mid { fill: url(#slat-dark-mid); }
            .dark .slat-outer { fill: url(#slat-dark-outer); }
            .dark .slat-bevel { fill: url(#slat-bevel-dark); }
          `}</style>

          {/* Rotated Louvre Slats Assembly (-35 deg, pivot centered at 600, 270 directly behind headline) */}
          <g
            transform="translate(600, 270) rotate(-35) translate(-600, -270)"
            filter="url(#slat-stipple-dissolve)"
          >
            {/* Flank accent sliver left */}
            <rect
              x="290"
              y="150"
              width="14"
              height="280"
              rx="6"
              className="slat-outer"
              opacity="0.4"
            />

            {/* Slat 1 (Far Left) */}
            <g transform="translate(340, 70)">
              <rect x="0" y="0" width="56" height="440" rx="14" className="slat-outer" />
              <rect x="0" y="0" width="56" height="440" rx="14" className="slat-bevel" />
            </g>

            {/* Slat 2 (Mid-Left) */}
            <g transform="translate(425, 0)">
              <rect x="0" y="0" width="76" height="580" rx="18" className="slat-mid" />
              <rect x="0" y="0" width="76" height="580" rx="18" className="slat-bevel" />
            </g>

            {/* Slat 3 (Inner-Left Core) */}
            <g transform="translate(530, -50)">
              <rect x="0" y="0" width="90" height="680" rx="22" className="slat-center" />
              <rect x="0" y="0" width="90" height="680" rx="22" className="slat-bevel" />
            </g>

            {/* Slat 4 (Center Spine Main) */}
            <g transform="translate(645, -70)">
              <rect x="0" y="0" width="96" height="720" rx="24" className="slat-center" />
              <rect x="0" y="0" width="96" height="720" rx="24" className="slat-bevel" />
            </g>

            {/* Slat 5 (Inner-Right Core) */}
            <g transform="translate(765, -35)">
              <rect x="0" y="0" width="88" height="660" rx="22" className="slat-center" />
              <rect x="0" y="0" width="88" height="660" rx="22" className="slat-bevel" />
            </g>

            {/* Slat 6 (Mid-Right) */}
            <g transform="translate(880, 20)">
              <rect x="0" y="0" width="74" height="540" rx="18" className="slat-mid" />
              <rect x="0" y="0" width="74" height="540" rx="18" className="slat-bevel" />
            </g>

            {/* Slat 7 (Far Right) */}
            <g transform="translate(980, 90)">
              <rect x="0" y="0" width="54" height="400" rx="14" className="slat-outer" />
              <rect x="0" y="0" width="54" height="400" rx="14" className="slat-bevel" />
            </g>

            {/* Flank accent sliver right */}
            <rect
              x="1060"
              y="160"
              width="14"
              height="260"
              rx="6"
              className="slat-outer"
              opacity="0.4"
            />
          </g>

          {/* Fade out toward bottom of hero container */}
          <rect x="0" y="580" width="1200" height="170" fill="url(#slat-fade-out)" />
        </svg>
      </motion.div>

      {/* Film Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: 'repeat',
          opacity: 'var(--grain)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Bottom Fade Gradient into page */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)'
        }}
      />
    </div>
  )
}
