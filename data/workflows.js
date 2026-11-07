export const workflowTabs = [
  { id: 'plan', label: 'Plan', hotkey: '1', subtitle: 'Backlog & sprints without mouse friction' },
  { id: 'build', label: 'Build', hotkey: '2', subtitle: 'Roadmap tracks & dependency graphs' },
  { id: 'ship', label: 'Ship', hotkey: '3', subtitle: 'Code review, release notes & canaries' }
]

export const planData = {
  activeSprint: 'Sprint 34 — Edge Protocol',
  velocity: '94% completed',
  daysRemaining: '3 days left',
  issues: [
    {
      id: 'KES-104',
      title: 'Optimize memory allocation in WASM state machine',
      status: 'In Progress',
      priority: 'Urgent',
      assignee: 'AK',
      assigneeName: 'Alex Kim',
      estimate: '5 pts',
      tag: 'Performance'
    },
    {
      id: 'KES-108',
      title: 'Add biometric auth fallback for macOS Touch ID',
      status: 'In Review',
      priority: 'High',
      assignee: 'SL',
      assigneeName: 'Sarah Lin',
      estimate: '3 pts',
      tag: 'Security'
    },
    {
      id: 'KES-112',
      title: 'Implement delta sync protocol over WebSocket channels',
      status: 'Todo',
      priority: 'High',
      assignee: 'MC',
      assigneeName: 'Marcus Chen',
      estimate: '8 pts',
      tag: 'Network'
    },
    {
      id: 'KES-115',
      title: 'Support custom keyboard layouts (Dvorak, Colemak)',
      status: 'Todo',
      priority: 'Medium',
      assignee: 'ER',
      assigneeName: 'Elena Rostova',
      estimate: '2 pts',
      tag: 'Settings'
    },
    {
      id: 'KES-099',
      title: 'Migrate notification pipeline to ephemeral redis stream',
      status: 'Done',
      priority: 'Medium',
      assignee: 'AK',
      assigneeName: 'Alex Kim',
      estimate: '5 pts',
      tag: 'Infrastructure'
    }
  ]
}

export const buildData = {
  activeQuarter: 'Q3 Product Milestones',
  totalProgress: 68,
  tracks: [
    {
      name: 'Core Engine v2.0',
      owner: 'Runtime Team',
      progress: 82,
      status: 'On Track',
      color: 'bg-emerald-500',
      milestones: ['AST Parser (Done)', 'WASM Sharding (Done)', 'Memory Pools (Review)', 'Fuzz Testing (Pending)']
    },
    {
      name: 'Global Edge Sync Mesh',
      owner: 'Infra Team',
      progress: 64,
      status: 'On Track',
      color: 'bg-indigo-500',
      milestones: ['TLS Handshake (Done)', 'Conflict Resolution (Active)', 'Regional Gateways (Queued)']
    },
    {
      name: 'Keyboard Orchestration Engine',
      owner: 'UI/UX Team',
      progress: 90,
      status: 'Ahead',
      color: 'bg-purple-500',
      milestones: ['Keycap Map (Done)', 'Chording Engine (Done)', 'Macro Recorder (Active)']
    },
    {
      name: 'Figma & GitHub Two-Way Pipeline',
      owner: 'Integrations Team',
      progress: 45,
      status: 'At Risk',
      color: 'bg-amber-500',
      milestones: ['Webhook Ingestion (Done)', 'Schema Alignment (Active)', 'Rate Limiting (Blocked)']
    }
  ]
}

export const shipData = {
  pullRequest: {
    number: '#349',
    branch: 'release/v2.4.0',
    target: 'main',
    title: 'feat: zero-latency keyboard multiplexer',
    author: 'alex-kim',
    ciStatus: 'Passed (18/18 checks)',
    coverage: '+2.4%',
    filesChanged: 4,
    additions: 142,
    deletions: 28
  },
  diffLines: [
    { type: 'context', lineOld: 41, lineNew: 41, text: 'export class KeyboardMultiplexer {' },
    { type: 'context', lineOld: 42, lineNew: 42, text: '  private registry: Map<string, CommandHandler>' },
    { type: 'deletion', lineOld: 43, lineNew: null, text: '-  private buffer: Array<KeyEvent> = []' },
    { type: 'addition', lineOld: null, lineNew: 43, text: '+  private buffer: RingBuffer<KeyEvent> = new RingBuffer(64)' },
    { type: 'addition', lineOld: null, lineNew: 44, text: '+  private chords: TrieNode = new TrieNode()' },
    { type: 'context', lineOld: 44, lineNew: 45, text: '  ' },
    { type: 'deletion', lineOld: 45, lineNew: null, text: '-  public dispatch(event: KeyboardEvent): boolean {' },
    { type: 'addition', lineOld: null, lineNew: 46, text: '+  public dispatch(event: KeyboardEvent): DispatchResult {' },
    { type: 'addition', lineOld: null, lineNew: 47, text: '+    if (event.defaultPrevented) return DispatchResult.Skipped' },
    { type: 'context', lineOld: 46, lineNew: 48, text: '    const key = normalizeKey(event.code)' }
  ],
  checks: [
    { name: 'Unit & Snapshot Tests', status: 'Passed', time: '42s' },
    { name: 'Edge Worker Bundle Check', status: 'Passed', time: '18s' },
    { name: 'End-to-End Cypress Suite', status: 'Passed', time: '1m 12s' },
    { name: 'Vulnerability Scan (Snyk)', status: 'Passed', time: '9s' }
  ]
}

