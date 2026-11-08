'use client'

import { useState, useEffect, useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion
} from 'framer-motion'
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  GitPullRequest,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Layers,
  Terminal,
  Zap
} from 'lucide-react'
import { planData, buildData, shipData } from '@/data/workflows'

export default function HorizontalScroll({ onOpenModal }) {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [canaryDeployed, setCanaryDeployed] = useState(false)

  // Detect viewport size (<768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Desktop horizontal scroll physics
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  })

  // Map progress: 0% to -66.666% over 0 to 0.9, holding still from 0.9 to 1.0
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    ['0%', '-66.666%', '-66.666%']
  )
  const smoothX = useSpring(rawX, {
    stiffness: 120,
    damping: 30,
    mass: 0.3
  })

  // Smooth progress bar width tied to scroll
  const rawProgressWidth = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    ['0%', '100%', '100%']
  )
  const smoothProgressWidth = useSpring(rawProgressWidth, {
    stiffness: 120,
    damping: 30,
    mass: 0.3
  })

  // Track active step for tabs & counter (01/03, 02/03, 03/03)
  useEffect(() => {
    if (isMobile || shouldReduceMotion) return

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.32) {
        setActiveStep(0)
      } else if (latest < 0.68) {
        setActiveStep(1)
      } else {
        setActiveStep(2)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, isMobile, shouldReduceMotion])

  // Parallax offsets: headline moves slightly slower than the panel
  const headline1X = useTransform(scrollYProgress, [0, 0.35], [0, 24])
  const headline2X = useTransform(scrollYProgress, [0.2, 0.65], [-24, 24])
  const headline3X = useTransform(scrollYProgress, [0.55, 0.9], [-24, 0])

  // Page 2 scale & opacity entrance
  const page2Scale = useTransform(
    scrollYProgress,
    [0.18, 0.45, 0.72],
    [0.96, 1, 0.96]
  )
  const page2Opacity = useTransform(
    scrollYProgress,
    [0.18, 0.42, 0.72],
    [0.25, 1, 0.25]
  )

  // Page 2 roadmap bar progress growth
  const bar1Width = useTransform(scrollYProgress, [0.24, 0.45], ['0%', '82%'])
  const bar2Width = useTransform(scrollYProgress, [0.27, 0.48], ['0%', '64%'])
  const bar3Width = useTransform(scrollYProgress, [0.3, 0.51], ['0%', '90%'])
  const bar4Width = useTransform(scrollYProgress, [0.33, 0.54], ['0%', '45%'])

  // Page 3 scale & opacity entrance
  const page3Scale = useTransform(
    scrollYProgress,
    [0.55, 0.88, 1],
    [0.96, 1, 1]
  )
  const page3Opacity = useTransform(
    scrollYProgress,
    [0.55, 0.85, 1],
    [0.25, 1, 1]
  )

  // Page 3 approval badge settlement
  const approvalOpacity = useTransform(scrollYProgress, [0.76, 0.88], [0, 1])
  const approvalScale = useTransform(scrollYProgress, [0.76, 0.88], [0.88, 1])
  const approvalY = useTransform(scrollYProgress, [0.76, 0.88], [16, 0])

  // Smooth scroll to specific page position
  const scrollToPage = (pageIndex) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top
    const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight
    const progressTargets = [0, 0.45, 0.92]
    const targetY = scrollTop + scrollDistance * progressTargets[pageIndex]

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })
  }

  // Handle focus inside an off-screen page to bring it into view
  const handlePageFocus = (pageIndex) => {
    if (!isMobile && !shouldReduceMotion && activeStep !== pageIndex) {
      scrollToPage(pageIndex)
    }
  }

  const handleDeployCanary = () => {
    setCanaryDeployed(true)
    setTimeout(() => setCanaryDeployed(false), 3500)
  }

  const tabs = [
    { id: 'plan', label: 'Plan', subtitle: 'Triage & Sprints' },
    { id: 'build', label: 'Build', subtitle: 'Roadmaps & Milestones' },
    { id: 'ship', label: 'Ship', subtitle: 'Diffs & Approvals' }
  ]

  // ==========================================
  // MOBILE / REDUCED-MOTION: VERTICAL STACK
  // ==========================================
  if (isMobile || shouldReduceMotion) {
    return (
      <section
        id="workflow"
        className="py-16 sm:py-24 border-t border-line bg-bg relative"
      >
        <span id="workflows" className="absolute -top-24 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Unified Product Lifecycle
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
              Plan, Build, Ship. Zero Context Loss.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-subheadline">
              Switch between backlog triage, timeline execution, and git diff deployment with keyboard-native velocity.
            </p>
          </div>

          <div className="flex flex-col gap-14">
            {/* 1. Plan Page */}
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-accent pl-4">
                <span className="text-xs font-mono font-semibold text-accent">01 / 03</span>
                <h3 className="text-2xl font-bold text-fg">Plan with atomic clarity</h3>
                <p className="text-sm text-subheadline mt-1">
                  Triage issues, assign ownership, and organize sprints without touching a mouse.
                </p>
              </div>
              <PlanMockPanel />
            </div>

            {/* 2. Build Page */}
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-accent pl-4">
                <span className="text-xs font-mono font-semibold text-accent">02 / 03</span>
                <h3 className="text-2xl font-bold text-fg">Build with synchronized velocity</h3>
                <p className="text-sm text-subheadline mt-1">
                  Visualize dependencies, milestones, and release trains across engineering teams in real-time.
                </p>
              </div>
              <BuildMockPanel staticBars />
            </div>

            {/* 3. Ship Page */}
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-accent pl-4">
                <span className="text-xs font-mono font-semibold text-accent">03 / 03</span>
                <h3 className="text-2xl font-bold text-fg">Ship with zero-downtime confidence</h3>
                <p className="text-sm text-subheadline mt-1">
                  Automate pull request verification, git-native approvals, and canary rollouts.
                </p>
              </div>
              <ShipMockPanel
                staticApproved
                canaryDeployed={canaryDeployed}
                onDeploy={handleDeployCanary}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ==========================================
  // DESKTOP: PINNED HORIZONTAL SCROLL TRACK
  // ==========================================
  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative h-[300vh] bg-bg border-t border-line"
    >
      {/* Anchor for nav links */}
      <span id="workflows" className="absolute -top-24 pointer-events-none" />

      {/* Sticky Fullscreen Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Top Control Bar: Tabs & Step Counter */}
        <div className="relative z-20 pt-6 px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Clickable Workflow Tabs */}
          <div
            role="tablist"
            aria-label="Workflow stages"
            className="inline-flex items-center p-1 rounded-xl bg-card/80 backdrop-blur-md border border-line shadow-sm"
          >
            {tabs.map((tab, idx) => {
              const isCurrent = activeStep === idx
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  tabIndex={0}
                  onClick={() => scrollToPage(idx)}
                  className={`relative px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                    isCurrent
                      ? 'text-white'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="activeWorkflowTabIndicator"
                      className="absolute inset-0 rounded-lg bg-accent"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="font-mono text-[11px] opacity-75">
                      0{idx + 1}
                    </span>
                    <span>{tab.label}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Step Indicator Counter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-muted uppercase tracking-wider">
              Stage
            </span>
            <div className="px-2.5 py-1 rounded-md bg-card border border-line text-xs font-mono font-semibold text-fg tabular-nums shadow-xs">
              0{activeStep + 1} <span className="text-muted font-normal">/</span> 03
            </div>
          </div>
        </div>

        {/* Horizontal Moving Track */}
        <motion.div
          style={{ x: smoothX, width: '300vw' }}
          className="flex h-full will-change-transform"
        >
          {/* ==================================== */}
          {/* PAGE 1: PLAN */}
          {/* ==================================== */}
          <div
            className="w-screen h-full shrink-0 flex items-center justify-center px-6 lg:px-12"
            onFocusCapture={() => handlePageFocus(0)}
          >
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Headline with Parallax */}
              <motion.div
                style={{ x: headline1X }}
                className="lg:col-span-5 text-left"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle border border-accent/20 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  01 • Triage & Sprints
                </div>
                <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-fg leading-tight">
                  Plan with atomic clarity.
                </h3>
                <p className="mt-4 text-base lg:text-lg text-subheadline font-normal leading-relaxed">
                  Triage issues, assign ownership, and organize sprints without touching a mouse.
                  Instant search, zero latency filtering, and sub-second updates.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <kbd className="px-2 py-1 rounded-md bg-card border border-line text-xs font-mono text-fg shadow-xs">
                    J / K
                  </kbd>
                  <span className="text-xs text-muted">navigate issues</span>
                  <span className="text-line">•</span>
                  <kbd className="px-2 py-1 rounded-md bg-card border border-line text-xs font-mono text-fg shadow-xs">
                    C
                  </kbd>
                  <span className="text-xs text-muted">create issue</span>
                </div>
              </motion.div>

              {/* Right Mock Panel */}
              <div className="lg:col-span-7">
                <PlanMockPanel />
              </div>
            </div>
          </div>

          {/* ==================================== */}
          {/* PAGE 2: BUILD */}
          {/* ==================================== */}
          <div
            className="w-screen h-full shrink-0 flex items-center justify-center px-6 lg:px-12"
            onFocusCapture={() => handlePageFocus(1)}
          >
            <motion.div
              style={{ scale: page2Scale, opacity: page2Opacity }}
              className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Headline with Parallax */}
              <motion.div
                style={{ x: headline2X }}
                className="lg:col-span-5 text-left"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                  <Layers className="w-3.5 h-3.5" />
                  02 • Milestones & Execution
                </div>
                <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-fg leading-tight">
                  Build with synchronized velocity.
                </h3>
                <p className="mt-4 text-base lg:text-lg text-subheadline font-normal leading-relaxed">
                  Visualize dependencies, milestones, and release trains across engineering teams in real-time.
                  Auto-sync with git branches and active deployment pipelines.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <kbd className="px-2 py-1 rounded-md bg-card border border-line text-xs font-mono text-fg shadow-xs">
                    G M
                  </kbd>
                  <span className="text-xs text-muted">open milestone matrix</span>
                </div>
              </motion.div>

              {/* Right Mock Panel */}
              <div className="lg:col-span-7">
                <BuildMockPanel
                  bar1Width={bar1Width}
                  bar2Width={bar2Width}
                  bar3Width={bar3Width}
                  bar4Width={bar4Width}
                />
              </div>
            </motion.div>
          </div>

          {/* ==================================== */}
          {/* PAGE 3: SHIP */}
          {/* ==================================== */}
          <div
            className="w-screen h-full shrink-0 flex items-center justify-center px-6 lg:px-12"
            onFocusCapture={() => handlePageFocus(2)}
          >
            <motion.div
              style={{ scale: page3Scale, opacity: page3Opacity }}
              className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Headline with Parallax */}
              <motion.div
                style={{ x: headline3X }}
                className="lg:col-span-5 text-left"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  03 • Diffs & Canary Rollouts
                </div>
                <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-fg leading-tight">
                  Ship with zero-downtime confidence.
                </h3>
                <p className="mt-4 text-base lg:text-lg text-subheadline font-normal leading-relaxed">
                  Automate pull request verification, git-native approvals, and canary rollouts.
                  Deploy with one keystroke and inspect real-time telemetry instantly.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <kbd className="px-2 py-1 rounded-md bg-card border border-line text-xs font-mono text-fg shadow-xs">
                    ⌘ Enter
                  </kbd>
                  <span className="text-xs text-muted">merge & deploy canary</span>
                </div>
              </motion.div>

              {/* Right Mock Panel */}
              <div className="lg:col-span-7">
                <ShipMockPanel
                  approvalOpacity={approvalOpacity}
                  approvalScale={approvalScale}
                  approvalY={approvalY}
                  canaryDeployed={canaryDeployed}
                  onDeploy={handleDeployCanary}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="relative z-20 w-full bg-line/40 h-1">
          <motion.div
            style={{ width: smoothProgressWidth }}
            className="h-full bg-accent transition-none"
          />
        </div>
      </div>
    </section>
  )
}

// ==========================================
// MOCK PANEL 1: PLAN (Issue List & Status Chips)
// ==========================================
function PlanMockPanel() {
  const [selectedId, setSelectedId] = useState('KES-104')

  return (
    <div className="w-full rounded-2xl border border-line bg-card shadow-2xl p-5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="text-sm font-semibold text-fg">
            {planData.activeSprint}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-md font-medium">
            {planData.velocity}
          </span>
          <span className="text-xs text-muted font-mono">
            {planData.daysRemaining}
          </span>
        </div>
      </div>

      {/* Issues List */}
      <div className="flex flex-col gap-2">
        {planData.issues.map((issue) => {
          const isSelected = selectedId === issue.id

          return (
            <div
              key={issue.id}
              onClick={() => setSelectedId(issue.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'border-accent/40 bg-accent-subtle/50 shadow-xs'
                  : 'border-line/70 bg-card hover:border-line hover:bg-line/20'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono font-semibold text-muted shrink-0">
                  {issue.id}
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium truncate ${
                    isSelected ? 'text-fg font-semibold' : 'text-fg'
                  }`}
                >
                  {issue.title}
                </span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {/* Status Chip */}
                <StatusChip status={issue.status} />

                {/* Estimate */}
                <span className="hidden sm:inline-block text-[11px] font-mono text-muted">
                  {issue.estimate}
                </span>

                {/* Assignee Avatar */}
                <div className="w-6 h-6 rounded-full bg-line flex items-center justify-center text-[10px] font-semibold text-fg">
                  {issue.assignee}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer bar */}
      <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
        <span className="font-mono">5 issues in current edge sprint</span>
        <span className="text-accent font-medium">Synced with Git branch #349</span>
      </div>
    </div>
  )
}

function StatusChip({ status }) {
  if (status === 'In Progress') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-500 border border-indigo-500/30 text-[11px] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        In Progress
      </span>
    )
  }
  if (status === 'In Review') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-500 border border-purple-500/30 text-[11px] font-medium">
        <Clock className="w-3 h-3" />
        In Review
      </span>
    )
  }
  if (status === 'Done') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-[11px] font-medium">
        <Check className="w-3 h-3" />
        Done
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-line/60 text-muted border border-line text-[11px] font-medium">
      Todo
    </span>
  )
}

