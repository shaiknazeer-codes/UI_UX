'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { workflowTabs, planData, buildData, shipData } from '@/data/workflows'
import {
  ListTodo,
  CalendarRange,
  GitPullRequest,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Rocket,
  ShieldCheck,
  ChevronRight,
  GitBranch,
  ArrowRight
} from 'lucide-react'

export default function WorkflowTabs({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState('plan')
  const [selectedIssueId, setSelectedIssueId] = useState('KES-104')
  const [deployed, setDeployed] = useState(false)

  const handleDeploy = () => {
    setDeployed(true)
    setTimeout(() => setDeployed(false), 3500)
  }

  return (
    <section id="workflows" className="py-20 md:py-28 border-t border-line bg-bg/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
            Unified Product Lifecycle
          </span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">
            Plan, Build, Ship. Zero Context Loss.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted">
            Switch between backlog triage, timeline execution, and git diff deployment with a single keystroke.
          </p>
        </div>

        {/* Tab Controls with Framer-style sliding indicator */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2">
          <div
            role="tablist"
            aria-label="Workflow views"
            className="flex items-center p-1.5 rounded-2xl bg-card border border-line shadow-sm"
          >
            {workflowTabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? 'text-fg font-semibold' : 'text-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeWorkflowIndicator"
                      className="absolute inset-0 bg-bg-muted rounded-xl shadow-xs border border-line"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.id === 'plan' && <ListTodo className="w-4 h-4 text-indigo-500" />}
                    {tab.id === 'build' && <CalendarRange className="w-4 h-4 text-purple-500" />}
                    {tab.id === 'ship' && <GitPullRequest className="w-4 h-4 text-emerald-500" />}
                    <span>{tab.label}</span>
                    <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-card border border-line text-muted">
                      {tab.hotkey}
                    </kbd>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Product Panels with AnimatePresence */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-line bg-card shadow-2xl p-4 sm:p-6 md:p-8 overflow-hidden min-h-[460px]">
          <AnimatePresence mode="wait">
            {activeTab === 'plan' && (
              <motion.div
                key="plan"
                id="panel-plan"
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Sprint Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base text-fg">{planData.activeSprint}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      {planData.velocity} • {planData.daysRemaining}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted">Hotkeys:</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-bg-muted border border-line text-[11px] font-mono">J/K</kbd>
                    <span>move</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-bg-muted border border-line text-[11px] font-mono">C</kbd>
                    <span>create</span>
                  </div>
                </div>

                {/* Issue Table Mockup */}
                <div className="divide-y divide-line/60 overflow-x-auto">
                  {planData.issues.map((issue) => {
                    const isSelected = selectedIssueId === issue.id
                    return (
                      <div
                        key={issue.id}
                        onClick={() => setSelectedIssueId(issue.id)}
                        className={`flex items-center justify-between py-3 px-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-accent-subtle/80 border-l-4 border-accent'
                            : 'hover:bg-bg-muted/70'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs text-muted font-medium w-16 shrink-0">
                            {issue.id}
                          </span>
                          <span className="text-sm font-medium text-fg truncate">
                            {issue.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-xs">
                          <span className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${
                            issue.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-500' :
                            issue.status === 'In Review' ? 'bg-purple-500/10 text-purple-500' :
                            issue.status === 'Done' ? 'bg-emerald-500/10 text-emerald-500' :
                            'bg-zinc-500/10 text-zinc-500'
                          }`}>
                            {issue.status}
                          </span>

                          <span className={`hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono ${
                            issue.priority === 'Urgent' ? 'text-red-500 font-bold bg-red-500/10' :
                            issue.priority === 'High' ? 'text-amber-500 font-semibold bg-amber-500/10' :
                            'text-muted bg-bg-muted'
                          }`}>
                            {issue.priority}
                          </span>

                          <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-bold text-[10px]">
                            {issue.assignee}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'build' && (
              <motion.div
                key="build"
                id="panel-build"
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Build Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2">
                  <div>
                    <h3 className="font-semibold text-base text-fg">{buildData.activeQuarter}</h3>
                    <p className="text-xs text-muted mt-0.5">
                      Execution track overall completion: {buildData.totalProgress}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-accent-subtle text-accent font-medium">
                      Multi-track sync active
                    </span>
                  </div>
                </div>

                {/* Timeline Tracks */}
                <div className="space-y-4">
                  {buildData.tracks.map((track) => (
                    <div
                      key={track.name}
                      className="p-4 rounded-xl border border-line bg-bg/50 space-y-3"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 font-medium text-fg">
                          <span>{track.name}</span>
                          <span className="text-xs text-muted font-normal">({track.owner})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            track.status === 'Ahead' ? 'bg-purple-500/10 text-purple-500' :
                            track.status === 'At Risk' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-emerald-500/10 text-emerald-500'
                          }`}>
                            {track.status}
                          </span>
                          <span className="font-mono text-xs font-semibold text-fg">
                            {track.progress}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 rounded-full bg-bg-muted overflow-hidden">
                        <div
                          className={`h-full ${track.color} rounded-full transition-all duration-500`}
                          style={{ width: `${track.progress}%` }}
                        />
                      </div>

                      {/* Milestones chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {track.milestones.map((m) => (
                          <span
                            key={m}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-card border border-line text-muted"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'ship' && (
              <motion.div
                key="ship"
                id="panel-ship"
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Ship / PR Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <GitPullRequest className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold text-base text-fg">
                        {shipData.pullRequest.title}
                      </span>
                      <span className="text-xs font-mono text-muted">
                        {shipData.pullRequest.number}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted mt-1">
                      <span>branch: <code className="text-accent">{shipData.pullRequest.branch}</code></span>
                      <span>→</span>
                      <span>target: <code className="text-muted">{shipData.pullRequest.target}</code></span>
                      <span>•</span>
                      <span className="text-emerald-500 font-medium">{shipData.pullRequest.ciStatus}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDeploy}
                    className={`px-4 py-2 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                      deployed
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-indigo-500/25'
                    }`}
                  >
                    <Rocket className={`w-4 h-4 ${deployed ? 'animate-bounce' : ''}`} />
                    <span>{deployed ? 'Deploying Canary v2.4.0...' : 'Deploy Canary Release'}</span>
                  </button>
                </div>

                {/* Diff Viewer Mock */}
                <div className="rounded-xl border border-line bg-bg overflow-hidden font-mono text-xs">
                  <div className="bg-bg-muted/80 px-4 py-2 border-b border-line flex items-center justify-between text-muted text-[11px]">
                    <span className="flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-accent" />
                      src/core/keyboard-multiplexer.ts
                    </span>
                    <span className="text-emerald-500">+{shipData.pullRequest.additions} / -{shipData.pullRequest.deletions}</span>
                  </div>

                  <div className="p-3 divide-y divide-line/20 overflow-x-auto">
                    {shipData.diffLines.map((line, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 py-0.5 px-2 font-mono ${
                          line.type === 'addition' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          line.type === 'deletion' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                          'text-muted'
                        }`}
                      >
                        <span className="w-6 text-right select-none opacity-40 text-[10px]">
                          {line.lineNew || line.lineOld || ''}
                        </span>
                        <pre className="font-mono text-xs overflow-x-auto">{line.text}</pre>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Automated CI checks grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
                  {shipData.checks.map((check) => (
                    <div
                      key={check.name}
                      className="p-2.5 rounded-lg border border-line bg-bg/60 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate text-fg font-medium">{check.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-muted shrink-0 ml-1">{check.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

