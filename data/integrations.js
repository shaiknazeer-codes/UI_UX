export const integrationCategories = ['All', 'Productivity', 'Engineering', 'Design']

export const integrations = [
  {
    id: 'github',
    name: 'GitHub Enterprise',
    category: 'Engineering',
    desc: 'Sync PR reviews, commits, branch states, and issue cross-references.',
    status: 'Verified',
    speed: '< 30ms sync',
    icon: 'GitPullRequest',
    popular: true
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    desc: 'Inspect design tokens, frame previews, and layer comments directly in tickets.',
    status: 'Verified',
    speed: 'Real-time',
    icon: 'Figma',
    popular: true
  },
  {
    id: 'linear',
    name: 'Linear Sync',
    category: 'Productivity',
    desc: 'Two-way synchronization for teams migrating gradually to Kestrel.',
    status: 'Verified',
    speed: '< 50ms sync',
    icon: 'Workflow',
    popular: true
  },
  {
    id: 'slack',
    name: 'Slack Connect',
    category: 'Productivity',
    desc: 'Interactive notifications, thread updates, and slash commands inside channels.',
    status: 'Verified',
    speed: 'Instant webhook',
    icon: 'MessageSquare',
    popular: false
  },
  {
    id: 'gitlab',
    name: 'GitLab CI/CD',
    category: 'Engineering',
    desc: 'Trigger deployment pipelines, monitor runner health, and review merge requests.',
    status: 'Community',
    speed: 'Pipeline polling',
    icon: 'Terminal',
    popular: false
  },
  {
    id: 'notion',
    name: 'Notion Sync',
    category: 'Productivity',
    desc: 'Embed live roadmap timeline views and synced spec blocks in your team wiki.',
    status: 'Verified',
    speed: '< 100ms sync',
    icon: 'FileText',
    popular: false
  },
  {
    id: 'sentry',
    name: 'Sentry Telemetry',
    category: 'Engineering',
    desc: 'Auto-convert unhandled exception bursts into prioritized triage tickets.',
    status: 'Verified',
    speed: 'Real-time alerts',
    icon: 'AlertTriangle',
    popular: true
  },
  {
    id: 'datadog',
    name: 'Datadog Monitors',
    category: 'Engineering',
    desc: 'Correlate APM anomaly spikes with recent production deployment canaries.',
    status: 'Verified',
    speed: 'Live metrics',
    icon: 'Activity',
    popular: false
  },
  {
    id: 'miro',
    name: 'Miro Board Mesh',
    category: 'Design',
    desc: 'Turn whiteboard stickies and user journey nodes into structured backlog items.',
    status: 'Community',
    speed: 'Batch sync',
    icon: 'Layers',
    popular: false
  },
  {
    id: 'raycast',
    name: 'Raycast Extension',
    category: 'Productivity',
    desc: 'Global macOS command bar extension to capture Kestrel tasks from anywhere.',
    status: 'Verified',
    speed: 'Local IPC',
    icon: 'Command',
    popular: true
  },
  {
    id: 'rive',
    name: 'Rive Graphics',
    category: 'Design',
    desc: 'Preview interactive vector animation state machines directly in issue tickets.',
    status: 'Community',
    speed: 'Asset preview',
    icon: 'Sparkles',
    popular: false
  },
  {
    id: 'docker',
    name: 'Docker Engine',
    category: 'Engineering',
    desc: 'Spin up ephemeral preview environments for every pull request automatically.',
    status: 'Verified',
    speed: 'Container orchestration',
    icon: 'Box',
    popular: false
  }
]
