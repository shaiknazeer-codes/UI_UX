export const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Free forever',
    description: 'Essential command palette & issue management for solo founders and small pairs.',
    priceMonthly: 0,
    priceYearly: 0,
    highlighted: false,
    cta: 'Get started free',
    features: [
      'Up to 5 active team members',
      'Unified ⌘K command center',
      'Standard GitHub & Figma sync',
      'Offline-first local WASM store',
      'Community Discord support',
      '7-day activity telemetry'
    ],
    hint: 'No credit card required'
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Most Popular',
    description: 'Complete keyboard command engine with unlimited cycles, roadmap tracks, and telemetry.',
    priceMonthly: 18,
    priceYearly: 14,
    highlighted: true,
    cta: 'Start 14-day free trial',
    features: [
      'Unlimited workspace members',
      'Multiplayer cursor & staging locks',
      'Sub-8ms keyboard chording engine',
      'Full Plan / Build / Ship workflow suite',
      'Bi-directional GitHub, Figma & Slack sync',
      '90-day cycle time analytics',
      'Priority email & chat support'
    ],
    hint: '14 days free • Cancel anytime'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Scale & Security',
    description: 'Custom governance, dedicated edge nodes, SAML SSO, and compliance automation.',
    priceMonthly: 45,
    priceYearly: 36,
    highlighted: false,
    cta: 'Contact enterprise sales',
    features: [
      'Everything in Pro with unlimited history',
      'SAML 2.0 / Okta SSO & SCIM provisioning',
      'Dedicated regional edge worker mesh',
      'SOC2 Type II & HIPAA compliance packages',
      'Custom webhook rate limit overrides',
      '99.99% uptime SLA guarantee',
      'Dedicated Customer Success Architect'
    ],
    hint: 'Custom contracts & invoicing'
  }
]
