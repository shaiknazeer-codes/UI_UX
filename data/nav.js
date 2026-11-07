export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Workflows', href: '#workflows' },
  { label: 'Keyboard', href: '#keyboard' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Changelog', href: '#changelog' },
  { label: 'Pricing', href: '#pricing' }
]

export const productDropdownItems = [
  {
    title: 'Command Center',
    desc: 'Unified ⌘K engine for cross-tool orchestration',
    href: '#hero-demo',
    hotkey: '⌘K',
    tag: 'Core',
    icon: 'Command',
    theme: {
      hoverBg: 'hover:bg-indigo-500/10',
      activeBg: 'bg-indigo-500/15',
      hoverBorder: 'hover:border-indigo-500/30',
      titleColor: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
      iconBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white',
      tagColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
      kbdColor: 'group-hover:border-indigo-500/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
    }
  },
  {
    title: 'Workflow Engine',
    desc: 'Plan, build, and ship cycles with zero friction',
    href: '#workflows',
    hotkey: '⌘W',
    tag: 'Popular',
    icon: 'Workflow',
    theme: {
      hoverBg: 'hover:bg-purple-500/10',
      activeBg: 'bg-purple-500/15',
      hoverBorder: 'hover:border-purple-500/30',
      titleColor: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
      iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
      tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      kbdColor: 'group-hover:border-purple-500/40 group-hover:text-purple-600 dark:group-hover:text-purple-400'
    }
  },
  {
    title: 'Keyboard Matrix',
    desc: 'Muscle-memory bindings for every action',
    href: '#keyboard',
    hotkey: '⌥K',
    tag: 'New',
    icon: 'Keyboard',
    theme: {
      hoverBg: 'hover:bg-amber-500/10',
      activeBg: 'bg-amber-500/15',
      hoverBorder: 'hover:border-amber-500/30',
      titleColor: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
      iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
      tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      kbdColor: 'group-hover:border-amber-500/40 group-hover:text-amber-600 dark:group-hover:text-amber-400'
    }
  },
  {
    title: 'Integration Mesh',
    desc: 'Deep bi-directional sync with Git & Figma',
    href: '#integrations',
    hotkey: '⇧I',
    tag: 'Sync',
    icon: 'Layers',
    theme: {
      hoverBg: 'hover:bg-emerald-500/10',
      activeBg: 'bg-emerald-500/15',
      hoverBorder: 'hover:border-emerald-500/30',
      titleColor: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
      iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      kbdColor: 'group-hover:border-emerald-500/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
    }
  }
]

export const socialProof = {
  stat: '14,000+ engineering teams build faster with Kestrel',
  companies: [
    { name: 'Vesper Labs', symbol: 'VESPER' },
    { name: 'Hyperion AI', symbol: 'HYPERION' },
    { name: 'LayerZero Ops', symbol: 'LAYER//ZERO' },
    { name: 'Monolith Cloud', symbol: 'MONOLITH' },
    { name: 'Chronos DB', symbol: 'CHRONOS' },
    { name: 'Prism Security', symbol: 'PRISM' }
  ]
}

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Command Center', href: '#hero-demo' },
      { label: 'Workflow Tabs', href: '#workflows' },
      { label: 'Keyboard Matrix', href: '#keyboard' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'Pricing Plans', href: '#pricing' },
      { label: 'Changelog', href: '#changelog' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Keyboard Cheat Sheet', href: '#keyboard' },
      { label: 'CLI Reference', href: '#hero-demo' },
      { label: 'API Documentation', href: '#integrations' },
      { label: 'Community Discord', href: '#pricing' },
      { label: 'System Architecture', href: '#workflows' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Kestrel', href: '#hero' },
      { label: 'Engineering Blog', href: '#changelog' },
      { label: 'Customer Stories', href: '#testimonials' },
      { label: 'Careers (We\'re hiring)', href: '#footer' },
      { label: 'Brand Assets', href: '#footer' }
    ]
  },
  {
    title: 'Legal & Security',
    links: [
      { label: 'Privacy Policy', href: '#footer' },
      { label: 'Terms of Service', href: '#footer' },
      { label: 'Security Whitepaper', href: '#footer' },
      { label: 'SOC2 Type II Report', href: '#footer' },
      { label: 'GDPR Compliance', href: '#footer' }
    ]
  }
]