// ==========================================
// MOCK PANEL 2: BUILD (Roadmap Timeline Bars)
// ==========================================
function BuildMockPanel({ bar1Width, bar2Width, bar3Width, bar4Width, staticBars }) {
  const dynamicWidths = [bar1Width, bar2Width, bar3Width, bar4Width]

  return (
    <div className="w-full rounded-2xl border border-line bg-card shadow-2xl p-5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-sm font-semibold text-fg">
            {buildData.activeQuarter}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-muted">
          <span>Jul</span>
          <span>Aug</span>
          <span className="text-accent font-semibold">Sep (Current)</span>
        </div>
      </div>

      {/* Tracks */}
      <div className="flex flex-col gap-4">
        {buildData.tracks.map((track, i) => {
          return (
            <div
              key={track.name}
              className="p-3.5 rounded-xl border border-line/70 bg-card/60 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-fg">{track.name}</span>
                  <span className="text-muted font-mono text-[11px]">
                    • {track.owner}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-fg font-semibold">{track.progress}%</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-sm border ${
                      track.status === 'Ahead'
                        ? 'bg-purple-500/10 text-purple-500 border-purple-500/30'
                        : track.status === 'On Track'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                    }`}
                  >
                    {track.status}
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2.5 rounded-full bg-line/60 overflow-hidden relative">
                {staticBars ? (
                  <div
                    className={`h-full rounded-full ${track.color}`}
                    style={{ width: `${track.progress}%` }}
                  />
                ) : (
                  <motion.div
                    className={`h-full rounded-full ${track.color}`}
                    style={{ width: dynamicWidths[i] || `${track.progress}%` }}
                  />
                )}
              </div>

              {/* Milestone chips */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1">
                {track.milestones.slice(0, 3).map((m, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-line/40 text-muted whitespace-nowrap"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// MOCK PANEL 3: SHIP (Diff View & Approved State)
// ==========================================
function ShipMockPanel({
  approvalOpacity,
  approvalScale,
  approvalY,
  staticApproved,
  canaryDeployed,
  onDeploy
}) {
  return (
    <div className="w-full rounded-2xl border border-line bg-card shadow-2xl p-5 relative overflow-hidden">
      {/* PR Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line mb-3">
        <div className="flex items-center gap-2.5">
          <GitPullRequest className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-semibold text-fg">
            {shipData.pullRequest.title}
          </span>
          <span className="text-xs font-mono text-muted">
            {shipData.pullRequest.number}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-medium">
            {shipData.pullRequest.ciStatus}
          </span>
        </div>
      </div>

      {/* Code Diff Lines */}
      <div className="rounded-xl border border-line/80 bg-bg/70 p-3 font-mono text-xs overflow-x-auto flex flex-col gap-1">
        <div className="text-[11px] text-muted pb-1 mb-1 border-b border-line/50 flex justify-between">
          <span>packages/core/multiplexer.ts</span>
          <span className="text-emerald-500">+142</span>
          <span className="text-rose-500">-28</span>
        </div>
        {shipData.diffLines.map((line, idx) => {
          const isAdd = line.type === 'addition'
          const isDel = line.type === 'deletion'

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 px-1.5 py-0.5 rounded-xs ${
                isAdd
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : isDel
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  : 'text-subheadline'
              }`}
            >
              <span className="w-6 text-right select-none text-[10px] opacity-40 shrink-0">
                {line.lineNew || line.lineOld || ''}
              </span>
              <span className="whitespace-pre">{line.text}</span>
            </div>
          )
        })}
      </div>

      {/* Settling "Approved" Review Banner */}
      <div className="mt-4">
        {staticApproved ? (
          <ApprovedCard
            canaryDeployed={canaryDeployed}
            onDeploy={onDeploy}
          />
        ) : (
          <motion.div
            style={{
              opacity: approvalOpacity,
              scale: approvalScale,
              y: approvalY
            }}
          >
            <ApprovedCard
              canaryDeployed={canaryDeployed}
              onDeploy={onDeploy}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ApprovedCard({ canaryDeployed, onDeploy }) {
  return (
    <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-semibold text-fg">
              Approved by @sarah-lin
            </span>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/15 px-1.5 py-0.2 rounded-sm">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-muted">
            All 18 automated checks passed • Zero breaking changes detected
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onDeploy}
        className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
          canaryDeployed
            ? 'bg-emerald-600 text-white'
            : 'bg-accent hover:bg-accent-hover text-white active:scale-95'
        }`}
      >
        {canaryDeployed ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Canary Live (v2.4.0)</span>
          </>
        ) : (
          <>
            <Zap className="w-3.5 h-3.5" />
            <span>Deploy Canary</span>
          </>
        )}
      </button>
    </div>
  )
}

