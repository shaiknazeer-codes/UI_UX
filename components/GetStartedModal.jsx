'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ArrowRight, Mail, Sparkles, Command } from 'lucide-react'

export default function GetStartedModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const modalRef = useRef(null)
  const inputRef = useRef(null)

  // Background scroll lock and focus management
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus initial input
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Focus trap & Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [isOpen, onClose])

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setError('')
      setIsSubmitted(false)
    }
  }, [isOpen])

  const validateEmail = (val) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(val).toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please provide an email address.')
      return
    }
    if (!validateEmail(email.trim())) {
      setError('Please enter a valid work email address.')
      return
    }

    setError('')
    setIsSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-md rounded-3xl border border-line bg-card p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-fg hover:bg-bg-muted transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="w-10 h-10 rounded-2xl bg-accent-subtle text-accent flex items-center justify-center mb-4">
                  <Command className="w-5 h-5" />
                </div>

                <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-fg">
                  Get started with Kestrel
                </h3>

                <p id="modal-desc" className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                  Join 14,000+ engineers planning, building, and shipping with pure keyboard velocity. Start your 14-day free trial.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label htmlFor="user-email" className="block text-xs font-semibold text-fg uppercase tracking-wider mb-1.5">
                      Work Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        ref={inputRef}
                        id="user-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError('')
                        }}
                        placeholder="you@company.com"
                        aria-invalid={Boolean(error)}
                        aria-errormessage="email-error"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-fg bg-bg placeholder:text-muted focus:outline-hidden transition-all ${
                          error
                            ? 'border-red-500 ring-2 ring-red-500/20'
                            : 'border-line focus:border-accent focus:ring-2 focus:ring-accent/20'
                        }`}
                      />
                    </div>
                    {error && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-500 font-medium">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span>Claim 14-day free trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-line text-center">
                  <p className="text-[11px] text-muted">
                    No credit card required • Instant workspace setup • ⌘K pre-configured
                  </p>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-4 space-y-4 animate-in fade-in duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-fg">
                  Check your inbox!
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  We sent a magic invitation link to <strong className="text-fg font-medium">{email}</strong>.
                  Click the link to activate your workspace and start chording.
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 px-4 rounded-xl bg-bg-muted hover:bg-line text-fg font-medium text-sm cursor-pointer transition-colors"
                  >
                    Close window
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
