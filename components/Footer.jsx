'use client'

import { footerColumns } from '@/data/nav'
import { Command } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-line bg-card/40 py-16 text-xs text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent text-white flex items-center justify-center font-bold">
                <Command className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-fg text-sm tracking-tight">Kestrel</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Keyboard-first command center for modern product teams. Plan, build, ship.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-semibold text-fg text-xs uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted hover:text-fg transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Kestrel Technologies Inc. All rights reserved.</p>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-bg-muted border border-line text-fg font-medium">
              ⌘K
            </kbd>
            <span>anywhere to launch</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

