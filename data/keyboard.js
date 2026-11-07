export const keyRows = [
  [
    { code: 'Escape', label: 'Esc', width: 'w-10 sm:w-12', action: 'Close modal / Dismiss palette' },
    { code: 'Digit1', label: '1', action: 'Switch to Plan workflow' },
    { code: 'Digit2', label: '2', action: 'Switch to Build workflow' },
    { code: 'Digit3', label: '3', action: 'Switch to Ship workflow' },
    { code: 'Digit4', label: '4', action: 'Set Urgent priority' },
    { code: 'Digit5', label: '5', action: 'Set High priority' },
    { code: 'Digit6', label: '6', action: 'Set Medium priority' },
    { code: 'Digit7', label: '7', action: 'Set Low priority' },
    { code: 'Digit8', label: '8', action: 'Assign sprint estimate' },
    { code: 'Digit9', label: '9', action: 'Toggle cycle telemetry' },
    { code: 'Digit0', label: '0', action: 'Clear filters' },
    { code: 'Backspace', label: '⌫', width: 'w-12 sm:w-16', action: 'Archive selected item' }
  ],
  [
    { code: 'Tab', label: 'Tab', width: 'w-12 sm:w-14', action: 'Cycle focus regions' },
    { code: 'KeyQ', label: 'Q', action: 'Quick search all buffers' },
    { code: 'KeyW', label: 'W', action: 'Close active preview' },
    { code: 'KeyE', label: 'E', action: 'Edit selected issue' },
    { code: 'KeyR', label: 'R', action: 'Review PR & diff checks' },
    { code: 'KeyT', label: 'T', action: 'Toggle light / dark mode' },
    { code: 'KeyY', label: 'Y', action: 'Copy git checkout cmd' },
    { code: 'KeyU', label: 'U', action: 'Assign to current user' },
    { code: 'KeyI', label: 'I', action: 'Inspect issue telemetry' },
    { code: 'KeyO', label: 'O', action: 'Open linked PR in browser' },
    { code: 'KeyP', label: 'P', action: 'Jump to project roadmap' },
    { code: 'BracketLeft', label: '[', action: 'Previous cycle' },
    { code: 'BracketRight', label: ']', action: 'Next cycle' }
  ],
  [
    { code: 'CapsLock', label: 'Caps', width: 'w-14 sm:w-16', action: 'Modifier lock' },
    { code: 'KeyA', label: 'A', action: 'Assign team members' },
    { code: 'KeyS', label: 'S', action: 'Sync bi-directional state' },
    { code: 'KeyD', label: 'D', action: 'Deploy canary release' },
    { code: 'KeyF', label: 'F', action: 'Filter view by tag' },
    { code: 'KeyG', label: 'G', action: 'Go to milestone' },
    { code: 'KeyH', label: 'H', action: 'Navigate cursor left' },
    { code: 'KeyJ', label: 'J', action: 'Move down in list' },
    { code: 'KeyK', label: 'K', action: 'Move up / Command palette' },
    { code: 'KeyL', label: 'L', action: 'Navigate cursor right' },
    { code: 'Enter', label: 'Enter', width: 'w-14 sm:w-18', action: 'Execute command / Confirm' }
  ],
  [
    { code: 'ShiftLeft', label: 'Shift', width: 'w-16 sm:w-20', action: 'Multi-select modifier' },
    { code: 'KeyZ', label: 'Z', action: 'Undo last mutation' },
    { code: 'KeyX', label: 'X', action: 'Select / checkbox toggle' },
    { code: 'KeyC', label: 'C', action: 'Create new issue' },
    { code: 'KeyV', label: 'V', action: 'View detailed diff' },
    { code: 'KeyB', label: 'B', action: 'Switch Git branch' },
    { code: 'KeyN', label: 'N', action: 'New roadmap track' },
    { code: 'KeyM', label: 'M', action: 'Move to next sprint' },
    { code: 'Slash', label: '/', action: 'Global fuzzy search' },
    { code: 'ShiftRight', label: 'Shift', width: 'w-16 sm:w-20', action: 'Multi-select modifier' }
  ],
  [
    { code: 'ControlLeft', label: 'Ctrl', width: 'w-12 sm:w-14', action: 'Modifier' },
    { code: 'AltLeft', label: '⌥ Opt', width: 'w-12 sm:w-14', action: 'Secondary actions' },
    { code: 'MetaLeft', label: '⌘ Cmd', width: 'w-14 sm:w-16', action: 'Command chord modifier' },
    { code: 'Space', label: 'Space', width: 'w-36 sm:w-64', action: 'Quick-look preview drawer' },
    { code: 'MetaRight', label: '⌘ Cmd', width: 'w-14 sm:w-16', action: 'Command chord modifier' },
    { code: 'AltRight', label: '⌥ Opt', width: 'w-12 sm:w-14', action: 'Secondary actions' }
  ]
]

export const quickChords = [
  { combo: '⌘ + K', label: 'Command Palette', desc: 'Fuzzy search actions & items' },
  { combo: 'C', label: 'Quick Capture', desc: 'Create issue anywhere' },
  { combo: 'J / K', label: 'Vim Navigation', desc: 'Move list selection' },
  { combo: 'B', label: 'Branch Switcher', desc: 'Checkout git worktree' },
  { combo: '⌘ + D', label: 'Instant Deploy', desc: 'Trigger canary pipeline' }
]
