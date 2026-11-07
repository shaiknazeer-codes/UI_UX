export const heroCommands = [
  {
    id: 'cmd-issue',
    title: 'Create new issue',
    category: 'Actions',
    shortcut: 'C',
    icon: 'PlusCircle',
    badge: 'Fast',
    actionText: 'Created issue KES-482 "Refactor telemetry pipeline"'
  },
  {
    id: 'cmd-pr',
    title: 'Review pull request #284',
    category: 'Engineering',
    shortcut: '⌘R',
    icon: 'GitPullRequest',
    badge: 'Pending',
    actionText: 'Opened review for PR #284 "feat: edge-cache worker"'
  },
  {
    id: 'cmd-deploy',
    title: 'Promote release v2.4.0 to production',
    category: 'Ship',
    shortcut: '⌘D',
    icon: 'Rocket',
    badge: 'Staging ready',
    actionText: 'Triggered canary rollout for v2.4.0 to us-east'
  },
  {
    id: 'cmd-branch',
    title: 'Switch git branch',
    category: 'Engineering',
    shortcut: 'B',
    icon: 'GitBranch',
    badge: 'main',
    actionText: 'Switched local working branch to feature/perf-allocator'
  },
  {
    id: 'cmd-sync',
    title: 'Sync Linear issues with GitHub milestones',
    category: 'Sync',
    shortcut: 'S',
    icon: 'RefreshCw',
    badge: 'Auto',
    actionText: 'Synchronized 38 issues across 2 milestones'
  },
  {
    id: 'cmd-roadmap',
    title: 'Open Q3 Roadmap Timeline',
    category: 'Navigation',
    shortcut: 'G R',
    icon: 'Calendar',
    badge: 'View',
    actionText: 'Navigated to Q3 Roadmap Board'
  },
  {
    id: 'cmd-theme',
    title: 'Toggle theme display',
    category: 'Preferences',
    shortcut: 'T',
    icon: 'SunMoon',
    badge: 'System',
    actionText: 'Switched visual color mode'
  }
]
