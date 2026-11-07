'use client'

import { useState, useEffect, useRef } from 'react'
import { navLinks, productDropdownItems } from '@/data/nav'
import {
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  Command,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export default function Navbar({ onOpenModal }) {
  const [isDark, setIsDark] = useState(false)
  const [isProductOpen, setIsProductOpen] = useState(false)
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(-1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const dropdownRef = useRef(null)
  const dropdownItemsRef = useRef([])

  useEffect(() => {
    // Check initial theme
    const isDarkTheme = document.documentElement.classList.contains('dark')
    setIsDark(isDarkTheme)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProductOpen(false)
        setActiveDropdownIndex(-1)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('kestrel-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('kestrel-theme', 'light')
    }
  }

  const handleDropdownKeyDown = (e) => {
    if (!isProductOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsProductOpen(true)
        setActiveDropdownIndex(0)
      }
      return
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      setIsProductOpen(false)
      setActiveDropdownIndex(-1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveDropdownIndex((prev) => (prev + 1) % productDropdownItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveDropdownIndex((prev) => (prev - 1 + productDropdownItems.length) % productDropdownItems.length)
    } else if (e.key === 'Enter' && activeDropdownIndex >= 0) {
      e.preventDefault()
      const target = productDropdownItems[activeDropdownIndex]
      if (target) {
        setIsProductOpen(false)
        const el = document.querySelector(target.href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    if (isProductOpen && activeDropdownIndex >= 0 && dropdownItemsRef.current[activeDropdownIndex]) {
      dropdownItemsRef.current[activeDropdownIndex].focus()
    }
  }, [activeDropdownIndex, isProductOpen])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-bg/85 backdrop-blur-md border-line shadow-xs'
          : 'bg-bg/40 backdrop-blur-xs border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1 py-0.5"
          aria-label="Kestrel home"
        >
          <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-bold shadow-xs shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Command className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-tight text-lg text-fg flex items-center gap-1.5">
            Kestrel
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-accent-subtle text-accent font-semibold tracking-wider">
              v2.4
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium" aria-label="Main navigation">
          {/* Product Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsProductOpen((prev) => !prev)}
              onKeyDown={handleDropdownKeyDown}
              aria-expanded={isProductOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-muted hover:text-fg hover:bg-bg-muted transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Product</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isProductOpen ? 'rotate-180 text-accent' : 'text-muted'
                }`}
              />
            </button>

            {isProductOpen && (
              <div
                role="menu"
                aria-label="Product features"
                className="absolute left-0 mt-2 w-80 rounded-xl bg-card border border-line p-2 shadow-xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {productDropdownItems.map((item, idx) => (
                  <a
                    key={item.title}
                    ref={(el) => (dropdownItemsRef.current[idx] = el)}
                    href={item.href}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => setIsProductOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsProductOpen(false)
                      }
                    }}
                    className={`flex items-start justify-between p-2.5 rounded-lg transition-colors group focus:outline-hidden ${
                      activeDropdownIndex === idx
                        ? 'bg-accent-subtle text-accent'
                        : 'hover:bg-bg-muted text-fg'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-bg-muted text-muted">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                    <kbd className="text-[11px] font-mono px-1.5 py-0.5 rounded-sm bg-bg-muted border border-line text-muted font-semibold ml-2">
                      {item.hotkey}
                    </kbd>
                  </a>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-muted hover:text-fg hover:bg-bg-muted transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg text-muted hover:text-fg hover:bg-bg-muted transition-colors cursor-pointer border border-line/60 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>

          {/* Get Started Button */}
          <button
            type="button"
            onClick={onOpenModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium shadow-xs shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <span>Get started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-lg text-muted hover:text-fg hover:bg-bg-muted border border-line/60"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-muted hover:text-fg hover:bg-bg-muted border border-line/60"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-line bg-card/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <p className="px-3 py-1 text-xs font-semibold uppercase text-muted tracking-wider">
              Product
            </p>
            {productDropdownItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-fg hover:bg-bg-muted"
              >
                <span>{item.title}</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-bg-muted border border-line text-muted">
                  {item.hotkey}
                </kbd>
              </a>
            ))}
          </div>

          <div className="border-t border-line/50 pt-2 space-y-1">
            <p className="px-3 py-1 text-xs font-semibold uppercase text-muted tracking-wider">
              Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-fg hover:bg-bg-muted"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                onOpenModal()
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-accent text-white font-medium text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Get started free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
