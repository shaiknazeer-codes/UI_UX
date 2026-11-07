'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// SVG feTurbulence noise texture as data URI for overall depth
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
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Layer 1: Ambient Radial Center Glow */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] md:w-[1250px] h-[360px] sm:h-[460px] md:h-[560px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, var(--glow) 0%, transparent 70%)'
        }}
      />

      {/* Layer 2: Raycast-inspired 3D Diagonal Louvre Slats Assembly */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{
          x: shouldReduceMotion ? 0 : springX,
          y: shouldReduceMotion ? 0 : springY,
          transform: 'translateZ(0)'
        }}
      >
        <svg
          className="w-full h-full min-w-[950px] max-w-[1450px] object-cover pointer-events-none"
          viewBox="0 0 1200 750"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Stipple Dissolve Filter: Displaces gradient falloffs into fine spray/grain stipples */}
            <filter
              id="slat-stipple-dissolve"
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
              filterUnits="userSpaceOnUse"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.72"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="24"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
            </filter>

            {/* 3D Louvre Edge Bevel Gradient (Light Edge Highlight) */}
            <linearGradient id="slat-bevel-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
              <stop offset="12%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="85%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.38" />
            </linearGradient>

            <linearGradient id="slat-bevel-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="15%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#312e81" stopOpacity="0" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.12" />
            </linearGradient>

            {/* Dark Theme Longitudinal Gradients (Vibrant Electric Indigo / Violet) */}
            <linearGradient id="slat-dark-center" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0" />
              <stop offset="8%" stopColor="#4338ca" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#6366f1" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#a5b4fc" stopOpacity="1" />
              <stop offset="75%" stopColor="#6366f1" stopOpacity="0.9" />
              <stop offset="92%" stopColor="#4338ca" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="slat-dark-mid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0" />
              <stop offset="10%" stopColor="#3730a3" stopOpacity="0.25" />
              <stop offset="28%" stopColor="#4f46e5" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.95" />
              <stop offset="72%" stopColor="#4f46e5" stopOpacity="0.85" />
              <stop offset="90%" stopColor="#3730a3" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="slat-dark-outer" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
              <stop offset="15%" stopColor="#312e81" stopOpacity="0.2" />
              <stop offset="35%" stopColor="#4338ca" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#4338ca" stopOpacity="0.65" />
              <stop offset="85%" stopColor="#312e81" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </linearGradient>

            {/* Light Theme Longitudinal Gradients (Frosted Glass Indigo Tints) */}
            <linearGradient id="slat-light-center" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0" />
              <stop offset="10%" stopColor="#a5b4fc" stopOpacity="0.25" />
              <stop offset="28%" stopColor="#818cf8" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.7" />
              <stop offset="72%" stopColor="#818cf8" stopOpacity="0.55" />
              <stop offset="90%" stopColor="#a5b4fc" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="slat-light-mid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0" />
              <stop offset="12%" stopColor="#c7d2fe" stopOpacity="0.2" />
              <stop offset="32%" stopColor="#818cf8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="68%" stopColor="#818cf8" stopOpacity="0.45" />
              <stop offset="88%" stopColor="#c7d2fe" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="slat-light-outer" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0" />
              <stop offset="18%" stopColor="#c7d2fe" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#818cf8" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#818cf8" stopOpacity="0.35" />
              <stop offset="82%" stopColor="#c7d2fe" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0" />
            </linearGradient>

            {/* Seamless Bottom Fade Gradient */}
            <linearGradient id="bottom-fade-mask" x1="0%" y1="0%" x2="0%" y2="100%">
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

          {/* Rotated Louvre Slats Assembly (-35 deg, pivot centered at 600, 360) */}
          <g
            transform="translate(600, 360) rotate(-35) translate(-600, -360)"
            filter="url(#slat-stipple-dissolve)"
          >
            {/* Flank accent sliver left */}
            <rect
              x="300"
              y="240"
              width="14"
              height="280"
              rx="6"
              className="slat-outer"
              opacity="0.35"
            />

            {/* Slat 1 (Far Left) */}
            <g transform="translate(350, 160)">
              <rect x="0" y="0" width="56" height="420" rx="14" className="slat-outer" />
              <rect x="0" y="0" width="56" height="420" rx="14" className="slat-bevel" />
            </g>

            {/* Slat 2 (Mid-Left) */}
            <g transform="translate(435, 90)">
              <rect x="0" y="0" width="74" height="560" rx="18" className="slat-mid" />
              <rect x="0" y="0" width="74" height="560" rx="18" className="slat-bevel" />
            </g>

            {/* Slat 3 (Inner-Left Core) */}
            <g transform="translate(535, 30)">
              <rect x="0" y="0" width="88" height="660" rx="22" className="slat-center" />
              <rect x="0" y="0" width="88" height="660" rx="22" className="slat-bevel" />
            </g>

            {/* Slat 4 (Center Spine Main) */}
            <g transform="translate(650, 10)">
              <rect x="0" y="0" width="94" height="700" rx="24" className="slat-center" />
              <rect x="0" y="0" width="94" height="700" rx="24" className="slat-bevel" />
            </g>

            {/* Slat 5 (Inner-Right Core) */}
            <g transform="translate(770, 45)">
              <rect x="0" y="0" width="86" height="640" rx="22" className="slat-center" />
              <rect x="0" y="0" width="86" height="640" rx="22" className="slat-bevel" />
            </g>

            {/* Slat 6 (Mid-Right) */}
            <g transform="translate(880, 110)">
              <rect x="0" y="0" width="72" height="520" rx="18" className="slat-mid" />
              <rect x="0" y="0" width="72" height="520" rx="18" className="slat-bevel" />
            </g>

            {/* Slat 7 (Far Right) */}
            <g transform="translate(975, 180)">
              <rect x="0" y="0" width="52" height="380" rx="14" className="slat-outer" />
              <rect x="0" y="0" width="52" height="380" rx="14" className="slat-bevel" />
            </g>

            {/* Flank accent sliver right */}
            <rect
              x="1050"
              y="250"
              width="14"
              height="260"
              rx="6"
              className="slat-outer"
              opacity="0.35"
            />
          </g>

          {/* Bottom Fade: Blends seamlessly into next section */}
          <rect x="0" y="580" width="1200" height="170" fill="url(#bottom-fade-mask)" />
        </svg>
      </motion.div>

      {/* Layer 3: Film Grain Overlay for Anti-Banding and Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: 'repeat',
          opacity: 'var(--grain)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Layer 4: Linear Bottom Blend */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/5 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)'
        }}
      />
    </div>
  )
}
