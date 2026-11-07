import './globals.css'
import Loader from '@/components/Loader'

export const metadata = {
  title: 'Kestrel — Keyboard-First Command Center for Product Teams',
  description: 'Plan, build, and ship at the speed of thought. The unified keyboard command center for high-velocity product teams.',
  keywords: 'keyboard-first, issue tracker, git sync, command palette, product management, developer tools'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fa' },
    { media: '(prefers-color-scheme: dark)', color: '#090a0f' }
  ]
}

export default function RootLayout({ children }) {
  const themeInitScript = `
    (function() {
      try {
        var stored = localStorage.getItem('kestrel-theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        // Check if intro loader was already shown in this browser session
        if (sessionStorage.getItem('loaded') || sessionStorage.loaded) {
          document.documentElement.classList.add('skip-loader');
        }
      } catch (e) {}
    })();
  `

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg text-fg antialiased selection:bg-accent selection:text-white">
        <Loader />
        {children}
      </body>
    </html>
  )
}

